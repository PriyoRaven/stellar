import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy, FiCheck } from "react-icons/fi";

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

export default CodeBlock;
