import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { assets } from "../../assets/assets";
import { ThemeContext } from "../../context/themeContext";
import { Context } from "../../context/context";
import { FiCopy, FiCheck, FiFile, FiImage } from "react-icons/fi";
import SearchSources from "../UI/SearchSources";

const ChatMessage = ({ message, processedResponse, sources }) => {
  const isUser = message.role === "user";
  const { isDarkMode } = useContext(ThemeContext);
  const { personas, currentPersona } = useContext(Context);
  const [copied, setCopied] = React.useState(false);

  const currentPersonaData = personas[currentPersona];

  // Use CSS variable-based classes for dynamic theming
  const getThemeClasses = () => {
    return "bg-primary-200 text-text";
  };

  const getPromptClasses = () => {
    return "bg-primary-300 text-white";
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Custom code block renderer with copy button
  const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const codeString = String(children).replace(/\n$/, "");
    const [codeCopied, setCodeCopied] = React.useState(false);

    const copyCode = async () => {
      await navigator.clipboard.writeText(codeString);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    };

    if (!inline && match) {
      return (
        <div className="relative group my-2">
          <div className="absolute right-2 top-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
              {match[1]}
            </span>
            <button
              onClick={copyCode}
              className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition-colors"
              title="Copy code"
            >
              {codeCopied ? <FiCheck size={14} /> : <FiCopy size={14} />}
            </button>
          </div>
          <SyntaxHighlighter
            style={oneDark}
            language={match[1]}
            PreTag="div"
            className="rounded-xl !mt-0"
            {...props}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      );
    }

    return (
      <code className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-sm" {...props}>
        {children}
      </code>
    );
  };

  return (
    <div
      className={`result-data my-4 flex ${isUser ? "justify-end" : "justify-start"
        }`}
    >
      {!isUser && (
        <div className="flex-shrink-0 mr-3">
          {currentPersonaData?.icon ? (
            <div className="w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center text-xl">
              {currentPersonaData.icon}
            </div>
          ) : (
            <img
              src={assets.stellar_icon}
              alt=""
              className="w-10 h-10 rounded-full"
            />
          )}
        </div>
      )}
      <div className="flex flex-col max-w-[80%]">
        <div
          className={`result-text inline-block p-3 rounded-3xl ${isUser ? getPromptClasses() : getThemeClasses()
            }`}
        >
          {isUser ? (
            <div>
              <p>{message.parts[0].text}</p>
              {/* Show attachment indicators */}
              {message.attachmentPreviews && message.attachmentPreviews.length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {message.attachmentPreviews.map((att, i) => (
                    <span key={i} className="flex items-center gap-1 text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                      {att.type === "image" ? <FiImage size={12} /> : <FiFile size={12} />}
                      {att.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code: CodeBlock,
                  // Custom link styling
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 underline"
                    />
                  ),
                }}
              >
                {message.parts[0].text || processedResponse?.replace(/<[^>]*>/g, '') || ""}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Copy button for AI responses */}
        {!isUser && message.parts[0].text && (
          <div className="flex items-center gap-2 mt-1 ml-2">
            <button
              onClick={() => handleCopy(message.parts[0].text)}
              className="text-xs flex items-center gap-1 text-primary-300 hover:text-text transition-colors"
            >
              {copied ? <FiCheck size={12} /> : <FiCopy size={12} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
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
          className="w-10 h-10 rounded-full inline-block ml-3 flex-shrink-0"
        />
      )}
    </div>
  );
};

export default ChatMessage;
