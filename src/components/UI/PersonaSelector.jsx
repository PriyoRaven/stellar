import React, { useContext, useState, useRef, useEffect } from "react";
import { Context } from "../../context/context";
import { FiChevronDown } from "react-icons/fi";

const PersonaSelector = ({ isExpanded = true }) => {
    const { currentPersona, setCurrentPersona, personas } = useContext(Context);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const personaList = Object.entries(personas);
    const currentPersonaData = personas[currentPersona];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (key) => {
        setCurrentPersona(key);
        setIsOpen(false);
    };

    if (!isExpanded) {
        // Compact view - just show current persona icon as button
        return (
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-1.5 sm:p-2 rounded-xl cursor-pointer transition-all duration-200 hover:bg-primary-200"
                    title={`Persona: ${currentPersonaData?.name}`}
                >
                    <span className="text-lg sm:text-xl">{currentPersonaData?.icon}</span>
                </button>

                {/* Dropdown menu */}
                {isOpen && (
                    <div className="absolute left-full ml-2 top-0 bg-background border border-primary-200 rounded-xl shadow-lg py-1 z-50 min-w-[140px]">
                        {personaList.map(([key, persona]) => (
                            <button
                                key={key}
                                onClick={() => handleSelect(key)}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-primary-200 transition-colors ${currentPersona === key ? "bg-primary-100" : ""
                                    }`}
                            >
                                <span className="text-lg">{persona.icon}</span>
                                <span className="text-sm">{persona.name}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Expanded view - dropdown button
    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between gap-2 p-2 sm:p-2.5 rounded-xl cursor-pointer transition-all duration-200 ${isOpen
                    ? "bg-primary-200"
                    : "bg-primary-100 hover:bg-primary-200"
                    }`}
            >
                <div className="flex items-center gap-2 min-w-0">
                    <span className="text-lg sm:text-xl">{currentPersonaData?.icon}</span>
                    <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-text truncate">
                            {currentPersonaData?.name}
                        </p>
                    </div>
                </div>
                <FiChevronDown
                    className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                    size={16}
                />
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-background border border-primary-200 rounded-xl shadow-lg py-1 z-50 max-h-48 overflow-y-auto the-scrollbar">
                    {personaList.map(([key, persona]) => (
                        <button
                            key={key}
                            onClick={() => handleSelect(key)}
                            className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-primary-200 transition-colors ${currentPersona === key ? "bg-primary-100" : ""
                                }`}
                        >
                            <span className="text-lg">{persona.icon}</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-text truncate">
                                    {persona.name}
                                </p>
                                <p className="text-xs text-primary-300 truncate">
                                    {persona.description}
                                </p>
                            </div>
                            {currentPersona === key && (
                                <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PersonaSelector;
