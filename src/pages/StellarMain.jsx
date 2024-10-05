import React from "react";
import { ThemeProvider } from "../context/themeContext";
import Sidebar from "../components/Sidebar/Sidebar";
import Main from "../components/Main/Main";

function StellarMain() {
  return (
    <ThemeProvider>
      <div className="flex">
        <Sidebar />
        <Main />
      </div>
    </ThemeProvider>
  );
}

export default StellarMain;
