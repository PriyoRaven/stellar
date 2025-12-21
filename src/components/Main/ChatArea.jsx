import React, { useRef } from "react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "../UI/TypingIndicator";

const ChatArea = ({
    conversation,
    loading,
    searchSources,
    chatContainerRef,
    onScroll
}) => {
    const chatEndRef = useRef(null);

    return (
        <div
            ref={chatContainerRef}
            onScroll={onScroll}
            className="result py-0 px-2 sm:px-[5%] overflow-y-auto the-scrollbar max-h-[60vh] sm:max-h-[65vh] lg:max-h-[70vh]"
        >
            {conversation.history.map((message, index) => (
                <ChatMessage
                    key={index}
                    message={message}
                    processedResponse={
                        message.role === "model" && conversation.responses[Math.floor(index / 2)]
                            ? conversation.responses[Math.floor(index / 2)].text
                            : null
                    }
                    sources={message.sources || []}
                />
            ))}
            {loading && (
                <div className="my-4 flex justify-start">
                    <TypingIndicator />
                </div>
            )}
            <div ref={chatEndRef} data-chat-end />
        </div>
    );
};

export default ChatArea;
