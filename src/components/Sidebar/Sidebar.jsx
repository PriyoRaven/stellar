import React, { useState, useEffect } from "react";
import Button from "../Button";
import { IoHelp, IoMenu, IoSettings } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { RxCountdownTimer } from "react-icons/rx";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showBottomText, setShowBottomText] = useState(false);

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
    <div
      className={`min-h-screen inline-flex flex-col justify-between px-4 py-4 bg-primary-100 transition-all duration-300 ${
        extended ? "w-64" : "w-20"
      }`}
    >
      {/* Top part */}
      <div className="top">
        <IoMenu
          size={45}
          className="block cursor-pointer mb-10 p-2.5 rounded-2xl hover:bg-primary-200 hover:text-gray-600 transition-all duration-300"
          onClick={toggleSidebar}
        />
        <div
          className={`inline-flex items-center py-2.5 px-3 gap-2.5 bg-primary-200 rounded-2xl text-sm text-gray-400 cursor-pointer hover:bg-primary-300 hover:text-gray-600 transition-all duration-300 ${
            extended ? "" : "justify-center"
          }`}
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
            <p className="mt-7 mb-5">Recent</p>
            <Button
              icon={CiChat1}
              text="What is react..."
              className={`flex items-center ${
                extended ? "" : "justify-center"
              }`}
              showText={extended}
              fadeIn={showBottomText}
            />
          </div>
        )}
      </div>

      {/* Bottom part */}
      <div
        className={`flex flex-col space-y-1 ${extended ? "" : "items-center"}`}
      >
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
  );
};

export default Sidebar;
