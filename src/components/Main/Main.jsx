import React, { useContext, useRef, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
import WelcomeSection from "./WelcomeSection";
import ChatArea from "./ChatArea";
import InputArea from "./InputArea";
import SmartSuggestions from "../UI/SmartSuggestions";
import ErrorBanner from "../UI/ErrorBanner";
import { IoMenu, IoClose } from "react-icons/io5";

const Main = ({ onMenuClick, sidebarOpen }) => {
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
    error,
    clearError,
  } = useContext(Context);

  const chatContainerRef = useRef(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const prevHistoryLengthRef = useRef(0);

  const currentConversation = conversations.find(
    (talk) => talk.id === currentConversationId
  ) || { history: [], responses: [] };

  const currentPersonaData = personas[currentPersona];

  // Only auto-scroll when a new message is added
  useEffect(() => {
    const currentLength = currentConversation.history.length;
    if (currentLength > prevHistoryLengthRef.current && shouldAutoScroll) {
      const chatEnd = chatContainerRef.current?.querySelector('[data-chat-end]');
      chatEnd?.scrollIntoView({ behavior: "smooth" });
    }
    prevHistoryLengthRef.current = currentLength;
  }, [currentConversation.history.length, shouldAutoScroll]);

  // Detect if user manually scrolls up
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
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
    setShouldAutoScroll(true);
    onSent(suggestion);
  };

  const handleSend = () => {
    if (input.trim()) {
      setShouldAutoScroll(true);
      onSent();
    }
  };

  const handleCardClick = (text) => {
    setInput(text);
  };

  return (
    <div className="this-main flex-1 min-h-screen pb-24 sm:pb-28 relative bg-background text-text">
      {/* Header */}
      <div className="this-nav flex justify-between items-center text-lg sm:text-xl p-3 sm:p-5 font-bold text-amber-600">
        <div className="flex items-center gap-2">
          {/* Mobile/Tablet hamburger menu */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl hover:bg-primary-200 transition-colors"
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          >
            {sidebarOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6">✨
            <span className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 bg-clip-text text-transparent">
              Stellar
            </span>
          </h1>
        </div>
        <img src={assets.user_icon} alt="" className="w-8 sm:w-10 rounded-full" />
      </div>

      {/* Error banner */}
      <ErrorBanner error={error} onDismiss={clearError} />

      {/* Main content */}
      <div className="main-container max-w-5xl mx-auto px-2 sm:px-4">
        {currentConversation.history.length === 0 ? (
          <WelcomeSection
            currentPersonaData={currentPersonaData}
            currentPersona={currentPersona}
            onCardClick={handleCardClick}
          />
        ) : (
          <ChatArea
            conversation={currentConversation}
            loading={loading}
            searchSources={searchSources}
            chatContainerRef={chatContainerRef}
            onScroll={handleScroll}
          />
        )}

        {/* Smart suggestions */}
        {!loading && currentConversation.history.length > 0 && (
          <SmartSuggestions
            suggestions={suggestions}
            onSelect={handleSuggestionClick}
            loading={loadingSuggestions}
          />
        )}

        {/* Input area */}
        <InputArea
          input={input}
          setInput={setInput}
          onSend={handleSend}
          placeholderName={currentPersonaData?.name}
        />
      </div>
    </div>
  );
};

export default Main;
