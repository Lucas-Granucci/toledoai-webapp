import Groq from 'groq-sdk';

export class GloassaryService {
    async generateGlossary(translatedText, userApiKey, targetLang, sourceLang) {
        const groq = new Groq({ apiKey: userApiKey });
        const prompt = `\nExtract all complex, technical, or domain-specific terms from the following text (in ${targetLang}). \
        For each term, provide a clear, concise definition in ${sourceLang}.\n\nReturn ONLY a valid JSON object, with no explanation, \
        commentary, or extra text. The JSON object must have terms as keys (in ${targetLang}) and definitions as values (in ${sourceLang}). \
        Do not include any notes, thoughts, or process—just the JSON object, nothing else.\n\n\
        Example:\n{\n  "term1": "definition in ${sourceLang}",\n  "term2": "definition in ${sourceLang}"\n}\n\n \
        --- START OF TEXT (in ${targetLang}) ---\n${translatedText}\n--- END OF TEXT ---\n`;

        try {
            const completion = await groq.chat.completions.create({
                model: "qwen/qwen3-32b",
                messages: [{ role: 'user', content: prompt }],
            });
            const content = completion.choices[0].message.content;

            // Extract only the first JSON object from the response
            const jsonMatch = content.match(/{[\s\S]*?}/);
            if (jsonMatch) {
                try {
                    const obj = JSON.parse(jsonMatch[0]);
                    // Return only the key-value pairs (as an object)
                    return obj;
                } catch (e) {
                    console.warn("Extracted glossary is not valid JSON, returning as string.");
                    return jsonMatch[0];
                }
            } else {
                // Fallback: return the whole content as a string
                return content;
            }
        } catch (error) {
            console.error("GroqCloud Glossary Error: ", error);
            return "Glossary generation failed.";
        }
    }
}