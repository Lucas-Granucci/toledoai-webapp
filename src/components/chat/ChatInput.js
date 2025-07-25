import { FileUploadPreview } from "./FileUploadPreview";

export const ChatInput = ({
    input,
    setInput,
    onSend,
    uploadedFile,
    onRemoveFile,
    disabled
}) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="p-4 border-t border-slate-200 bg-white flex-shrink-0">
            <div className="max-w-4xl mx-auto">
                <FileUploadPreview file={uploadedFile} onRemove={onRemoveFile} />

                <div className="flex items-center gap-4">
                    <textarea
                        id="message-input"
                        rows="1"
                        className="w-full p-3 bg-slate-100 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none resize-none"
                        placeholder="Type your message or ask a question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        onClick={onSend}
                        disabled={disabled}
                        className="bg-cyan-600 text-white rounded-lg p-3 hover:bg-cyan-700 transition-colors flex-shrink-0 shadow-md disabled:cursor-not-allowed hover:shadow-lg cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};