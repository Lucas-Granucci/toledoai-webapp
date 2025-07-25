import { useState } from 'react';

export const useApiKey = () => {
    const [apiKey, setApiKey] = useState('');
    const [showApiKeyAlert, setShowApiKeyAlert] = useState(false);

    const validateApiKey = () => {
        if (!apiKey) {
            setShowApiKeyAlert(true);
            return false;
        }
        return true;
    };

    const closeApiKeyAlert = () => {
        setShowApiKeyAlert(false);
    };

    return {
        apiKey,
        setApiKey,
        showApiKeyAlert,
        validateApiKey,
        closeApiKeyAlert
    };
};