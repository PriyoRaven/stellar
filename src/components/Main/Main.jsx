import React from "react";
import { assets } from "../../assets/assets";
import Card from "../Card";
import { GrGallery, GrSend } from "react-icons/gr";
import { HiMiniMicrophone } from "react-icons/hi2";
import { IoBulbOutline, IoCodeSlash, IoCompassOutline } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";

const Main = () => {
  return (
    <div className="this-main flex-1 min-h-screen pb-28 relative">
      <div className="this-nav flex justify-between items-center text-xl p-5 text-lime-900">
        <p>Stellar</p>
        <img
          className="w-10 rounded-full"
          src={assets.user_icon}
          alt="User Icon"
        />
      </div>
      <div className="main-container max-w-5xl m-auto">
        <div className="greet my-12 mx-0 text-6xl font-semibold p-5 text-primary-300">
          <p>
            <span className="bg-gradient-to-r from-purple-500 via-fuchsia-600 to-pink-500 bg-clip-text text-transparent">
              Hello, Raven
            </span>
          </p>
          <p>How can I help you today?</p>
        </div>
        <div className="cards grid grid-cols-4 gap-4 p-5">
          <Card
            text="Suggest me some beautiful place to see in India"
            icon={IoCompassOutline}
          />
          <Card
            text="Write an Essay on the importance of learning React"
            icon={IoBulbOutline}
          />
          <Card
            text="Brainstorm ideas for a new react project"
            icon={FiMessageCircle}
          />
          <Card text="Improve the readability of my code" icon={IoCodeSlash} />
        </div>

        <div className="main-bottom absolute bottom-0 w-full max-w-5xl px-5 py-0 m-auto">
          <div className="search-box flex items-center justify-between gap-5 bg-primary-100 py-3 px-5 rounded-full">
            <input
              className="flex-1 bg-transparent border-0 outline-none p-2 text-lg"
              type="text"
              placeholder="Enter your prompt here"
            />
            <div className="flex justify-between items-center cursor-pointer gap-3">
              <GrGallery size={25} />
              <HiMiniMicrophone size={25} />
              <GrSend size={25} />
            </div>
          </div>
          <p className="bottom-info text-xs my-2 mx-auto text-center font-light text-slate-400">
            Stellar is using Gemini generative AI. So if anything goes wrong its
            not my fault.🥲
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
