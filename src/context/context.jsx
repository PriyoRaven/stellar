import { useState, createContext, useEffect } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([
    { id: 1, history: [], responses: [] },
  ]);
  const [currentConversationId, setCurrentConversationId] = useState(1);

  const delayParam = (text, callback) => {
    const segments = text.split(/(\*\*.*?\*\*|\s+)/);
    let currentIndex = 0;
    let processedText = "<p>";

    const processSegment = () => {
      if (currentIndex < segments.length) {
        const segment = segments[currentIndex];

        if (segment.startsWith("**") && segment.endsWith("**")) {
          processedText += `<b>${segment.slice(2, -2)}</b>`;
          setTimeout(() => {
            callback(processedText);
            processSegment();
          }, 20);
        } else if (segment.startsWith("*")) {
          processedText += `</br></br><p>>${segment.slice(1)}`;
          setTimeout(() => {
            callback(processedText);
            processSegment();
          }, 50);
        } else {
          processedText += segment;
          setTimeout(() => {
            callback(processedText);
            processSegment();
          }, 10);
        }

        currentIndex++;
      } else {
        callback(processedText + "</p>", true);
      }
    };

    processSegment();
  };

  const onSent = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);
      setInput("");
      setShowResult(true);
      setRecentPrompt(input);

      const userMessage = { role: "user", parts: [{ text: input }] };

      setConversations((prevConversations) => {
        const updatedConversations = prevConversations.map((conv) => {
          if (conv.id === currentConversationId) {
            return {
              ...conv,
              history: [...conv.history, userMessage],
            };
          }
          return conv;
        });
        return updatedConversations;
      });

      const currentConversation = conversations.find(
        (conv) => conv.id === currentConversationId
      );
      const response = await run(input, [
        ...currentConversation.history,
        userMessage,
      ]);

      const assistantMessage = { role: "model", parts: [{ text: response }] };

      setConversations((prevConversations) => {
        const updatedConversations = prevConversations.map((conv) => {
          if (conv.id === currentConversationId) {
            return {
              ...conv,
              history: [...conv.history, assistantMessage],
              responses: [...conv.responses, { text: "", isComplete: false }],
            };
          }
          return conv;
        });
        return updatedConversations;
      });

      delayParam(response, (processedText, isComplete = false) => {
        setConversations((prevConversations) => {
          const updatedConversations = prevConversations.map((conv) => {
            if (conv.id === currentConversationId) {
              const newResponses = [...conv.responses];
              newResponses[newResponses.length - 1] = {
                text: processedText,
                isComplete,
              };
              return { ...conv, responses: newResponses };
            }
            return conv;
          });
          return updatedConversations;
        });
      });
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    const newId = conversations.length + 1;
    setConversations([
      ...conversations,
      { id: newId, history: [], responses: [] },
    ]);
    setCurrentConversationId(newId);
    setInput("");
    setShowResult(false);
  };

  const switchConversation = (id) => {
    setCurrentConversationId(id);
    setShowResult(true);
  };

  const contextValue = {
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    input,
    setInput,
    conversations,
    currentConversationId,
    startNewChat,
    switchConversation,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
