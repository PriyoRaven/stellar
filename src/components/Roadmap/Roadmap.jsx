import React from "react";
import {
    FiLock,
    FiBarChart2,
    FiCloud,
    FiSmartphone,
    FiMic,
    FiImage,
    FiCheck,
    FiDatabase,
    FiSettings,
    FiClock,
    FiStar,
    FiZap
} from "react-icons/fi";
import { SiGooglegemini } from "react-icons/si";

const Roadmap = () => {
    const roadmapItems = [
        {
            phase: "Completed",
            icon: FiCheck,
            status: "completed",
            color: "from-green-500 to-emerald-500",
            features: [
                { name: "Gemini Integration", description: "Multiple model support", done: true },
                { name: "Dynamic Themes", description: "Color wheel & dark/light modes", done: true },
                { name: "AI Personas", description: "Multiple conversation styles", done: true },
                { name: "Web Search", description: "Real-time grounded responses", done: true },
                { name: "File Uploads", description: "Image & PDF analysis", done: true },
                { name: "Smart Suggestions", description: "AI-powered follow-ups", done: true },
            ]
        },
        {
            phase: "In Progress",
            icon: FiClock,
            status: "in-progress",
            color: "from-amber-500 to-yellow-500",
            features: [
                { name: "Responsive Design", description: "Mobile & tablet optimization", done: true },
                { name: "Token Optimization", description: "Reducing API costs", done: true },
                { name: "Error Handling", description: "Graceful quota/rate limits", done: true },
            ]
        },
        {
            phase: "Planned",
            icon: FiStar,
            status: "planned",
            color: "from-purple-500 to-violet-500",
            features: [
                { name: "Actual Database", description: "Storing user data in an actual database instead of the current browser local storage", icon: FiDatabase },
                { name: "User Authentication", description: "Sign Up, Sign In to secure accounts", icon: FiLock },
                { name: "Usage Analytics", description: "Quota tracking per model", icon: FiBarChart2 },
                { name: "Settings", description: "Customize your experience", icon: FiSettings },
                { name: "Cloud Sync", description: "Sync chats across devices", icon: FiCloud },
                { name: "PWA Support", description: "Install as mobile app", icon: FiSmartphone },
            ]
        },
        {
            phase: "Future Ideas",
            icon: FiZap,
            status: "future",
            color: "from-blue-500 to-cyan-500",
            features: [
                { name: "Voice Input", description: "Talk to Stellar", icon: FiMic },
                { name: "Image Generation", description: "AI art creation", icon: FiImage },
                { name: "Plugin System", description: "Extend with custom tools", icon: SiGooglegemini },
                { name: "Team Collaboration", description: "Shared workspaces", icon: FiCloud },
            ]
        }
    ];

    return (
        <div className="flex-1 min-h-screen bg-background text-text overflow-y-auto">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-purple-500/10" />
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
                    <div className="inline-flex items-center gap-2 bg-primary-200 px-4 py-2 rounded-full text-sm mb-6">
                        <FiStar className="text-amber-500" />
                        <span>What's Coming Next</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 bg-clip-text text-transparent">
                            Roadmap
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-primary-300 max-w-2xl mx-auto">
                        Exciting features on the horizon. Here's what's planned for Stellar's journey ahead.
                    </p>
                </div>
            </div>

            {/* Roadmap Timeline */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-24">
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-amber-500 to-purple-500 opacity-30" />

                    {roadmapItems.map((phase, phaseIndex) => (
                        <div key={phaseIndex} className="relative mb-12 last:mb-0">
                            {/* Phase header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${phase.color} flex items-center justify-center z-10`}>
                                    <phase.icon className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold">{phase.phase}</h2>
                                    <p className="text-sm text-primary-300">
                                        {phase.features.length} features
                                    </p>
                                </div>
                            </div>

                            {/* Features grid */}
                            <div className="ml-14 sm:ml-20 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {phase.features.map((feature, featureIndex) => (
                                    <div
                                        key={featureIndex}
                                        className={`group p-4 rounded-xl border transition-all duration-300 ${feature.done
                                            ? "bg-green-500/10 border-green-500/30"
                                            : "bg-primary-100 border-primary-200 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5"
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${feature.done
                                                ? "bg-green-500/20"
                                                : "bg-primary-200 group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-yellow-500"
                                                }`}>
                                                {feature.done ? (
                                                    <FiCheck className="text-green-500 w-4 h-4" />
                                                ) : (
                                                    feature.icon && <feature.icon className="w-4 h-4 group-hover:text-white transition-colors" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className={`font-medium text-sm ${feature.done ? "text-green-400" : ""}`}>
                                                    {feature.name}
                                                </h3>
                                                <p className="text-xs text-primary-300 mt-0.5">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to action */}
                <div className="mt-16 text-center">
                    <div className="inline-block bg-gradient-to-br from-primary-100 to-primary-200/50 rounded-2xl p-6 sm:p-8 border border-primary-200">
                        <h3 className="text-lg font-bold mb-2">Have a feature request?</h3>
                        <p className="text-sm text-primary-300 mb-4">
                            I'd love to hear your ideas for making Stellar even better!
                        </p>
                        <a
                            href="mailto:priyadarsi02@gmail.com?subject=Stellar Feature Request"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all hover:scale-105"
                        >
                            <FiZap size={18} />
                            Send Suggestion
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Roadmap;
