import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/themeContext";
import ContextProvider from "./context/context";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import About from "./components/About/About";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <ContextProvider>
          <div className="flex">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </ContextProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
