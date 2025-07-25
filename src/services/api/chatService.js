class ChatService {
    async sendMessage(messages, apiKey) {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages, userApiKey: apiKey }),
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data;
    }

    async extractTextFromPDF(file) {
        const formdata = new FormData();
        formdata.append('file', file);

        const response = await fetch('/api/extract-text', {
            method: 'POST',
            body: formdata,
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const data = await response.json();
        return data.text || '';
    }
}

export const chatService = new ChatService();