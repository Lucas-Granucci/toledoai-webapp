import { useState } from 'react';
import { FILE_SIZE_LIMIT } from '@/utils/constants';

export const useFileUpload = () => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [showFilePreview, setShowFilePreview] = useState(false);
    const [previewText, setPreviewText] = useState('');

    const handleFileUpload = (file) => {
        if (file && file.size < FILE_SIZE_LIMIT) {
            setUploadedFile(file);
        } else {
            alert('File size must be less than 25MB');
        }
    };

    const handleFilePreview = (fileText) => {
        setPreviewText(fileText);
        setShowFilePreview(true);
    };

    const clearUploadedFile = () => {
        setUploadedFile(null);
    }

    const closeFilePreview = () => {
        setShowFilePreview(false);
        setPreviewText('');
    };

    return {
        uploadedFile,
        showFilePreview,
        previewText,
        handleFileUpload,
        handleFilePreview,
        clearUploadedFile,
        closeFilePreview
    };
};