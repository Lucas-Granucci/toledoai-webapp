'use client';

import { useRef } from 'react';
import { Header } from '../../components/layout/Header';
import { QuickActions } from '../../components/layout/QuickActions';
import { MessageList } from '../../components/chat/MessageList';
import { ChatInput } from '../../components/chat/ChatInput';
import { SettingsModal, FilePreviewModal, ApiKeyAlertModal } from '../../components/modals';
import { useChat } from '../../hooks/useChat';
import { useFileUpload } from '../../hooks/useFileUpload';
import { useApiKey } from '../../hooks/useApiKey';
import { useSettings } from '../../hooks/useSettings';
import { fileService } from '../../services/api';

export default function ChatbotPage() {
    const fileInputRef = useRef(null);

    // Custom hooks for state management
    const { messages, isTyping, input, setInput, sendMessage, clearChatHistory } = useChat();
    const {
        uploadedFile,
        showFilePreview,
        previewText,
        handleFileUpload,
        handleFilePreview,
        clearUploadedFile,
        closeFilePreview
    } = useFileUpload();
    const {
        apiKey,
        setApiKey,
        showApiKeyAlert,
        validateApiKey,
        closeApiKeyAlert
    } = useApiKey();
    const {
        showSettings,
        sourceLang,
        targetLang,
        setSourceLang,
        setTargetLang,
        openSettings,
        closeSettings
    } = useSettings();

    // Event handlers
    const handleSendMessage = async () => {
        if (!validateApiKey()) return;

        try {
            await sendMessage(apiKey, uploadedFile, targetLang);
            clearUploadedFile();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleFileDownload = async (fileText) => {
        try {
            await fileService.downloadPDF(fileText);
        } catch (error) {
            alert('Failed to generate PDF: ' + error.message);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <div className="flex flex-col w-full h-full bg-gradient-to-br from-slate-50 to-cyan-50 rounded-2xl shadow-2xl shaodw-slate-300/30 border border-slate-200">

                {/* Header */}
                <Header 
                    sourceLang={sourceLang}
                    targetLang={targetLang}
                    onSettingsClick={openSettings}
                />

                {/* Messages Area */}
                <MessageList 
                    messages={messages}
                    isTyping={isTyping}
                    onFilePreview={handleFilePreview}
                />

                {/* Quick Actions */}
                <QuickActions 
                    onUploadClick={handleUploadClick}
                    onSettingsClick={openSettings}
                />

                {/* Chat Input */}
                <ChatInput 
                    input={input}
                    setInput={setInput}
                    onSend={handleSendMessage}
                    uploadedFile={uploadedFile}
                    onRemoveFile={clearUploadedFile}
                    disabled={!input.trim() && !uploadedFile}
                />

                {/* Modals */}
                <SettingsModal 
                    isOpen={showSettings}
                    onClose={closeSettings}
                    apiKey={apiKey}
                    setApiKey={setApiKey}
                    sourceLange={sourceLang}
                    setSourceLang={setSourceLang}
                    targetLang={targetLang}
                    setTargetLang={setTargetLang}
                    clearChatHistory={clearChatHistory}
                />

                <FilePreviewModal 
                    isOpen={showFilePreview}
                    onClose={closeFilePreview}
                    previewText={previewText}
                    onDownload={handleFileDownload}
                />

                <ApiKeyAlertModal 
                    isOpen={showApiKeyAlert}
                    onClose={closeApiKeyAlert}
                />

                {/* Hidden File Input */}
                <input 
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileInputChange}
                    className="hidden"
                />
            </div>
        </div>
    );
};