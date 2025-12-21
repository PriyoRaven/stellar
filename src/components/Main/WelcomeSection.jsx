import React from "react";
import Card from "../UI/Card";
import { IoBulbOutline, IoCodeSlash, IoCompassOutline } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";

const WelcomeSection = ({ currentPersonaData, currentPersona, onCardClick }) => {
    const suggestions = [
        {
            text: "Suggest me some beautiful place to see in India",
            icon: IoCompassOutline,
            iconClass: "text-sky-500"
        },
        {
            text: "Write an Essay on the importance of AI in daily life",
            icon: IoBulbOutline,
            iconClass: "text-yellow-500"
        },
        {
            text: "Hey Stellar, how are you doing today?",
            icon: FiMessageCircle,
            iconClass: "text-green-500"
        },
        {
            text: "What programming knowledge are required to build a website?",
            icon: IoCodeSlash,
            iconClass: ""
        }
    ];

    return (
        <>
            <div className="greet my-3 sm:my-5 mx-0 text-2xl sm:text-4xl lg:text-5xl font-bold p-3 sm:p-5">
                <p>
                    <span className="bg-gradient-to-r from-amber-500 via-yellow-400 to-lime-500 bg-clip-text text-transparent">
                        Hello, Raven
                    </span>
                </p>
                <p className="text-xl sm:text-3xl lg:text-5xl mt-1">How can I help you today?</p>
                {currentPersonaData && currentPersona !== "default" && (
                    <p className="text-sm sm:text-lg font-normal mt-2 sm:mt-4 text-primary-300">
                        {currentPersonaData.icon} Chatting with: <strong>{currentPersonaData.name}</strong>
                    </p>
                )}
            </div>
            <div className="cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 p-3 sm:p-5">
                {suggestions.map((suggestion, index) => (
                    <div
                        key={index}
                        onClick={() => onCardClick(suggestion.text)}
                        className="cursor-pointer"
                    >
                        <Card
                            text={suggestion.text}
                            icon={suggestion.icon}
                            className={suggestion.iconClass}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default WelcomeSection;
