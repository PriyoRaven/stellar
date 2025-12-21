import { useState, createContext, useEffect, useCallback } from "react";
import run, { generateSuggestions, runWithGrounding, AI_PERSONAS, AVAILABLE_MODELS, DEFAULT_MODEL } from "../config/gemini";
import { v4 as uuidv4 } from "uuid";

export const Context = createContext();

// LocalStorage keys
const STORAGE_KEYS = {
  CONVERSATIONS: "stellar_conversations",
  CURRENT_ID: "stellar_current_conversation_id",
  PERSONA: "stellar_persona",
  MODEL: "stellar_model",
  SUGGESTIONS_ENABLED: "stellar_suggestions_enabled",
};

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [currentPersona, setCurrentPersona] = useState("default");
  const [attachments, setAttachments] = useState([]);
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [searchSources, setSearchSources] = useState([]);
  const [error, setError] = useState(null);
  const [suggestionsEnabled, setSuggestionsEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SUGGESTIONS_ENABLED);
      return saved === "true"; // Default to false to save tokens
    } catch (e) {
      return false;
    }
  });
  const [currentModel, setCurrentModel] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MODEL);
      return saved && AVAILABLE_MODELS[saved] ? saved : DEFAULT_MODEL;
    } catch (e) {
      return DEFAULT_MODEL;
    }
  });

  // Initialize conversations from localStorage or default
  const [conversations, setConversations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.length > 0 ? parsed : [{ id: uuidv4(), title: "New Chat", history: [], responses: [] }];
      }
    } catch (e) {
      console.error("Error loading conversations:", e);
    }
    return [{ id: uuidv4(), title: "New Chat", history: [], responses: [] }];
  });

  const [currentConversationId, setCurrentConversationId] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_ID);
      if (saved && conversations.some(c => c.id === saved)) {
        return saved;
      }
    } catch (e) {
      console.error("Error loading current conversation:", e);
    }
    return conversations[0]?.id;
  });

  // Load persona from localStorage
  useEffect(() => {
    try {
      const savedPersona = localStorage.getItem(STORAGE_KEYS.PERSONA);
      if (savedPersona && AI_PERSONAS[savedPersona]) {
        setCurrentPersona(savedPersona);
      }
    } catch (e) {
      console.error("Error loading persona:", e);
    }
  }, []);

  // Save conversations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
    } catch (e) {
      console.error("Error saving conversations:", e);
    }
  }, [conversations]);

  // Save current conversation ID
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_ID, currentConversationId);
    } catch (e) {
      console.error("Error saving current ID:", e);
    }
  }, [currentConversationId]);

  // Save persona preference
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PERSONA, currentPersona);
    } catch (e) {
      console.error("Error saving persona:", e);
    }
  }, [currentPersona]);

  // Save model preference
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MODEL, currentModel);
    } catch (e) {
      console.error("Error saving model:", e);
    }
  }, [currentModel]);

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

  // Generate smart suggestions after AI response
  const fetchSuggestions = useCallback(async (conversationHistory) => {
    setLoadingSuggestions(true);
    try {
      // Build context from last few messages
      const recentMessages = conversationHistory.slice(-6);
      const context = recentMessages
        .map(msg => `${msg.role === "user" ? "User" : "AI"}: ${msg.parts[0].text}`)
        .join("\n");

      const newSuggestions = await generateSuggestions(context, currentPersona);
      setSuggestions(newSuggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoadingSuggestions(false);
    }
  }, [currentPersona]);

  const onSent = async (customPrompt = null) => {
    const promptText = customPrompt || input;
    if (!promptText.trim() && attachments.length === 0) return;

    try {
      setLoading(true);
      setSuggestions([]);
      setSearchSources([]);
      setInput("");
      setShowResult(true);
      setRecentPrompt(promptText);

      // Build user message with attachments
      const userParts = [{ text: promptText }];
      for (const att of attachments) {
        userParts.push({
          inlineData: {
            mimeType: att.mimeType,
            data: att.data,
          }
        });
      }

      const userMessage = {
        role: "user",
        parts: userParts,
        attachmentPreviews: attachments.map(a => ({ name: a.name, type: a.type }))
      };

      // Clear attachments after adding to message
      setAttachments([]);

      setConversations((prevConversations) => {
        const updatedConversations = prevConversations.map((talk) => {
          if (talk.id === currentConversationId) {
            // Auto-set title from first message
            const newTitle = talk.history.length === 0
              ? promptText.slice(0, 30) + (promptText.length > 30 ? "..." : "")
              : talk.title;
            return {
              ...talk,
              title: newTitle,
              history: [...talk.history, userMessage],
            };
          }
          return talk;
        });
        return updatedConversations;
      });

      const currentConversation = conversations.find(
        (talk) => talk.id === currentConversationId
      );

      let response;
      let sources = [];

      if (webSearchEnabled) {
        // Use grounded search
        const groundedResult = await runWithGrounding(
          promptText,
          [...currentConversation.history, userMessage],
          currentPersona,
          currentModel
        );
        response = groundedResult.text;
        sources = groundedResult.sources;
        setSearchSources(sources);
      } else {
        // Regular chat
        response = await run(
          promptText,
          [...currentConversation.history, userMessage],
          currentPersona,
          attachments,
          currentModel
        );
      }

      const assistantMessage = {
        role: "model",
        parts: [{ text: response }],
        sources: sources,
        modelId: currentModel,
        usedWebSearch: webSearchEnabled
      };

      // Only fetch suggestions if enabled (saves API calls)
      if (suggestionsEnabled) {
        fetchSuggestions([...currentConversation.history, userMessage, assistantMessage]);
      }

      setConversations((prevConversations) => {
        const updatedConversations = prevConversations.map((talk) => {
          if (talk.id === currentConversationId) {
            return {
              ...talk,
              history: [...talk.history, assistantMessage],
              responses: [...talk.responses, { text: "", isComplete: false }],
            };
          }
          return talk;
        });
        return updatedConversations;
      });

      delayParam(response, (processedText, isComplete = false) => {
        setConversations((prevConversations) => {
          const updatedConversations = prevConversations.map((talk) => {
            if (talk.id === currentConversationId) {
              const newResponses = [...talk.responses];
              newResponses[newResponses.length - 1] = {
                text: processedText,
                isComplete,
              };
              return { ...talk, responses: newResponses };
            }
            return talk;
          });
          return updatedConversations;
        });
      });
    } catch (error) {
      console.error("Error: ", error);
      setSuggestions([]);

      // Parse error for user-friendly display
      const errorMessage = error.message || "An error occurred";
      const parsedError = { message: errorMessage, type: "error" };

      // Check for quota/rate limit errors
      if (errorMessage.includes("429") || errorMessage.includes("quota") || errorMessage.includes("rate")) {
        parsedError.type = errorMessage.includes("quota") ? "quota" : "rate_limit";
        parsedError.message = "API quota exceeded. Please wait a moment before trying again.";

        // Try to extract retry time
        const retryMatch = errorMessage.match(/retry in ([\d.]+)s/i);
        if (retryMatch) {
          parsedError.retryAfter = parseFloat(retryMatch[1]);
        }
      } else if (errorMessage.includes("404")) {
        parsedError.message = "Model not found. Try selecting a different model.";
      } else if (errorMessage.includes("401") || errorMessage.includes("403")) {
        parsedError.message = "API key issue. Please check your configuration.";
      }

      setError(parsedError);

      // Auto-clear error after some time
      setTimeout(() => setError(null), 15000);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    const newId = uuidv4();
    setConversations([
      ...conversations,
      { id: newId, title: "New Chat", history: [], responses: [] },
    ]);
    setCurrentConversationId(newId);
    setInput("");
    setShowResult(false);
    setSuggestions([]);
    setAttachments([]);
    setSearchSources([]);
  };

  const switchConversation = (id) => {
    setCurrentConversationId(id);
    setShowResult(true);
    setSuggestions([]);
    setAttachments([]);
    setSearchSources([]);
  };

  const deleteConversation = (id) => {
    // If this is the last conversation, create a new one first
    if (conversations.length === 1) {
      const newId = uuidv4();
      setConversations([{ id: newId, title: "New Chat", history: [], responses: [] }]);
      setCurrentConversationId(newId);
      setShowResult(false);
      setSuggestions([]);
      setAttachments([]);
      setSearchSources([]);
      return;
    }

    // Otherwise, delete normally
    setConversations((prevConversations) =>
      prevConversations.filter((conversation) => conversation.id !== id)
    );
    if (currentConversationId === id) {
      const nextConversation = conversations.find((talk) => talk.id !== id);
      if (nextConversation) {
        setCurrentConversationId(nextConversation.id);
      }
    }
  };

  const renameConversation = (id, newTitle) => {
    setConversations((prevConversations) =>
      prevConversations.map((talk) =>
        talk.id === id ? { ...talk, title: newTitle } : talk
      )
    );
  };

  const addAttachment = (attachment) => {
    setAttachments((prev) => [...prev, attachment]);
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAllConversations = () => {
    const newId = uuidv4();
    setConversations([{ id: newId, title: "New Chat", history: [], responses: [] }]);
    setCurrentConversationId(newId);
    setShowResult(false);
    setSuggestions([]);
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
    deleteConversation,
    renameConversation,
    // Smart suggestions
    suggestions,
    loadingSuggestions,
    setSuggestions,
    suggestionsEnabled,
    setSuggestionsEnabled: (enabled) => {
      setSuggestionsEnabled(enabled);
      try {
        localStorage.setItem(STORAGE_KEYS.SUGGESTIONS_ENABLED, enabled.toString());
      } catch (e) {
        console.error("Error saving suggestions preference:", e);
      }
    },
    // AI Personas
    currentPersona,
    setCurrentPersona,
    personas: AI_PERSONAS,
    // Model selection
    currentModel,
    setCurrentModel,
    availableModels: AVAILABLE_MODELS,
    // Attachments (images/PDFs)
    attachments,
    addAttachment,
    removeAttachment,
    // Web search
    webSearchEnabled,
    setWebSearchEnabled,
    searchSources,
    // Error handling
    error,
    clearError: () => setError(null),
    // Utility
    clearAllConversations,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
