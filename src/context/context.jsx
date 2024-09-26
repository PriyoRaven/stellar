import { useState, createContext } from "react";
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

  const onSent = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);
      setShowResult(true);
      setRecentPrompt(input);

      const userMessage = { role: "user", parts: [{ text: input }] };
      const updatedHistory = [...history, userMessage];

      const response = await run(input, updatedHistory);

      const assistantMessage = { role: "model", parts: [{ text: response }] };
      setHistory([...updatedHistory, assistantMessage]);

      setResultData(response);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setInput("");
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
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
