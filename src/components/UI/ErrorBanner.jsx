import React from "react";
import { FiAlertTriangle, FiX, FiClock, FiZap } from "react-icons/fi";

const ErrorBanner = ({ error, onDismiss }) => {
    if (!error) return null;

    const isQuotaError = error.type === "quota";
    const isRateLimit = error.type === "rate_limit";

    return (
        <div className="max-w-5xl mx-auto px-2 sm:px-4">
            <div
                className={`
                    relative overflow-hidden
                    my-2 sm:my-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl 
                    flex items-center gap-2 sm:gap-4
                    shadow-lg backdrop-blur-sm
                    ${isQuotaError || isRateLimit
                        ? "bg-gradient-to-r from-amber-500/90 to-orange-500/90 text-white"
                        : "bg-gradient-to-r from-red-500/90 to-rose-500/90 text-white"
                    }
                `}
                style={{
                    animation: "slideDown 0.3s ease-out"
                }}
            >
                {/* Background decoration - hidden on mobile */}
                <div className="absolute inset-0 opacity-10 hidden sm:block">
                    <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/30" />
                    <div className="absolute -left-4 -bottom-4 w-24 h-24 rounded-full bg-white/20" />
                </div>

                {/* Icon */}
                <div className={`
                    relative flex-shrink-0 
                    w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl 
                    flex items-center justify-center
                    bg-white/20
                `}>
                    {isRateLimit ? (
                        <FiClock className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : isQuotaError ? (
                        <FiZap className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                        <FiAlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                </div>

                {/* Content */}
                <div className="relative flex-1 min-w-0">
                    <p className="font-semibold text-base sm:text-lg leading-tight">
                        {isQuotaError && "Quota Exceeded"}
                        {isRateLimit && "Rate Limited"}
                        {!isQuotaError && !isRateLimit && "Oops!"}
                    </p>
                    <p className="text-xs sm:text-sm opacity-90 mt-0.5 line-clamp-2">
                        {error.message}
                    </p>
                    {error.retryAfter && (
                        <div className="flex items-center gap-2 mt-1 sm:mt-2">
                            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium bg-white/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                                <FiClock className="w-3 h-3" />
                                Retry in {Math.ceil(error.retryAfter)}s
                            </span>
                        </div>
                    )}
                </div>

                {/* Dismiss button */}
                {onDismiss && (
                    <button
                        onClick={onDismiss}
                        className="relative flex-shrink-0 p-1.5 sm:p-2 hover:bg-white/20 rounded-lg sm:rounded-xl transition-all duration-200"
                        aria-label="Dismiss"
                    >
                        <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                )}
            </div>

            <style>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default ErrorBanner;
