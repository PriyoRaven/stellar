import React, { useState, useEffect, useContext } from "react";
import Button from "../UI/Button";
import { IoHelp, IoMenu, IoSettings } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa";
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
    deleteConversation,
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
              <p className="mt-7 mb-5 text-text">Recents</p>
              <div className="h-80 overflow-y-auto the-scrollbar">
                {conversations
                  .slice()
                  .reverse()
                  .map((talk) => (
                    <div
                      key={talk.id}
                      className={`flex justify-between cursor-pointer rounded-full py-0.5 px-2 transition-all duration-300 items-center hover:bg-primary-200 ${
                        extended ? "" : "justify-center"
                      } ${
                        talk.id === currentConversationId
                          ? "bg-primary-200"
                          : ""
                      }`}
                      onClick={() => switchConversation(talk.id)}
                    >
                      <Button
                        icon={CiChat1}
                        text={
                          talk.history.length > 0
                            ? talk.history[0].parts[0].text.slice(0, 10) + "..."
                            : "New Chat"
                        }
                        showText={extended}
                        fadeIn={showBottomText}
                      />
                      <FaTrash
                        size={16}
                        className="mx-2 hover:bg-primary-200  cursor-pointer hover:text-red-500 transition-colors duration-300"
                        onClick={() => deleteConversation(talk.id)}
                      />
                    </div>
                  ))}
              </div>
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
            text="About"
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
