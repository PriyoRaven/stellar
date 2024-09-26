import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import Card from "../Card";
import { GrGallery, GrSend } from "react-icons/gr";
import { HiMiniMicrophone } from "react-icons/hi2";
import { IoBulbOutline, IoCodeSlash, IoCompassOutline } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";
import { Context } from "../../context/context";

const ChatMessage = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`result-data my-4 flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <img
          src={assets.gemini_icon}
          alt=""
          className="w-10 h-10 rounded-full inline-block mr-3"
        />
      )}
      <p
        className={`result-text inline-block p-3 rounded-3xl ${
          isUser ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        {message.parts[0].text}
      </p>
      {isUser && (
        <img
          src={assets.user_icon}
          alt=""
          className="w-10 h-10 rounded-full inline-block ml-3"
        />
      )}
    </div>
  );
};

const Main = () => {
  const { onSent, showResult, loading, input, setInput, history } =
    useContext(Context);

  return (
    <div className="this-main flex-1 min-h-screen pb-28 relative">
      <div className="this-nav flex justify-between items-center text-xl p-5 text-lime-900">
        <p>Stellar</p>
        <img className="w-10 rounded-full" src={assets.user_icon} alt="" />
      </div>
      <div className="main-container max-w-5xl m-auto">
        {history.length === 0 ? (
          <>
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
                className={"text-sky-500"}
              />
              <Card
                text="Write an Essay on the importance of learning React"
                icon={IoBulbOutline}
                className={"text-yellow-500"}
              />
              <Card
                text="Hey Stellar, how are you doing today?"
                icon={FiMessageCircle}
                className={"text-green-500"}
              />
              <Card
                text="Improve the readability of my code"
                icon={IoCodeSlash}
              />
            </div>
          </>
        ) : (
          <div
            className="result py-0 overflow-y-scroll hide-scrollbar"
            style={{ paddingLeft: "5%", paddingRight: "5%", maxHeight: "70vh" }}
          >
            {history.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {loading && (
              <div className="loader w-full flex flex-col gap-2">
                <hr className="animated-bg" />
                <hr className="animated-bg" />
                <hr className="animated-bg" />
              </div>
            )}
          </div>
        )}

        <div className="main-bottom absolute bottom-0 w-full max-w-5xl px-5 py-0 m-auto">
          <div className="search-box flex items-center justify-between gap-5 bg-primary-100 py-3 px-5 rounded-full">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="flex-1 bg-transparent border-0 outline-none p-2 text-lg"
              type="text"
              placeholder="Enter your prompt here"
            />
            <div className="flex justify-between items-center cursor-pointer gap-3">
              {/* <GrGallery size={25} />
              <HiMiniMicrophone size={25} /> */}
              <span className="pl-2 pr-3 py-2 hover:bg-slate-300 rounded-full transition-all duration-300">
                <GrSend onClick={() => onSent()} size={25} />
              </span>
            </div>
          </div>
          <p className="bottom-info text-xs my-2 mx-auto text-center font-light text-slate-400">
            Stellar is using Gemini generative AI. So double check its
            responses.🥲
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
