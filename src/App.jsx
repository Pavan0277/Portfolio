import React, { useEffect } from "react";
import HomeSection from "./components/HomeSection";
import Navbar from "./components/Navbar";
import { ThemeProvider, useTheme } from "./components/ThemeContext";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";

function AppContent() {
    const { theme, isAnimating } = useTheme();

    useEffect(() => {
        document.body.className = theme === "dark" ? "grid-pattern-dark" : "grid-pattern-light";
        
        document.body.classList.add("transition-colors", "duration-500");
    }, [theme]);

    return (
        <div className={`app-container transition-colors duration-500 ${isAnimating ? 'overflow-hidden' : ''}`}>
            <Navbar />
            <div className="main-content">
                <HomeSection />
                <AboutSection />
                <SkillsSection />
                <ExperienceSection />
                <ProjectsSection />
                <ContactSection />
            </div>
            
            {isAnimating && (
                <div className="fixed inset-0 z-40 bg-white dark:bg-gray-900 bg-opacity-30 dark:bg-opacity-30 backdrop-blur-sm transition-all duration-300" />
            )}
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