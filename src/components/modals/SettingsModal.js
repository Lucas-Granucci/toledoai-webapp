import { Modal, Input, Select, Button } from '../ui';
import { LANGUAGES } from '@/utils/constants';

export const SettingsModal = ({
    isOpen,
    onClose,
    apiKey,
    setApiKey,
    sourceLang,
    setSourceLang,
    targetLang,
    setTargetLang,
    clearChatHistory
}) => {
    const sourceOptions = LANGUAGES.source;
    const targetOptions = LANGUAGES.target;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Settings">
            {/* API Key Section */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">API Key</h3>
                <textarea 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder='Paste your GroqCloud API key here'
                    className="w-full h-24 p-3 border border-slate-200 rounded-xl resize-none text-slate-800 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
            </div>

            {/* Language Settings Section */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Language</h3>

                <div className="space-y-4 mb-4">
                    <Select 
                        label="Source Language"
                        options={sourceOptions}
                        value={sourceLang}
                        onChange={(e) => setSourceLang(e.target.value)}
                    />
                </div>

                <div className="space-y-4">
                    <Select 
                        label="Target Language"
                        options={targetOptions}
                        value={targetLang}
                        onChange={(e) => setTargetLang(e.target.value)}
                    />
                </div>
            </div>

            {/* Clear Chat History Button */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Danger Zone</h3>
                <button
                    onClick={() => {
                        if (window.confirm("Are you sure you want to clear the chat history? This action cannot be undone.")) {
                            clearChatHistory();
                        }
                    }}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors cursor-pointer"
                >
                    Clear Chat History
                </button>
            </div>

            {/* Modal Action Buttons */}
            <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={onClose}>
                    Save
                </Button>
            </div>
        </Modal>
    );
};