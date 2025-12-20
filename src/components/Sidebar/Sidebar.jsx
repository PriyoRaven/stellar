import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import { IoHelp, IoMenu, IoSettings } from "react-icons/io5";
import { FaGithub, FaLinkedin, FaPlus, FaTrash, FaPen } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { RxCountdownTimer } from "react-icons/rx";
import { MdColorLens } from "react-icons/md";
import ThemePopup from "./ThemePopUp";
import { ThemeContext } from "../../context/themeContext";
import { Context } from "../../context/context";
import { FaXTwitter } from "react-icons/fa6";
import PersonaSelector from "../UI/PersonaSelector";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showBottomText, setShowBottomText] = useState(false);
  const [showThemePopup, setShowThemePopup] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const { hue } = useContext(ThemeContext);
  const {
    conversations,
    currentConversationId,
    startNewChat,
    switchConversation,
    deleteConversation,
    renameConversation,
  } = useContext(Context);

  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setExtended((prev) => !prev);
    setShowText(false);
    setShowBottomText(false);
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

  const handleNewChat = () => {
    startNewChat();
    navigate("/");
  };

  const handleStartEdit = (e, talk) => {
    e.stopPropagation();
    setEditingId(talk.id);
    setEditTitle(talk.title || "New Chat");
  };

  const handleSaveEdit = (e, id) => {
    e.stopPropagation();
    if (editTitle.trim()) {
      renameConversation(id, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle("");
  };

  const handleEditKeyDown = (e, id) => {
    if (e.key === "Enter") {
      handleSaveEdit(e, id);
    } else if (e.key === "Escape") {
      setEditingId(null);
      setEditTitle("");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div
        className={`min-h-screen inline-flex flex-col justify-between px-4 py-4 bg-primary-100 transition-all duration-300 ${extended ? "w-72" : "w-20"
          }`}
      >
        <div className="top">
          <IoMenu
            size={45}
            className="block cursor-pointer mb-10 p-2.5 rounded-2xl hover:bg-primary-200 hover:text-text transition-all duration-300"
            onClick={toggleSidebar}
          />
          <div
            className={`inline-flex items-center py-2.5 px-3 gap-2.5 bg-primary-200 rounded-2xl text-sm text-text cursor-pointer hover:bg-primary-300 transition-all duration-300 ${extended ? "" : "justify-center"
              }`}
            onClick={handleNewChat}
          >
            <FaPlus size={20} />
            {extended && (
              <p
                className={`transition-opacity duration-300 ${showText ? "opacity-100" : "opacity-0"
                  }`}
              >
                New Chat
              </p>
            )}
          </div>

          {/* AI Persona Selector */}
          {extended && (
            <div className="mt-4">
              <PersonaSelector isExpanded={extended} />
            </div>
          )}

          {extended && (
            <div className="flex flex-col">
              <p className="mt-7 mb-5 text-text">Recents</p>
              <div className="h-48 overflow-y-auto the-scrollbar">
                {conversations
                  .slice()
                  .reverse()
                  .map((talk) => (
                    <div
                      key={talk.id}
                      className={`flex justify-between cursor-pointer rounded-xl py-1.5 px-2 my-1 transition-all duration-300 items-center hover:bg-primary-200 ${extended ? "" : "justify-center"
                        } ${talk.id === currentConversationId
                          ? "bg-primary-200"
                          : ""
                        }`}
                      onClick={() => {
                        if (editingId !== talk.id) {
                          switchConversation(talk.id);
                          navigate("/");
                        }
                      }}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <CiChat1 size={18} className="flex-shrink-0" />
                        {editingId === talk.id ? (
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onKeyDown={(e) => handleEditKeyDown(e, talk.id)}
                            onBlur={(e) => handleSaveEdit(e, talk.id)}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 bg-primary-100 border border-primary-300 rounded px-2 py-0.5 text-sm outline-none focus:border-amber-500"
                            autoFocus
                          />
                        ) : (
                          <span className="text-sm truncate">
                            {talk.title || (talk.history.length > 0
                              ? talk.history[0].parts[0].text.slice(0, 20) + "..."
                              : "New Chat")}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {editingId !== talk.id && (
                          <FaPen
                            size={12}
                            className="opacity-0 group-hover:opacity-100 hover:text-amber-500 transition-all"
                            onClick={(e) => handleStartEdit(e, talk)}
                          />
                        )}
                        <FaTrash
                          size={12}
                          className="hover:text-red-500 transition-colors duration-300 ml-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteConversation(talk.id);
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        <div
          className={`flex flex-col space-y-1 ${extended ? "" : "items-center"
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
            className={`${extended ? "" : "justify-center"} ${isActive("/about") ? "bg-primary-200" : ""
              }`}
            showText={extended}
            fadeIn={showBottomText}
            onClick={() => navigate("/about")}
          />
          <Button
            icon={RxCountdownTimer}
            text="Activity"
            className={`${extended ? "" : "justify-center"} ${isActive("/activity") ? "bg-primary-200" : ""
              }`}
            showText={extended}
            fadeIn={showBottomText}
            onClick={() => navigate("/activity")}
          />

          {/* Social Media Buttons */}
          {extended && (
            <div className={`flex gap-2 justify-evenly items-center mt-5`}>
              <Button
                icon={FaXTwitter}
                className="justify-center pr-0 hover:text-blue-400"
                onClick={() =>
                  window.open("https://x.com/PriyadarsiHald2", "_blank")
                }
              />
              <Button
                icon={FaGithub}
                className="justify-center pr-0"
                onClick={() =>
                  window.open("https://github.com/PriyoRaven", "_blank")
                }
              />
              <Button
                icon={FaLinkedin}
                className="justify-center pr-0 hover:text-blue-500"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/priyadarsi-halder-786a8a237/",
                    "_blank"
                  )
                }
              />
            </div>
          )}
        </div>
      </div>

      {showThemePopup && (
        <ThemePopup
          onClose={() => setShowThemePopup(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
