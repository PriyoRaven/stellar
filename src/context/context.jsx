import { useState, createContext, useEffect } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [history, setHistory] = useState([]);
  const [processedText, setProcessedText] = useState("");

  const delayParam = (text, setProcessedText) => {
    // Split the text into segments, preserving asterisks
    const segments = text.split(/(\*\*.*?\*\*|\s+)/);
    let currentIndex = 0;

    const processSegment = () => {
      if (currentIndex < segments.length) {
        const segment = segments[currentIndex];

        if (segment.startsWith("**") && segment.endsWith("**")) {
          // Bold text
          setProcessedText((prev) => prev + `<b>${segment.slice(2, -2)}</b>`);
          setTimeout(processSegment, 20);
        } else if (segment.startsWith("*")) {
          // Italic text and a new paragraph
          setProcessedText(
            (prev) => prev + `</br></br><p>>${segment.slice(1)}`
          );
          setTimeout(processSegment, 50);
        } else {
          // Normal text
          setProcessedText((prev) => prev + segment);
          setTimeout(processSegment, 0);
        }

        currentIndex++;
      }
    };

    setProcessedText("<p>"); // Start with an opening paragraph tag
    processSegment();
  };

  useEffect(() => {
    if (resultData) {
      setProcessedText("");
      delayParam(resultData, setProcessedText);
    }
  }, [resultData]);

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

      setResultData(response);
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
    resultData,
    input,
    setInput,
    history,
    processedText,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
