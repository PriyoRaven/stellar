import React, { useContext, useRef, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Card from "../UI/Card";
import { GrSend } from "react-icons/gr";
import { IoBulbOutline, IoCodeSlash, IoCompassOutline } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";
import ChatMessage from "./ChatMessage";
import { Context } from "../../context/context";
import SmartSuggestions from "../UI/SmartSuggestions";
import FileUpload from "../UI/FileUpload";
import WebSearchToggle from "../UI/WebSearchToggle";
import TypingIndicator from "../UI/TypingIndicator";

const Main = () => {
  const {
    onSent,
    loading,
    input,
    setInput,
    conversations,
    currentConversationId,
    suggestions,
    loadingSuggestions,
    personas,
    currentPersona,
    searchSources,
  } = useContext(Context);
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const prevHistoryLengthRef = useRef(0);

  const currentConversation = conversations.find(
    (talk) => talk.id === currentConversationId
  ) || { history: [], responses: [] };

  const currentPersonaData = personas[currentPersona];

  // Only auto-scroll when a new message is added (user sends message)
  useEffect(() => {
    const currentLength = currentConversation.history.length;
    // Scroll only when history length increases (new message added) and user hasn't manually scrolled up
    if (currentLength > prevHistoryLengthRef.current && shouldAutoScroll) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevHistoryLengthRef.current = currentLength;
  }, [currentConversation.history.length, shouldAutoScroll]);

  // Detect if user manually scrolls up
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      // If user is near the bottom (within 100px), enable auto-scroll
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShouldAutoScroll(isNearBottom);
    }
  };

  // Reset auto-scroll when switching conversations
  useEffect(() => {
    setShouldAutoScroll(true);
    prevHistoryLengthRef.current = 0;
  }, [currentConversationId]);

  const handleSuggestionClick = (suggestion) => {
    setShouldAutoScroll(true); // Re-enable auto-scroll when user sends via suggestion
    onSent(suggestion);
  };

  const handleSend = () => {
    if (input.trim()) {
      setShouldAutoScroll(true); // Re-enable auto-scroll when user sends
      onSent();
    }
  };

  const handleCardClick = (text) => {
    setInput(text);
  };

  return (
    <div className="this-main flex-1 min-h-screen pb-28 relative bg-background text-text">
      <div className="this-nav flex justify-between items-center text-xl p-5 font-bold text-amber-600">
        <div className="flex items-center gap-3">
          <p>Stellar</p>
          {currentPersonaData && (
            <span className="text-sm font-normal bg-primary-100 px-3 py-1 rounded-full flex items-center gap-2">
              <span>{currentPersonaData.icon}</span>
              <span className="text-text">{currentPersonaData.name}</span>
            </span>
          )}
        </div>
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
              {currentPersonaData && currentPersona !== "default" && (
                <p className="text-lg font-normal mt-4 text-primary-300">
                  {currentPersonaData.icon} Currently chatting with: <strong>{currentPersonaData.name}</strong>
                </p>
              )}
            </div>
            <div className="cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
              <div onClick={() => handleCardClick("Suggest me some beautiful place to see in India")}>
                <Card
                  text="Suggest me some beautiful place to see in India"
                  icon={IoCompassOutline}
                  className={"text-sky-500"}
                />
              </div>
              <div onClick={() => handleCardClick("Write an Essay on the importance of learning React")}>
                <Card
                  text="Write an Essay on the importance of learning React"
                  icon={IoBulbOutline}
                  className={"text-yellow-500"}
                />
              </div>
              <div onClick={() => handleCardClick("Hey Stellar, how are you doing today?")}>
                <Card
                  text="Hey Stellar, how are you doing today?"
                  icon={FiMessageCircle}
                  className={"text-green-500"}
                />
              </div>
              <div onClick={() => handleCardClick("Improve the readability of my code")}>
                <Card
                  text="Improve the readability of my code"
                  icon={IoCodeSlash}
                />
              </div>
            </div>
          </>
        ) : (
          <div
            ref={chatContainerRef}
            onScroll={handleScroll}
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
                sources={message.sources}
              />
            ))}
            {loading && (
              <div className="flex items-start gap-3 my-4">
                <div className="w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center text-xl flex-shrink-0">
                  {currentPersonaData?.icon || "✨"}
                </div>
                <div className="bg-primary-200 rounded-3xl">
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}

        {/* Smart Suggestions */}
        {!loading && currentConversation.history.length > 0 && (
          <SmartSuggestions
            suggestions={suggestions}
            onSelect={handleSuggestionClick}
            loading={loadingSuggestions}
          />
        )}

        <div className="main-bottom absolute bottom-0 w-full max-w-5xl px-5 py-0 m-auto">
          <div className="search-box flex items-center gap-3 bg-primary-100 py-3 px-5 rounded-full">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="flex-1 bg-transparent border-0 outline-none p-2 text-lg"
              type="text"
              placeholder={`Ask ${currentPersonaData?.name || "Stellar"} anything...`}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <div className="flex items-center gap-2">
              <FileUpload />
              <WebSearchToggle />
              <span
                className={`p-2 hover:bg-amber-300 hover:scale-110 rounded-full transition-all duration-300 ${!input.trim() && "opacity-50 cursor-not-allowed"
                  }`}
              >
                <GrSend
                  onClick={handleSend}
                  size={22}
                />
              </span>
            </div>
          </div>
          <p className="bottom-info text-xs my-2 mx-auto text-center font-light text-slate-400">
            Stellar is using Gemini AI. Double check its responses. 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
