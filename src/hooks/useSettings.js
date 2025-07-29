import { useState } from 'react';

export const useSettings = () => {
    const [showSettings, setShowSettings] = useState(false);
    const [sourceLang, setSourceLang] = useState('English');
    const [targetLang, setTargetLang] = useState('Hindi');

    const openSettings = () => setShowSettings(true);
    const closeSettings = () => setShowSettings(false);

    return {
        showSettings,
        sourceLang,
        targetLang,
        setSourceLang,
        setTargetLang,
        openSettings,
        closeSettings
    };
};