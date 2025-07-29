import Groq from "groq-sdk";
import { SUMMARY_MODEL } from "@/utils/constants";

export class DocumentManager {
    constructor() {
        this.currentDocument = null;
        this.documentSummary = null;
    }

    setDocument(text) {
        this.currentDocument = text;
        this.documentSummary = null;
    }

    async createDocumentSummary(text, userApiKey) {
        if (this.documentSummary) return this.documentSummary;

        const groq = new Groq({ apiKey: userApiKey });

        try {
            const completion = await groq.chat.completions.create({
                model: SUMMARY_MODEL,
                messages: [{
                    role: "user",
                    content: `Create a concise summary of this document for context. Incldue key topics, main findings, and important details that might be referenced later:\n\n${text.substring(0,2000)}...`
                }]
            });

            this.documentSummary = completion.choices[0].message.content;
            return this.documentSummary;
        } catch (error) {
            console.error("Summary creation failed:", error);
            return "Document uploaded but summary available";
        }
    }

    getCurrentDocument() {
        return this.currentDocument;
    }

    getDocumentSummary() {
        return this.documentSummary;
    }

    hasDocument() {
        return !!this.currentDocument;
    }

    clearDocument() {
        this.currentDocument = null;
        this.documentSummary = null;
    }
}