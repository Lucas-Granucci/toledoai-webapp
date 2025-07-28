import { Modal, Button } from "../ui";
import { ExternalLink } from "lucide-react";

export const ApiKeyAlertModal = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Missing API Key"
            maxWidth="max-w-md"
            >
            <div className="text-slate-700 space-y-4 mb-6 text-sm">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                    Get Your Groq Cloud API Key
                </h3>
                <ol className="list-decimal list-inside space-y-3 text-blue-800">
                    <li>
                    Go to{' '}
                    <a 
                        href="https://console.groq.com" 
                        target="_blank" 
                        className="text-blue-600 underline hover:text-blue-800 inline-flex items-center gap-1"
                    >
                        https://console.groq.com
                        <ExternalLink className="w-3 h-3" />
                    </a>{' '}
                    and log in or sign up.
                    </li>
                    <li>Navigate to the <strong>"API Keys"</strong> section.</li>
                    <li>Click <strong>"Create API Key"</strong> and give it a name.</li>
                    <li>Copy the key and save it somewhere safe.</li>
                    <li>Paste it into the Settings panel of this app.</li>
                    <li>Save settings and continue using the app!</li>
                </ol>
                </div>
            </div>

            <div className="flex justify-end">
                <Button onClick={onClose}>
                Got it
                </Button>
            </div>
            </Modal>
        );
};