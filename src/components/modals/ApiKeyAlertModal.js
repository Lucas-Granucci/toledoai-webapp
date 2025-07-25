import { Modal, Button } from "../ui";

export const ApiKeyAlertModal = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Missing API Key"
            maxWidth="max-w-sm"
        >
            <p className="text-slate-700 mb-6">
                Please enter your OpenAI API key in the settings panel before proceeding.
            </p>

            <div className="flex justify-end">
                <Button onClick={onClose}>
                    Got it
                </Button>
            </div>
        </Modal>
    );
};