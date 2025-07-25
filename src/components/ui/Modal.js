import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-md', maxHeight = ''}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`bg-white rounded-2xl shadow-xl p-6 w-full ${maxWidth} ${maxHeight}`}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-cl font-semibold text-slate-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-500"/>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};