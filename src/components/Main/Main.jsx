import React, { useContext, useRef, useEffect } from "react";
import { assets } from "../../assets/assets";
import Card from "../Card";
import { GrSend } from "react-icons/gr";
import { IoBulbOutline, IoCodeSlash, IoCompassOutline } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";
import ChatMessage from "./ChatMessage";
import { Context } from "../../context/context";

const Main = () => {
  const {
    onSent,
    loading,
    input,
    setInput,
    conversations,
    currentConversationId,
  } = useContext(Context);
  const chatEndRef = useRef(null);

  const currentConversation = conversations.find(
    (conv) => conv.id === currentConversationId
  ) || { history: [], responses: [] };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentConversation.history, currentConversation.responses]);

  return (
    <div className="this-main flex-1 min-h-screen pb-28 relative bg-background text-text">
      <div className="this-nav flex justify-between items-center text-xl p-5 font-bold text-amber-600">
        <p>Stellar</p>
        <img className="w-10 rounded-full" src={assets.user_icon} alt="" />
      </div>
      <div className="main-container max-w-5xl m-auto">
        {currentConversation.history.length === 0 ? (
          <>
            <div className="greet my-12 mx-0 text-6xl font-semibold p-5 text-primary-300">
              <p>
                <span className="bg-gradient-to-r from-amber-500 via-yellow-400 to-lime-500 bg-clip-text text-transparent">
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
            className="result py-0 overflow-y-scroll the-scrollbar"
            style={{ paddingLeft: "5%", paddingRight: "5%", maxHeight: "70vh" }}
          >
            {currentConversation.history.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
                processedResponse={
                  currentConversation.responses[Math.floor(index / 2)]?.text ||
                  ""
                }
              />
            ))}
            {loading && (
              <div className="loader w-full flex flex-col gap-2">
                <hr className="animated-bg" />
                <hr className="animated-bg" />
                <hr className="animated-bg" />
              </div>
            )}
            <div ref={chatEndRef} />
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
              <span className="pl-2 pr-3 py-2 hover:bg-amber-300 hover:scale-110 rounded-full transition-all duration-300">
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
