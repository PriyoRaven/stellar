import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const STORAGE_KEYS = {
  HUE: "stellar_theme_hue",
  DARK_MODE: "stellar_dark_mode",
  SPECIAL_MODE: "stellar_special_mode", // For pure white/black
};

// Special color presets
const SPECIAL_THEMES = {
  pureWhite: {
    primary100: "#f5f5f5",
    primary200: "#e8e8e8",
    primary300: "#9ca3af",
    text: "#1f2937",
    background: "#ffffff",
  },
  pureBlack: {
    primary100: "#1a1a1a",
    primary200: "#262626",
    primary300: "#525252",
    text: "#f5f5f5",
    background: "#0a0a0a",
  },
};

// Generate CSS color values from hue
const generateThemeColors = (hue, isDark, specialMode = null) => {
  // Check for special themes first
  if (specialMode === "pureWhite") {
    return SPECIAL_THEMES.pureWhite;
  }
  if (specialMode === "pureBlack") {
    return SPECIAL_THEMES.pureBlack;
  }

  // Normal HSL-based themes
  if (isDark) {
    return {
      primary100: `hsl(${hue}, 30%, 18%)`,
      primary200: `hsl(${hue}, 30%, 25%)`,
      primary300: `hsl(${hue}, 40%, 45%)`,
      text: `hsl(${hue}, 20%, 90%)`,
      background: `hsl(${hue}, 20%, 10%)`,
    };
  } else {
    return {
      primary100: `hsl(${hue}, 60%, 95%)`,
      primary200: `hsl(${hue}, 55%, 90%)`,
      primary300: `hsl(${hue}, 60%, 45%)`,
      text: `hsl(${hue}, 60%, 15%)`,
      background: `hsl(${hue}, 40%, 99%)`,
    };
  }
};

export const ThemeProvider = ({ children }) => {
  // Load saved preferences
  const [hue, setHue] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HUE);
      return saved ? parseInt(saved, 10) : 45; // Default golden/amber
    } catch (e) {
      return 45;
    }
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
      return saved === "true";
    } catch (e) {
      return false;
    }
  });

  const [specialMode, setSpecialMode] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SPECIAL_MODE);
      return saved || null;
    } catch (e) {
      return null;
    }
  });

  // Legacy theme support (for old preset themes)
  const [theme, setTheme] = useState("dynamic");

  // Apply theme colors to CSS variables
  useEffect(() => {
    const colors = generateThemeColors(hue, isDarkMode, specialMode);
    const root = document.documentElement;

    root.style.setProperty("--color-primary-100", colors.primary100);
    root.style.setProperty("--color-primary-200", colors.primary200);
    root.style.setProperty("--color-primary-300", colors.primary300);
    root.style.setProperty("--color-text", colors.text);
    root.style.setProperty("--color-background", colors.background);

    // Set data-theme for any legacy styles
    if (specialMode === "pureBlack") {
      root.setAttribute("data-theme", "dark");
    } else if (specialMode === "pureWhite") {
      root.setAttribute("data-theme", "light");
    } else {
      root.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    }

    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEYS.HUE, hue.toString());
      localStorage.setItem(STORAGE_KEYS.DARK_MODE, isDarkMode.toString());
      localStorage.setItem(STORAGE_KEYS.SPECIAL_MODE, specialMode || "");
    } catch (e) {
      console.error("Error saving theme:", e);
    }
  }, [hue, isDarkMode, specialMode]);

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      hue,
      setHue,
      isDarkMode,
      setIsDarkMode,
      specialMode,
      setSpecialMode,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
