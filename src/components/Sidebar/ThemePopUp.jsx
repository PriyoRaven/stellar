import React, { useRef, useState, useEffect, useContext } from "react";
import { IoClose } from "react-icons/io5";
import { FiSun, FiMoon } from "react-icons/fi";
import { ThemeContext } from "../../context/themeContext";

const ThemePopup = ({ onClose }) => {
  const canvasRef = useRef(null);
  const { hue, setHue, isDarkMode, setIsDarkMode, specialMode, setSpecialMode } = useContext(ThemeContext);
  const [selectedHue, setSelectedHue] = useState(hue || 45); // Default amber/gold
  const [isDragging, setIsDragging] = useState(false);
  const [selectedSpecial, setSelectedSpecial] = useState(specialMode);

  // Draw the color wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw color wheel
    for (let angle = 0; angle < 360; angle++) {
      const startAngle = (angle - 1) * Math.PI / 180;
      const endAngle = (angle + 1) * Math.PI / 180;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      // Use HSL color
      ctx.fillStyle = `hsl(${angle}, 70%, 50%)`;
      ctx.fill();
    }

    // Draw inner circle (to make it a ring)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = isDarkMode ? "#1a1a1a" : "#ffffff";
    ctx.fill();

    // Draw selection indicator (only if no special mode selected)
    if (!selectedSpecial) {
      const selectorAngle = (selectedHue - 90) * Math.PI / 180;
      const selectorRadius = radius * 0.75;
      const selectorX = centerX + Math.cos(selectorAngle) * selectorRadius;
      const selectorY = centerY + Math.sin(selectorAngle) * selectorRadius;

      ctx.beginPath();
      ctx.arc(selectorX, selectorY, 12, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${selectedHue}, 70%, 50%)`;
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    // Draw center preview
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.4, 0, Math.PI * 2);
    if (selectedSpecial === "pureWhite") {
      ctx.fillStyle = "#f5f5f5";
    } else if (selectedSpecial === "pureBlack") {
      ctx.fillStyle = "#1a1a1a";
    } else {
      ctx.fillStyle = `hsl(${selectedHue}, ${isDarkMode ? "30%" : "85%"}, ${isDarkMode ? "25%" : "95%"})`;
    }
    ctx.fill();

  }, [selectedHue, isDarkMode, selectedSpecial]);

  const getHueFromPosition = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;

    let angle = Math.atan2(y, x) * 180 / Math.PI + 90;
    if (angle < 0) angle += 360;

    return Math.round(angle) % 360;
  };

  const handleCanvasClick = (e) => {
    const newHue = getHueFromPosition(e);
    setSelectedHue(newHue);
    setSelectedSpecial(null); // Clear special mode when picking from wheel
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleCanvasClick(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleCanvasClick(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleApply = () => {
    setSpecialMode(selectedSpecial);
    if (!selectedSpecial) {
      setHue(selectedHue);
    }
    onClose();
  };

  const handlePresetClick = (presetHue) => {
    setSelectedHue(presetHue);
    setSelectedSpecial(null);
  };

  const handleSpecialClick = (mode) => {
    setSelectedSpecial(mode);
  };

  // Preset hue values for quick selection
  const presets = [
    { name: "Gold", hue: 45, emoji: "✨" },
    { name: "Rose", hue: 350, emoji: "🌹" },
    { name: "Ocean", hue: 200, emoji: "🌊" },
    { name: "Forest", hue: 140, emoji: "🌲" },
    { name: "Sunset", hue: 25, emoji: "🌅" },
    { name: "Lavender", hue: 270, emoji: "💜" },
  ];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-background rounded-2xl p-6 w-96 shadow-2xl max-h-[90vh] overflow-y-auto the-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-text">Choose Your Theme</h2>
          <button
            onClick={onClose}
            className="text-primary-300 hover:text-text transition-colors p-1 rounded-full hover:bg-primary-100"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Special Themes - Pure White & Pure Black */}
        <div className="mb-4">
          <p className="text-xs text-primary-300 mb-2 uppercase tracking-wide">Classic Themes</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => handleSpecialClick("pureWhite")}
              className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl transition-all border-2 ${selectedSpecial === "pureWhite"
                  ? "border-gray-400 ring-2 ring-gray-300"
                  : "border-gray-200 hover:border-gray-300"
                }`}
              style={{ backgroundColor: "#ffffff" }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white to-gray-200 border border-gray-300 flex items-center justify-center">
                <FiSun size={20} className="text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Pure White</span>
            </button>
            <button
              onClick={() => handleSpecialClick("pureBlack")}
              className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl transition-all border-2 ${selectedSpecial === "pureBlack"
                  ? "border-gray-600 ring-2 ring-gray-500"
                  : "border-gray-700 hover:border-gray-600"
                }`}
              style={{ backgroundColor: "#0a0a0a" }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-black border border-gray-600 flex items-center justify-center">
                <FiMoon size={20} className="text-gray-300" />
              </div>
              <span className="text-sm font-medium text-gray-300">Pure Black</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-primary-200"></div>
          <span className="text-xs text-primary-300">or pick a color</span>
          <div className="flex-1 h-px bg-primary-200"></div>
        </div>

        {/* Color Wheel */}
        <div className="flex justify-center mb-4">
          <canvas
            ref={canvasRef}
            width={200}
            height={200}
            className={`cursor-crosshair rounded-full transition-opacity ${selectedSpecial ? "opacity-50" : ""}`}
            onClick={handleCanvasClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>

        {/* Dark/Light Mode Toggle (only for color wheel selection) */}
        {!selectedSpecial && (
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={() => setIsDarkMode(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${!isDarkMode
                  ? "bg-amber-100 text-amber-700 ring-2 ring-amber-400"
                  : "bg-primary-100 text-primary-300 hover:bg-primary-200"
                }`}
            >
              <FiSun size={18} />
              Light
            </button>
            <button
              onClick={() => setIsDarkMode(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${isDarkMode
                  ? "bg-gray-700 text-white ring-2 ring-gray-500"
                  : "bg-primary-100 text-primary-300 hover:bg-primary-200"
                }`}
            >
              <FiMoon size={18} />
              Dark
            </button>
          </div>
        )}

        {/* Preset Colors */}
        {!selectedSpecial && (
          <div className="mb-4">
            <p className="text-xs text-primary-300 mb-2 uppercase tracking-wide">Quick Presets</p>
            <div className="flex gap-2 flex-wrap justify-center">
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handlePresetClick(preset.hue)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-all ${selectedHue === preset.hue && !selectedSpecial
                      ? "ring-2 ring-offset-2"
                      : "hover:scale-105"
                    }`}
                  style={{
                    backgroundColor: `hsl(${preset.hue}, 70%, ${isDarkMode ? "25%" : "85%"})`,
                    color: `hsl(${preset.hue}, 70%, ${isDarkMode ? "80%" : "25%"})`,
                  }}
                >
                  <span>{preset.emoji}</span>
                  <span>{preset.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Preview */}
        <div
          className="rounded-xl p-4 mb-4 transition-colors"
          style={{
            backgroundColor: selectedSpecial === "pureWhite" ? "#f5f5f5"
              : selectedSpecial === "pureBlack" ? "#1a1a1a"
                : `hsl(${selectedHue}, ${isDarkMode ? "30%" : "85%"}, ${isDarkMode ? "15%" : "95%"})`,
            color: selectedSpecial === "pureWhite" ? "#1f2937"
              : selectedSpecial === "pureBlack" ? "#f5f5f5"
                : `hsl(${selectedHue}, 70%, ${isDarkMode ? "80%" : "25%"})`
          }}
        >
          <p className="text-sm font-medium mb-1">Preview</p>
          <p className="text-xs opacity-70">This is how your theme will look</p>
          <div className="flex gap-2 mt-2">
            {selectedSpecial === "pureWhite" ? (
              <>
                <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: "#f5f5f5" }} />
                <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: "#e8e8e8" }} />
                <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: "#9ca3af" }} />
              </>
            ) : selectedSpecial === "pureBlack" ? (
              <>
                <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: "#1a1a1a" }} />
                <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: "#262626" }} />
                <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: "#525252" }} />
              </>
            ) : (
              <>
                <div
                  className="w-8 h-8 rounded-lg"
                  style={{ backgroundColor: `hsl(${selectedHue}, ${isDarkMode ? "30%" : "70%"}, ${isDarkMode ? "25%" : "90%"})` }}
                />
                <div
                  className="w-8 h-8 rounded-lg"
                  style={{ backgroundColor: `hsl(${selectedHue}, ${isDarkMode ? "30%" : "60%"}, ${isDarkMode ? "35%" : "85%"})` }}
                />
                <div
                  className="w-8 h-8 rounded-lg"
                  style={{ backgroundColor: `hsl(${selectedHue}, 70%, 50%)` }}
                />
              </>
            )}
          </div>
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className="w-full py-3 rounded-xl font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{
            backgroundColor: selectedSpecial === "pureWhite" ? "#374151"
              : selectedSpecial === "pureBlack" ? "#525252"
                : `hsl(${selectedHue}, 70%, 50%)`,
            color: "#ffffff"
          }}
        >
          Apply Theme
        </button>
      </div>
    </div>
  );
};

export default ThemePopup;
