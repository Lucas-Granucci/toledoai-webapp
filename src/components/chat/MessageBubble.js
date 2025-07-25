import ReactMarkdown from 'react-markdown';
import { FileText } from 'lucide-react';

export const MessageBubble = ({ message, onFilePreview }) => {
    const isUser = message.role === 'user';

    return (
        <div className="mb-4">
            <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-start gap-2`}>
                {/* AI Avatar */}
                {!isUser && (
                    <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                        AI
                    </div>
                )}

                {/* Message Container */}
                <div className={`max-w-[70%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                    {/* File attachment (shown above for user, below for AI) */}
                    {message.file?.name && isUser && (
                        <div className="flex items-center text-sm text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg self-end">
                            <FileText className="w-4 h-4 mr-2 text-slate-500" />
                            <span className="font-medium">{message.file.name}</span>
                        </div>
                    )}

                    {/* Message Bubble */}
                    <div className={`px-4 py-3 rounded-2xl text-base whitespace-pre-wrap ${
                        isUser
                            ? 'bg-cyan-600 text-white shadow-sm rounded-tr-sm'
                            : 'bg-white shadow-sm border border-slate-200 rounded-tl-sm'
                    }`}>
                        <ReactMarkdown>{message.content}</ReactMarkdown>

                    {/* File attachment for AI messages (shown below) */}
                    {message.file?.name && !isUser && (
                        <div
                            onClick={() => onFilePreview(message.file.text)}
                            className="flex items-center text-sm text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors"
                        >
                            <FileText className="w-4 h-4 mr-2 text-slate-500" />
                            <span className="font-medium">{message.file.name}</span>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
};