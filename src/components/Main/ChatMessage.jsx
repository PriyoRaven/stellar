import React from "react";
import { assets } from "../../assets/assets";

const ChatMessage = ({ message, processedResponse }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`result-data my-4 flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <img
          src={assets.gemini_icon}
          alt=""
          className="w-10 h-10 rounded-full inline-block mr-3"
        />
      )}
      <div
        className={`result-text inline-block p-3 rounded-3xl ${
          isUser ? "bg-green-500 text-white" : "bg-slate-100 text-black"
        }`}
      >
        {isUser ? (
          <p>{message.parts[0].text}</p>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: processedResponse }} />
        )}
      </div>
      {isUser && (
        <img
          src={assets.user_icon}
          alt=""
          className="w-10 h-10 rounded-full inline-block ml-3"
        />
      )}
    </div>
  );
};

export default ChatMessage;
