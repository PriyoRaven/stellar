import React, { useContext } from "react";
import { FiGlobe } from "react-icons/fi";
import { Context } from "../../context/context";

const WebSearchToggle = () => {
    const { webSearchEnabled, setWebSearchEnabled } = useContext(Context);

    return (
        <button
            onClick={() => setWebSearchEnabled(!webSearchEnabled)}
            className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${webSearchEnabled
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "text-text hover:bg-primary-200 opacity-60"
                }`}
            title={webSearchEnabled ? "Web search enabled - click to disable" : "Click to enable web search"}
        >
            <FiGlobe size={20} />
        </button>
    );
};

export default WebSearchToggle;
