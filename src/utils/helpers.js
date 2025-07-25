export class HelperUtils {
    static generateFileName(originalname, targetLang, prefix = 'translated') {
        const extension = originalname.split('.').pop();
        const nameWithoutExtension = originalname.replace(/\.[^/.]+$/, '');
        return `${prefix}_${nameWithoutExtension}_${targetLang}.${extension}`;
    }

    static downloadTextAsFile(content, filename, contentType = 'text/plain') {
        const blob = new Blob([content], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }

    static formatTimestamp(date = new Date()) {
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}