export class MessageProcessor {
    trimMessageHistory(messages, maxMessages = 10) {
        if (messages.length <= maxMessages) return messages;

        // Keep first message (system message)
        const systemMessages = messages.filter(m => m.role === 'system');
        const nonSystemMessages = messages.filert(m => m.role !== 'system');

        const recentMessages = nonSystemMessages.slice(-maxMessages);
        return [...systemMessages, ...recentMessages];
    }

    findLatesUploadedDocument(messages) {
        const latestFileMessage = [...messages].reverse().find(
            m => m.role === 'user' && m.file?.text
        );
        return latestFileMessage?.file?.text || null;
    }

    shouldIncludeFullDocument(userMessage) {
        const translationKeywords = ['translate', 'translation', 'convert to'];
        const analysisKeywords = ['analyze', 'summarize', 'extract', 'find', 'search'];

        const message = userMessage.toLowerCase();
        return translationKeywords.some(keyword => message.includes(keyword)) || analysisKeywords.some(keyword => message.includes(keyword))
    }

    prepareMessagesForLLM(messages, documentSummary = null, includeFullDocument = false, fullDocument = null) {
        const processedMessages = messages.map(m => {
            if (m.role === 'user') {
                const baseContent = m.content?.trim() || '';

                if (m.file?.text) {
                    return {
                        role: 'user',
                        content: `${baseContent}\n[Document uploaded: Available for analysis]`
                    }
                }

                return { role: 'user', content: baseContent };
            }

            return {
                role: m.role,
                content: m.content
            };
        });

        // Add document context
        const systemPrompt = this.buildSystemPrompt(!!fullDocument);

        if (includeFullDocument && fullDocument) {
            return [
                systemPrompt,
                {
                    role: 'system',
                    content: `Full-document content:\n${fullDocument}`
                },
                ...processedMessages
            ];
        } else if (documentSummary) {
            return [
                systemPrompt,
                {
                    role: 'system',
                    content: `Context: User has uploaded a document. Summary: ${documentSummary}`
                },
                ...processedMessages
            ];
        }

        return [systemPrompt, ...processedMessages]
    }

    buildSystemPrompt(hasDocument) {
        return {
            role: 'system',
            content: `You are a multilingual scientific assistant. ${hasDocument ? 
                'The user has uploaded a document that is available for analysis and translation.' : 
                'No document is currently available.'} Use the 'translate_text' tool when translation is requested.`
        };
    }
}