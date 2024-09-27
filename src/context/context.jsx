import { useState, createContext, useEffect } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [responses, setResponses] = useState([]);

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
      const updatedHistory = [...history, userMessage];
      setHistory(updatedHistory);

      const response = await run(input, updatedHistory);

      const assistantMessage = { role: "model", parts: [{ text: response }] };
      setHistory((prevHistory) => [...prevHistory, assistantMessage]);

      // Add a new response object to the responses array
      setResponses((prevResponses) => [
        ...prevResponses,
        { text: "", isComplete: false },
      ]);

      // Start the animation for the new response
      delayParam(response, (processedText, isComplete = false) => {
        setResponses((prevResponses) => {
          const newResponses = [...prevResponses];
          newResponses[newResponses.length - 1] = {
            text: processedText,
            isComplete,
          };
          return newResponses;
        });
      });
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    input,
    setInput,
    history,
    responses,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
