import Groq from "groq-sdk";

export class TranslationService {
    async translateText(text, targetLang, userApiKey) {
        const groq = new Groq({ apiKey: userApiKey });

        const prompt = this.buildTranslationPrompt(text, targetLang);

        try {
            const completion = await groq.chat.completions.create({
                model: "qwen/qwen3-32b",
                messages: [{ role: 'user', content: prompt }],
            })

            const translatedText = completion.choices[0].message.content;
            return this.cleanTranslatedText(translatedText);
        } catch (error) {
            console.error("Translation Error:", error)
            throw new Error("Translation service unavailable");
        }
    }

    buildTranslationPrompt(text, targetLang) {
        return `
You are a professional scientific translator. Translate the following academic or scientific text into ${targetLang}.

**Instructions:**

* **Translate only.** Do not interpret, summarize, or add commentary.
* **Maintain scientific precision:** Use exact domain-specific terminology and a formal, academic tone.
* **Preserve original meaning and flow:** Keep the paragraph structure, logical flow, and sentence complexity intact.
* **Normalize spacing:** Correct any irregular or strange spacing to ensure clear paragraph separation.
* **Infer Markdown structure:** If markdown is not present in the source text, **reconstruct appropriate markdown elements** (e.g., headings, lists, bold/italic, code blocks) based on the text's organization and content.
* **Handle untranslatable terms:** Transliterate any term without a known equivalent and provide a brief explanatory note in parentheses (e.g., "Term (explanation)").

--- START OF SOURCE TEXT ---
${text}
--- END OF SOURCE TEXT ---
`;
    }

    cleanTranslatedText(text) {
        return text.replace(/<think>.*?<\/think>/gs, '').trim();
    }
}