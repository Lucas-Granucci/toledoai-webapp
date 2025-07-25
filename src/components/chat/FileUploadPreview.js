import { FileText, X } from 'lucide-react';

export const FileUploadPreview = ({ file, onRemove }) => {
    if (!file) return null;

    return (
        <div className="mb-3 p-3 bg-cyan-50 border border-cyan-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-600" />
                <div>
                    <p className="font-medium text-slate-600">{file.name}</p>
                    <p className="font-medium text-slate-900">
                        {(file.size / 1024 / 1024).toFixed(1)} MB
                    </p>
                </div>
            </div>
            <button
                onClick={onRemove}
                className="p-1 hover:bg-cyan-100 rounded-full"
            >
                <X className="w-4 h-4 text-slate-500" />
            </button>
        </div>
    );
};