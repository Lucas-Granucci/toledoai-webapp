export const TypingIndicator = () => {
    return (
        <div className="flex justify-start">
            <div className="flex items-center gap-2 mb-2">
                {/* AI avatar with spinning border */}
                <div className="relative w-10 h-10 flex-shrink-0">
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400 animate-spin"></div>
                    <div className="w-full h-full rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold">
                        AI
                    </div>
                </div>

                {/* Typing Test */}
                <div className="flex items-center">
                    <span className="text-sm text-slate-500">ToledoAI is typing</span>
                </div>
            </div>
        </div>
    );
};