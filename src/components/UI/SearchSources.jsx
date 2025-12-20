import React from "react";
import { FiExternalLink } from "react-icons/fi";

const SearchSources = ({ sources }) => {
    if (!sources || sources.length === 0) {
        return null;
    }

    return (
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-xl border border-blue-200 dark:border-blue-800">
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-1">
                <FiExternalLink size={12} />
                Sources from web search
            </p>
            <div className="flex flex-wrap gap-2">
                {sources.slice(0, 5).map((source, index) => (
                    <a
                        key={index}
                        href={source.web?.uri || source.uri || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors truncate max-w-48"
                        title={source.web?.title || source.title || "Source"}
                    >
                        {source.web?.title || source.title || new URL(source.web?.uri || source.uri || "").hostname}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default SearchSources;
