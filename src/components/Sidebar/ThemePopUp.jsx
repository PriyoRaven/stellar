import React from "react";
import { IoClose } from "react-icons/io5";

const ThemePopup = ({ onClose, onSelectTheme }) => {
  const themes = [
    { name: "Light", color: "#f0f4f9" },
    { name: "Dark", color: "#1a1a1a" },
    { name: "Blue", color: "#3b82f6" },
    { name: "Yellow", color: "#fbbf24" },
    { name: "Red", color: "#ef4444" },
    { name: "Green", color: "#10b981" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-400 rounded-lg p-6 w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Select Theme</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => onSelectTheme(theme.name.toLowerCase())}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
            >
              <div
                className="w-6 h-6 rounded-full border border-gray-300"
                style={{ backgroundColor: theme.color }}
              ></div>
              <span>{theme.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemePopup;
