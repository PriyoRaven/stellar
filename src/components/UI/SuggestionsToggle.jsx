import React, { useContext } from "react";
import { FiZap, FiZapOff } from "react-icons/fi";
import { Context } from "../../context/context";

const SuggestionsToggle = () => {
    const { suggestionsEnabled, setSuggestionsEnabled } = useContext(Context);

    return (
        <button
            onClick={() => setSuggestionsEnabled(!suggestionsEnabled)}
            className={`p-2 rounded-full transition-all duration-200 ${suggestionsEnabled
                ? "bg-purple-500 text-white hover:bg-purple-600"
                : "bg-primary-100 text-primary-300 hover:bg-primary-200"
                }`}
            title={suggestionsEnabled ? "Smart suggestions ON (uses extra API calls)" : "Smart suggestions OFF (saves tokens)"}
        >
            {suggestionsEnabled ? <FiZap size={18} /> : <FiZapOff size={18} />}
        </button>
    );
};

export default SuggestionsToggle;
