import React, { useContext, useState } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { Context } from "../../context/context";
import { AVAILABLE_MODELS } from "../../config/gemini";

const ModelSelector = () => {
    const { currentModel, setCurrentModel } = useContext(Context);
    const [isOpen, setIsOpen] = useState(false);

    const currentModelData = AVAILABLE_MODELS[currentModel] || AVAILABLE_MODELS["gemini-2.0-flash"];
    const modelList = Object.entries(AVAILABLE_MODELS);

    return (
        <div className="relative">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-primary-100 hover:bg-primary-200 rounded-full transition-all text-sm text-text"
            >
                <span>{currentModelData.icon}</span>
                <span className="hidden sm:inline">{currentModelData.name}</span>
                <FiChevronDown
                    size={14}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Menu */}
                    <div className="absolute bottom-full left-0 mb-2 w-64 bg-background border border-primary-200 rounded-xl shadow-lg z-50 overflow-hidden">
                        <div className="p-2">
                            <p className="text-xs text-primary-300 px-2 py-1 uppercase tracking-wide">
                                Select Model
                            </p>
                            {modelList.map(([modelId, model]) => (
                                <button
                                    key={modelId}
                                    onClick={() => {
                                        setCurrentModel(modelId);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${currentModel === modelId
                                            ? "bg-primary-200"
                                            : "hover:bg-primary-100"
                                        }`}
                                >
                                    <span className="text-lg">{model.icon}</span>
                                    <div className="flex-1 text-left">
                                        <p className="text-sm font-medium text-text">{model.name}</p>
                                        <p className="text-xs text-primary-300">{model.description}</p>
                                    </div>
                                    {currentModel === modelId && (
                                        <FiCheck size={16} className="text-green-500" />
                                    )}
                                    {model.tier === "premium" && (
                                        <span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full">
                                            Pro
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ModelSelector;
