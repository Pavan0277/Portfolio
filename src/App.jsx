import React, { useEffect } from "react";
import HomeSection from "./components/HomeSection";
import Navbar from "./components/Navbar";
import { ThemeProvider, useTheme } from "./components/ThemeContext";
import AboutSection from "./components/AboutSection";

function AppContent() {
    const { theme } = useTheme();

    useEffect(() => {
        document.body.className =
            theme === "dark" ? "grid-pattern-dark" : "grid-pattern-light";
    }, [theme]);

    return (
        <div className="app-container">
            <Navbar />
            <div className="main-content">
                <HomeSection />
                <AboutSection />
                <div style={{ height: "100vh" }}></div>
            </div>
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

export default App;
