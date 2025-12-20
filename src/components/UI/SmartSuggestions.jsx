import React from "react";

const SmartSuggestions = ({ suggestions, onSelect, loading }) => {
    if (loading) {
        return (
            <div className="flex gap-2 flex-wrap mt-4 mb-2 px-5">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="h-10 w-40 bg-primary-200 rounded-full animate-pulse"
                    />
                ))}
            </div>
        );
    }

    if (!suggestions || suggestions.length === 0) {
        return null;
    }

    return (
        <div className="flex gap-2 flex-wrap mt-4 mb-2 px-5">
            {suggestions.map((suggestion, index) => (
                <button
                    key={index}
                    onClick={() => onSelect(suggestion)}
                    className="px-4 py-2 text-sm bg-primary-100 hover:bg-primary-200 text-text rounded-full transition-all duration-200 hover:scale-105 border border-primary-300 border-opacity-30 hover:border-opacity-60"
                >
                    {suggestion}
                </button>
            ))}
        </div>
    );
};

export default SmartSuggestions;
