import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { assets } from "../../assets/assets";
import { ThemeContext } from "../../context/themeContext";
import { Context } from "../../context/context";
import { FiFile, FiImage } from "react-icons/fi";
import CodeBlock from "../UI/CodeBlock";
import ResponseMetadata from "../UI/ResponseMetadata";
import SearchSources from "../UI/SearchSources";

const ChatMessage = ({ message, processedResponse, sources }) => {
  const isUser = message.role === "user";
  const { isDarkMode } = useContext(ThemeContext);
  const { personas, currentPersona, availableModels } = useContext(Context);
  const [copied, setCopied] = React.useState(false);

  const currentPersonaData = personas[currentPersona];

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className={`result-data my-2 sm:my-4 flex ${isUser ? "justify-end" : "justify-start"
        }`}
    >
      {!isUser && (
        <div className="flex-shrink-0 mr-2 sm:mr-3">
          {currentPersonaData?.icon ? (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-200 flex items-center justify-center text-lg sm:text-xl">
              {currentPersonaData.icon}
            </div>
          ) : (
            <img
              src={assets.stellar_icon}
              alt=""
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            />
          )}
        </div>
      )}
      <div className="flex flex-col max-w-[85%] sm:max-w-[80%]">
        <div
          className={`result-text inline-block p-2 sm:p-3 rounded-2xl sm:rounded-3xl text-sm sm:text-base ${isUser ? "bg-primary-300 text-white" : "bg-primary-200 text-text"
            }`}
        >
          {isUser ? (
            <div>
              <p>{message.parts[0].text}</p>
              {message.attachmentPreviews && message.attachmentPreviews.length > 0 && (
                <div className="flex gap-1 sm:gap-2 mt-2 flex-wrap">
                  {message.attachmentPreviews.map((att, i) => (
                    <span key={i} className="flex items-center gap-1 text-[10px] sm:text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                      {att.type === "image" ? <FiImage size={10} /> : <FiFile size={10} />}
                      <span className="truncate max-w-[60px] sm:max-w-none">{att.name}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none text-sm sm:text-base">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code: CodeBlock,
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 underline break-all"
                    />
                  ),
                }}
              >
                {message.parts[0].text || processedResponse?.replace(/<[^>]*>/g, '') || ""}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Metadata for AI responses */}
        {!isUser && message.parts[0].text && (
          <ResponseMetadata
            message={message}
            availableModels={availableModels}
            copied={copied}
            onCopy={() => handleCopy(message.parts[0].text)}
          />
        )}

        {/* Search sources */}
        {!isUser && sources && sources.length > 0 && (
          <SearchSources sources={sources} />
        )}
      </div>
      {isUser && (
        <img
          src={assets.user_icon}
          alt=""
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full inline-block ml-2 sm:ml-3 flex-shrink-0"
        />
      )}
    </div>
  );
};

export default ChatMessage;
