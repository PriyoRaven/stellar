import React, { useState, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import { IoHelp, IoMenu } from "react-icons/io5";
import { FiMail, FiGithub, FiLinkedin } from "react-icons/fi";
import { FaPlus, FaTrash, FaPen } from "react-icons/fa";
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
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
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
        className={`h-screen flex flex-col px-2 sm:px-3 lg:px-4 py-2 sm:py-4 bg-primary-100 transition-all duration-300 ${extended
          ? "w-56 sm:w-60 lg:w-72 max-w-[80vw]"
          : "w-14 sm:w-16 lg:w-20"
          }`}
      >
        <div className="flex-1 overflow-y-auto the-scrollbar min-h-0">
          <IoMenu
            size={36}
            className="block cursor-pointer mb-4 sm:mb-6 p-1 sm:p-1.5 rounded-2xl hover:bg-primary-200 hover:text-text transition-all duration-300 sm:w-10 sm:h-10"
            onClick={toggleSidebar}
          />
          <div
            className={`inline-flex items-center py-2 px-2.5 gap-2 bg-primary-200 rounded-2xl text-sm text-text cursor-pointer hover:bg-primary-300 transition-all duration-300 ${extended ? "" : "justify-center"
              }`}
            onClick={handleNewChat}
          >
            <FaPlus size={18} />
            {extended && (
              <p
                className={`transition-opacity duration-300 ${showText ? "opacity-100" : "opacity-0"
                  }`}
              >
                New Chat
              </p>
            )}
          </div>

          {/* AI Persona Selector - always visible */}
          <div className={extended ? "mt-3 sm:mt-4" : "mt-2 sm:mt-3"}>
            <PersonaSelector isExpanded={extended} />
          </div>

          {/* Chats Section - fills remaining space */}
          {extended ? (
            <div className="flex flex-col flex-1 min-h-0 mt-3 sm:mt-4">
              <p className="mb-2 text-text tracking-wide text-sm flex-shrink-0">Recents</p>
              <div className="flex-1 overflow-y-auto the-scrollbar min-h-0">
                {conversations
                  .slice()
                  .reverse()
                  .map((talk) => (
                    <div
                      key={talk.id}
                      className={`group flex justify-between cursor-pointer rounded-xl p-2 sm:p-3 my-0.5 transition-all duration-300 items-center hover:bg-primary-200 ${talk.id === currentConversationId
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
                        <CiChat1 size={16} className="flex-shrink-0" />
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
                          <span className="text-xs sm:text-sm truncate">
                            {talk.title || (talk.history.length > 0
                              ? talk.history[0].parts[0].text.slice(0, 18) + "..."
                              : "New Chat")}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {editingId !== talk.id && (
                          <FaPen
                            size={10}
                            className="opacity-0 group-hover:opacity-100 hover:text-amber-500 transition-all"
                            onClick={(e) => handleStartEdit(e, talk)}
                          />
                        )}
                        <FaTrash
                          size={10}
                          className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-colors duration-300 ml-1 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirmId(talk.id);
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            /* Minimized chat icons - fills remaining space */
            <div className="flex flex-col flex-1 min-h-0 mt-3 sm:mt-4">
              <p className="mb-2 text-text tracking-wide invisible text-sm flex-shrink-0">R</p>
              <div className="flex-1 flex flex-col items-center gap-1 overflow-y-auto the-scrollbar min-h-0">
                {conversations
                  .slice()
                  .reverse()
                  .map((talk) => (
                    <div
                      key={talk.id}
                      onClick={() => {
                        switchConversation(talk.id);
                        navigate("/");
                      }}
                      className={`p-1.5 sm:p-2 rounded-xl cursor-pointer transition-all duration-200 flex-shrink-0 ${talk.id === currentConversationId
                        ? "bg-primary-200 scale-110"
                        : "hover:bg-primary-200 opacity-60 hover:opacity-100"
                        }`}
                      title={talk.title || "Chat"}
                    >
                      <CiChat1 size={16} />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom buttons - always at bottom */}
        <div
          className={`flex flex-col space-y-0.5 sm:space-y-1 flex-shrink-0 pt-2 sm:pt-3 border-t border-primary-200 mt-2 ${extended ? "" : "items-center"
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
            text="Roadmap"
            className={`${extended ? "" : "justify-center"} ${isActive("/roadmap") ? "bg-primary-200" : ""
              }`}
            showText={extended}
            fadeIn={showBottomText}
            onClick={() => navigate("/roadmap")}
          />

          {/* Social Media Buttons */}
          {extended && (
            <div className={`flex gap-2 justify-evenly items-center mt-5`}>

              {/* mail */}
              <Button
                icon={FiMail}
                className="justify-center pr-0"
                onClick={() =>
                  window.open("mailto:priyadarsi02@gmail.com", "_blank")
                }
              />

              {/* github */}
              <Button
                icon={FiGithub}
                className="justify-center pr-0"
                onClick={() =>
                  window.open("https://github.com/PriyoRaven", "_blank")
                }
              />

              {/* linkedin */}
              <Button
                icon={FiLinkedin}
                className="justify-center pr-0 hover:text-blue-500"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/priyadarsi-halder/",
                    "_blank"
                  )
                }
              />
            </div>
          )}
        </div>
      </div>

      {/* Portals for modals - render at body level to avoid transform issues */}
      {showThemePopup && createPortal(
        <ThemePopup
          onClose={() => setShowThemePopup(false)}
        />,
        document.body
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && createPortal(
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setDeleteConfirmId(null)}
        >
          <div
            className="bg-background rounded-2xl p-4 sm:p-6 w-full max-w-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-text mb-2">Delete Chat?</h3>
            <p className="text-sm text-primary-300 mb-4">
              This will permanently delete this conversation. This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-primary-200 hover:bg-primary-300 text-text transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteConversation(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Sidebar;
