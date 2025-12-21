// Available Gemini models configuration
// Based on official Google AI documentation: https://ai.google.dev/gemini-api/docs/models

export const AVAILABLE_MODELS = {
    // Gemini 2.5 Flash-Lite (fastest, cost-effective)
    "gemini-2.5-flash-lite": {
        name: "Gemini 2.5 Flash Lite",
        description: "Fastest",
        icon: "⚡",
        tier: "standard"
    },
    // Gemini 2.5 Flash (balanced performance)
    "gemini-2.5-flash": {
        name: "Gemini 2.5 Flash",
        description: "Better performance",
        icon: "🚀",
        tier: "standard"
    },
    // Gemini 2.5 Pro (most powerful)
    "gemini-2.5-pro": {
        name: "Gemini 2.5 Pro",
        description: "Much advance",
        icon: "💎",
        tier: "premium"
    },
    // Gemini 3 Flash Preview (latest intelligent model)
    "gemini-3-flash-preview": {
        name: "Gemini 3 Flash",
        description: "Latest & smartest",
        icon: "✨",
        tier: "premium"
    },
    // Gemini 2.0 Flash (why not?)
    "gemini-2.0-flash": {
        name: "Gemini 2.0 Flash",
        description: "Why not?",
        icon: "⭐",
        tier: "standard"
    },
};

export const DEFAULT_MODEL = "gemini-2.5-flash-lite";

export default AVAILABLE_MODELS;
