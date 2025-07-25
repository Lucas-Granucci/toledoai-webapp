import { ArrowRight, Settings, Zap } from 'lucide-react';

export const Header = ({ sourceLang, targetLang, onSettingsClick }) => {
    return (
        <header className="p-4 border-b bg-white border-slate-200 flex-shrink-0 sticky top-0 z-10">
            <div className="flex items-center justify-between">
                {/* Left: Compact logo as link */}
                <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="w-7 h-7 bg-cyan-600 rounded-md flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                    </div>
                    <h1 className="text-lg font-bold text-slate-900">
                        Toledo<span className="text-cyan-600">AI</span>
                    </h1>
                </a>

                {/* Right: Language pills and settings */}
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-1">
                        <div className="px-3 py-1 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
                            {sourceLang}
                        </div>
                        <div className="px-2">
                            <ArrowRight className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="px-3 py-1 bg-cyan-100 rounded-full text-sm font-medium text-cyan-700">
                            {targetLang}
                        </div>
                    </div>
                    <button
                        onClick={onSettingsClick}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    >
                        <Settings className="w-5 h-5 text-slate-600" />
                    </button>
                </div>
            </div>
        </header>
    );
};