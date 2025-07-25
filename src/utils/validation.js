export class ValidationUtils {
    static validateApiKey(apiKey) {
        if (!apiKey || apiKey.trim().length === 0) {
            throw new Error('API key is required');
        }

        if (apiKey.length < 10) {
            throw new Error('Invalid API key format');
        }
        
        return true;
    }

    static validateFileSize(file, maxSizeInMB = 25) {
        const maxSize = maxSizeInMB * 1024 * 1024;
        if (file.size > maxSize) {
            throw new Error(`File size must be less than ${maxSizeInMB}MB`);
        }
        return true;
    }

    static validateFileType(file, allowedTypes = ['.pdf', '.docx', '.txt']) {
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        if (!allowedTypes.includes(fileExtension)) {
            throw new Error(`File type ${fileExtension} is not supported. Allowed types: ${allowedTypes.join(', ')}`);
        }
        return true;
    }

    static validateLanguage(language, supportedLanguages) {
        if (!supportedLanguages.some(lang => lang.value === language)) {
            throw new Error(`Language ${language} is not supported`);
        }
        return true;
    }
}