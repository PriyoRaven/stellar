import React from "react";

import Button from "../Button";
import { IoHelp, IoMenu, IoSettings } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { RxCountdownTimer } from "react-icons/rx";

const Sidebar = () => {
  return (
    <div className="min-h-screen inline-flex flex-col justify-between px-6 py-4 bg-primary-100">
      {/* the top part starts here need to be a different component */}
      <div className="top">
        <IoMenu size={20} className="block ml-2.5 cursor-pointer" />
        <div className="mt-8 inline-flex items-center py-2.5 px-3 gap-2.5 bg-primary-200 rounded-2xl text-sm text-gray-600 cursor-pointer">
          <FaPlus size={20} />
          <p>New Chat</p>
        </div>
        <div className="flex flex-col">
          <p className="mt-7 mb-5">Recent</p>
          <div className="flex items-start gap-2.5 p-2.5 pr-10 rounded-3xl text-gray-900 cursor-pointer hover:bg-primary-200">
            <CiChat1 size={20} />
            <p>What is react...</p>
          </div>
        </div>
      </div>

      {/* the bottom part starts here need to be a different component */}
      <div className="flex flex-col">
        <Button icon={IoHelp} text="Help" className="" />
        <Button icon={RxCountdownTimer} text="Activity" className="" />
        <Button icon={IoSettings} text="Settings" className="" />
      </div>
    </div>
  );
};

export default Sidebar;
