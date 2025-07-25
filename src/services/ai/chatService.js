import OpenAI from "openai";
import Groq from "groq-sdk";

export class ChatService {
    async createChatCompletion(messages, userApiKey, toolsSchema = null) {
        const groq = new Groq({ apiKey: userApiKey });
        try {
            const completion = await groq.chat.completions.create({
                model: "qwen/qwen3-32b",
                messages,
                tools: toolsSchema,
                tool_choice: "auto"
            });

            return completion;
        } catch (error) {
            console.error("Groq API Error:", error);
            throw new Error("Groq API error")
        }
    } 
}