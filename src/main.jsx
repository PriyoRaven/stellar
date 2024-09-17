import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="min-h-screen m-0 p-0 flex box-border">
      <App />
    </div>
  </StrictMode>
);
