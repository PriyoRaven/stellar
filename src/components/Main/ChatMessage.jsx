import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { ThemeContext } from "../../context/themeContext";

const ChatMessage = ({ message, processedResponse }) => {
  const isUser = message.role === "user";
  const { theme } = useContext(ThemeContext);

  const getThemeClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-primary-200 text-text";
      case "blue":
        return "bg-blue-200 text-blue-900";
      case "yellow":
        return "bg-yellow-200 text-yellow-900";
      case "red":
        return "bg-red-200 text-red-900";
      case "green":
        return "bg-green-200 text-green-900";
      default:
        return "bg-slate-200 text-black";
    }
  };

  const getPromptClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-gray-700 text-white";
      case "blue":
        return "bg-blue-500 text-white";
      case "yellow":
        return "bg-amber-500 text-white";
      case "red":
        return "bg-red-500 text-white";
      case "green":
        return "bg-green-400 text-white";
      default:
        return "bg-slate-500 text-white";
    }
  };

  return (
    <div
      className={`result-data my-4 flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <img
          src={assets.stellar_icon}
          alt=""
          className="w-10 h-10 rounded-full inline-block mr-3"
        />
      )}
      <div
        className={`result-text inline-block p-3 rounded-3xl ${
          isUser ? getPromptClasses() : getThemeClasses()
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
