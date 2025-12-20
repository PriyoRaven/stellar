import React, { useContext } from "react";
import { Context } from "../../context/context";
import { ThemeContext } from "../../context/themeContext";

const PersonaSelector = ({ isExpanded = true }) => {
    const { currentPersona, setCurrentPersona, personas } = useContext(Context);
    const { theme } = useContext(ThemeContext);

    const personaList = Object.entries(personas);

    if (!isExpanded) {
        // Compact view - just show icon
        const current = personas[currentPersona];
        return (
            <div
                className="flex items-center justify-center p-2 cursor-pointer hover:bg-primary-200 rounded-xl transition-all"
                title={`Current: ${current.name}`}
            >
                <span className="text-2xl">{current.icon}</span>
            </div>
        );
    }

    return (
        <div className="p-3">
            <p className="text-xs text-primary-300 mb-2 font-semibold uppercase tracking-wide">
                AI Persona
            </p>
            <div className="space-y-1">
                {personaList.map(([key, persona]) => (
                    <div
                        key={key}
                        onClick={() => setCurrentPersona(key)}
                        className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all duration-200 ${currentPersona === key
                                ? "bg-primary-200 border-l-4 border-amber-500"
                                : "hover:bg-primary-200"
                            }`}
                    >
                        <span className="text-xl">{persona.icon}</span>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-text truncate">
                                {persona.name}
                            </p>
                            <p className="text-xs text-primary-300 truncate">
                                {persona.description}
                            </p>
                        </div>
                        {currentPersona === key && (
                            <div className="w-2 h-2 bg-amber-500 rounded-full" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PersonaSelector;
