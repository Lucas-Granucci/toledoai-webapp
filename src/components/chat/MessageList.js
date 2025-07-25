import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";

export const MessageList = ({ messages, isTyping, onFilePreview }) => {
    return (
        <div className="flex-1 p-4 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-6">
                {messages.map((message, index) => (
                    <MessageBubble
                        key={index}
                        message={message}
                        onFilePreview={onFilePreview}
                    />
                ))}

                {isTyping && <TypingIndicator />}
            </div>
        </div>
    );
};