import React from "react";
import { GrSend } from "react-icons/gr";
import FileUpload from "../UI/FileUpload";
import WebSearchToggle from "../UI/WebSearchToggle";
import ModelSelector from "../UI/ModelSelector";
import SuggestionsToggle from "../UI/SuggestionsToggle";

const InputArea = ({
    input,
    setInput,
    onSend,
    placeholderName = "Stellar"
}) => {
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="main-bottom fixed bottom-0 left-0 right-0 lg:absolute lg:left-auto lg:right-auto w-full max-w-5xl px-2 sm:px-5 py-0 mx-auto bg-background">
            <div className="search-box flex items-center gap-2 sm:gap-3 bg-primary-100 py-2 sm:py-3 px-3 sm:px-5 rounded-full">
                <input
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    className="flex-1 bg-transparent border-0 outline-none p-1 sm:p-2 text-sm sm:text-lg min-w-0"
                    type="text"
                    placeholder={`Ask ${placeholderName}...`}
                    onKeyDown={handleKeyDown}
                />
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    {/* Hide some controls on mobile to save space */}
                    <div className="hidden sm:block">
                        <ModelSelector />
                    </div>
                    <div className="hidden sm:block">
                        <SuggestionsToggle />
                    </div>
                    <FileUpload />
                    <WebSearchToggle />
                    <button
                        onClick={onSend}
                        disabled={!input.trim()}
                        className={`p-2 hover:bg-amber-300 hover:scale-110 rounded-full transition-all duration-300 ${!input.trim() ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        <GrSend size={18} className="sm:w-[22px] sm:h-[22px]" />
                    </button>
                </div>
            </div>
            <p className="bottom-info text-[10px] sm:text-xs my-1 sm:my-2 mx-auto text-center font-light text-slate-400">
                Stellar uses Gemini Generative AIs. Ai can make mistakes. 🌟
            </p>
        </div>
    );
};

export default InputArea;
