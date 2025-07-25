import { FileText, Globe, MessageSquare } from 'lucide-react';

export const QuickActions = ({ onUploadClick, onSettingsClick }) => {
    const quickActions = [
        { icon: FileText, label: 'Upload Document', action: onUploadClick },
        { icon: Globe, label: 'Change Languages', action: onSettingsClick },
        { icon: MessageSquare, label: 'Set API Key', action: onSettingsClick },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 pb-2">
            <div className="flex gap-2 justify-center">
                {quickActions.map((action, index) => (
                    <button
                        key={index}
                        onClick={action.action}
                        className="flex items-center gap-2 px-3 py-2 bg-white/60 hover:bg-white border border-slate-200 rounded-full text-sm text-slate-700 transition-colors cursor-pointer"
                    >
                        <action.icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};