import { NextResponse } from "next/server";
import { ChatService } from '../../../services/ai/chatService';
import { DocumentManager } from '../../../services/ai/documentManager';
import { TranslationService } from '../../../services/ai/translationService';
import { GlossaryService } from "@/services/ai/GlossaryService";
import { MessageProcessor } from '../../../utils/messageProcessor';
import { toolsSchema } from '../../../tools/schemas.js';

// Initialize services
const chatService = new ChatService();
const glossaryService = new GlossaryService();
const documentManager = new DocumentManager();
const translationService = new TranslationService();
const messageProcessor = new MessageProcessor();

export async function POST(req) {
    try {
        const { messages, userApiKey } = await req.json();

        // Validate request
        if (!userApiKey) {
            return NextResponse.json(
                { error: "Missing API Key" },
                { status: 400 }
            );
        }

        // Process document context
        const latestFileText = messageProcessor.findLatesUploadedDocument(messages);
        if (latestFileText && latestFileText !== documentManager.getCurrentDocument()) {
            documentManager.setDocument(latestFileText);
            await documentManager.createDocumentSummary(latestFileText, userApiKey);
        }

        // Prepare messages for LLM
        const trimmedMessages = messageProcessor.trimMessageHistory(messages, 10);
        const currentUserMessage = messages[messages.length -  1]?.contet || '';
        const needsFullDocument = messageProcessor.shouldIncludeFullDocument(currentUserMessage);

        const finalMessages = messageProcessor.prepareMessagesForLLM(
            trimmedMessages,
            documentManager.getDocumentSummary(),
            needsFullDocument,
            documentManager.getCurrentDocument()
        );

        // Get AI response
        const completion = await chatService.createChatCompletion(
            finalMessages,
            userApiKey,
            toolsSchema
        );

        const responseMessage = completion.choices[0].message;

        // Handle tools calls (translation)
        if (responseMessage.tool_calls) {
            const translationResult = await handleTranslationTool(
                responseMessage.tool_calls[0],
                documentManager.getCurrentDocument(),
                userApiKey
            );

            return NextResponse.json(translationResult);
        }

        const cleanedResponse = responseMessage.content.replace(/<think>[\s\S]*?<\/think>/gi, '');

        // Return regular chat response
        return NextResponse.json({
            response: cleanedResponse
        });
    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

async function handleTranslationTool(toolCall, documentText, userApiKey) {
    const { arguments: args } = toolCall.function;
    const parsedArgs = JSON.parse(args);

    const textToTranslate = parsedArgs.text || documentText;
    const targetLang = parsedArgs.target_lang;

    if (!textToTranslate) {
        throw new Error("No file found to translate");
    }

    const translatedText = await translationService.translateText(
        textToTranslate,
        targetLang,
        userApiKey
    );

    const glossary = await glossaryService.generateGlossary(translatedText, userApiKey, targetLang, "English");

    return {
        response: "Translation completed! The translated document is ready for download.",
        glossary: glossary,
        file: {
            text: translatedText,
            name: `translated_${targetLang}.txt`,
            type: "text/plain"
        }
    };
}