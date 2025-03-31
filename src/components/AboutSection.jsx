import React from "react";
import { useTheme } from "./ThemeContext";

function AboutSection() {
    const { theme } = useTheme();
    return (
        <div
            id="about"
            className="relative min-h-screen flex items-center justify-center"
        >
            AboutSection
        </div>
    )
    
}

export default AboutSection;
