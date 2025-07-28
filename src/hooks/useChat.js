import { useState } from 'react';
import { chatService } from '@/services/api';

export const useChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Welcome to **ToledoAI!** I specialize in translating scientific documents, with a focus on **low-resource languages**. Please upload a document or paste text to begin. You can also ask me to clarify scientific concepts from the translated material.',
            file: null
        },
    ]);

    const [isTyping, setIsTyping] = useState(false);
    const [input, setInput] = useState('');

    const sendMessage = async (apiKey, uploadedFile, targetLang) => {
        if (!input.trim() && uploadedFile) return;

        if (!apiKey) {
            throw new Error('API key is required');
        }

        let extractedText = '';

        // Handle PDF extraction
        if (uploadedFile && uploadedFile.type === 'application/pdf') {
            try {
                extractedText = await chatService.extractTextFromPDF(uploadedFile);
            } catch (error) {
                throw new Error(`Error extracting text from PDF: ${error.message}`);
            }
        }

        const newMessage = {
            role: 'user',
            content: input,
            file: extractedText
            ? {
                name: uploadedFile.name,
                text: extractedText,
                target_lang: targetLang
            }
            : null
        };

        setMessages(prev => [...prev, newMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await chatService.sendMessage([...messages, newMessage], apiKey);

            const assistantReply = {
                role: 'assistant',
                content: response.response,
                glossary: response.glossary || '',
                file: response.file
            };

            setMessages(prev => [...prev, assistantReply]);
        } catch (error) {
            const errorMessage = {
                role: 'assistant',
                content: `Error: ${error.message}`,
                file: null
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    return {
        messages,
        isTyping,
        input,
        setInput,
        sendMessage
    };
};