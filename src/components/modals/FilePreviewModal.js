import ReactMarkdown from 'react-markdown';
import { Modal, Button } from '../ui';

export const FilePreviewModal = ({
    isOpen,
    onClose,
    previewText,
    onDownload
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="File Preview"
            maxWidth="max-w-2xl"
            maxHeight="max-h-[90vh]"
        >
            <div className="flex-1 overflow-y-auto text-slate-700 mb-4 max-h-[70vh] border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                <ReactMarkdown>{previewText}</ReactMarkdown>
            </div>

            <div className="flex justify-end flex-shrink-0">
                <Button onClick={() => onDownload(previewText)}>
                    Download
                </Button>
            </div>
        </Modal>
    );
};