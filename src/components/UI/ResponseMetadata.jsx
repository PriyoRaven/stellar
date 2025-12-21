import React from "react";
import { FiGlobe } from "react-icons/fi";

const ResponseMetadata = ({ message, availableModels, copied, onCopy }) => {
    const CopyIcon = copied ?
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> :
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;

    return (
        <div className="flex items-center gap-3 mt-2 ml-2 flex-wrap">
            {/* Copy button */}
            <button
                onClick={onCopy}
                className="text-xs flex items-center gap-1 text-primary-300 hover:text-text transition-colors"
            >
                {CopyIcon}
                {copied ? "Copied!" : "Copy"}
            </button>

            {/* Model info */}
            {message.modelId && availableModels && availableModels[message.modelId] && (
                <span className="text-xs flex items-center gap-1 text-primary-300 opacity-70">
                    <span>{availableModels[message.modelId].icon}</span>
                    <span>{availableModels[message.modelId].name}</span>
                </span>
            )}

            {/* Web search indicator */}
            {message.usedWebSearch && (
                <span className="text-xs flex items-center gap-1 text-blue-500">
                    <FiGlobe size={12} />
                    <span>Web Search</span>
                </span>
            )}
        </div>
    );
};

export default ResponseMetadata;
