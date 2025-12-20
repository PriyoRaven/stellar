import React from "react";

const TypingIndicator = () => {
    return (
        <div className="flex items-center gap-1 p-3">
            <div className="flex gap-1">
                <span
                    className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                />
                <span
                    className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                />
                <span
                    className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                />
            </div>
            <span className="text-sm text-primary-300 ml-2">Thinking...</span>
        </div>
    );
};

export default TypingIndicator;
