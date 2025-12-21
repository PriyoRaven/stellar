import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/themeContext";
import ContextProvider from "./context/context";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import Roadmap from "./components/Roadmap/Roadmap";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ThemeProvider>
                <ContextProvider>
                    <div className="flex relative h-screen overflow-hidden">
                        {/* Mobile/Tablet overlay - closes sidebar when tapped */}
                        {sidebarOpen && (
                            <div
                                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                                onClick={closeSidebar}
                            />
                        )}

                        {/* Sidebar - fixed height, no scroll */}
                        <div className={`
                            fixed lg:sticky lg:top-0 z-50 lg:z-auto h-screen
                            transition-transform duration-300 ease-in-out
                            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                        `}>
                            <Sidebar />
                        </div>

                        {/* Main content - scrollable */}
                        <div className="flex-1 min-w-0 w-full h-screen overflow-y-auto">
                            <Routes>
                                <Route path="/" element={<Main onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/roadmap" element={<Roadmap />} />
                            </Routes>
                        </div>
                    </div>
                </ContextProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App;
