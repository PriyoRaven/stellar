import React, { useState, useEffect, useContext } from "react";
import Button from "../Button";
import { IoHelp, IoMenu, IoSettings } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { RxCountdownTimer } from "react-icons/rx";
import { MdColorLens } from "react-icons/md";
import ThemePopup from "./ThemePopUp";
import { ThemeContext } from "../../context/themeContext";
import { Context } from "../../context/context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showBottomText, setShowBottomText] = useState(false);
  const [showThemePopup, setShowThemePopup] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  const {
    conversations,
    currentConversationId,
    startNewChat,
    switchConversation,
  } = useContext(Context);

  const toggleSidebar = () => {
    setExtended((prev) => {
      if (!prev) {
        setShowText(false);
        setShowBottomText(false);
      } else {
        setShowText(false);
        setShowBottomText(false);
      }
      return !prev;
    });
  };

  const handleThemeSelection = (selectedTheme) => {
    setTheme(selectedTheme);
    setShowThemePopup(false);
  };

  useEffect(() => {
    if (extended) {
      const timer = setTimeout(() => {
        setShowText(true);
        setShowBottomText(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [extended]);

  return (
    <>
      <div
        className={`min-h-screen inline-flex flex-col justify-between px-4 py-4 bg-primary-100 transition-all duration-300 ${
          extended ? "w-64" : "w-20"
        }`}
      >
        {/* Top part */}
        <div className="top">
          <IoMenu
            size={45}
            className="block cursor-pointer mb-10 p-2.5 rounded-2xl hover:bg-primary-200 hover:text-text transition-all duration-300"
            onClick={toggleSidebar}
          />
          <div
            className={`inline-flex items-center py-2.5 px-3 gap-2.5 bg-primary-200 rounded-2xl text-sm text-text cursor-pointer hover:bg-primary-300 transition-all duration-300 ${
              extended ? "" : "justify-center"
            }`}
            onClick={startNewChat}
          >
            <FaPlus size={20} />
            {extended && (
              <p
                className={`transition-opacity duration-300 ${
                  showText ? "opacity-100" : "opacity-0"
                }`}
              >
                New Chat
              </p>
            )}
          </div>
          {extended && (
            <div className="flex flex-col">
              <p className="mt-7 mb-5 text-text">Recent</p>
              {conversations
                .slice()
                .reverse()
                .map((conv) => (
                  <Button
                    key={conv.id}
                    icon={CiChat1}
                    text={
                      conv.history.length > 0
                        ? conv.history[0].parts[0].text.slice(0, 20) + "..."
                        : "New Chat"
                    }
                    className={`flex items-center ${
                      extended ? "" : "justify-center"
                    } ${
                      conv.id === currentConversationId ? "bg-primary-200" : ""
                    }`}
                    showText={extended}
                    fadeIn={showBottomText}
                    onClick={() => switchConversation(conv.id)}
                  />
                ))}
            </div>
          )}
        </div>

        {/* Bottom part */}
        <div
          className={`flex flex-col space-y-1 ${
            extended ? "" : "items-center"
          }`}
        >
          <Button
            icon={MdColorLens}
            text="Themes"
            className={`${extended ? "" : "justify-center"}`}
            showText={extended}
            fadeIn={showBottomText}
            onClick={() => setShowThemePopup(true)}
          />
          <Button
            icon={IoHelp}
            text="Help"
            className={`${extended ? "" : "justify-center"}`}
            showText={extended}
            fadeIn={showBottomText}
          />
          <Button
            icon={RxCountdownTimer}
            text="Activity"
            className={`${extended ? "" : "justify-center"}`}
            showText={extended}
            fadeIn={showBottomText}
          />
          <Button
            icon={IoSettings}
            text="Settings"
            className={`${extended ? "" : "justify-center"}`}
            showText={extended}
            fadeIn={showBottomText}
          />
        </div>
      </div>

      {showThemePopup && (
        <ThemePopup
          onClose={() => setShowThemePopup(false)}
          onSelectTheme={handleThemeSelection}
        />
      )}
    </>
  );
};

export default Sidebar;
