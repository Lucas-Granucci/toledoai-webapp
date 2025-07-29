export const LANGUAGES = {
    source: [
        { value: 'Auto-detect', label: 'Auto-detect' },
        { value: 'English', label: 'English' },
        { value: 'Spanish', label: 'Spanish' },
        { value: 'French', label: 'French' },
        { value: 'Chinese', label: 'Chinese' }
    ],
    target: [
        { value: 'Hindi', label: 'Hindi' },
        { value: 'Swahili', label: 'Swahili' },
        { value: 'Tamil', label: 'Tamil' },
        { value: 'Hebrew', label: 'Hebrew' }
    ]
};

export const CHAT_MODEL = "qwen/qwen3-32b";
export const GLOSSARY_MODEL = "qwen/qwen3-32b";
export const SUMMARY_MODEL = "qwen/qwen3-32b";
export const TRANSLATION_MODEL = "qwen/qwen3-32b"


// export const TRANSLATION_MODEL = "qwen/qwen3-32b"

export const FILE_SIZE_LIMIT = 25 * 1024 * 1024; // 25MB