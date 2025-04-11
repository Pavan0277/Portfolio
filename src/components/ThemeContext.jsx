import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "dark"
    );
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    const toggleTheme = () => {
        setIsAnimating(true);
        
        setTimeout(() => {
            setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
            
            setTimeout(() => setIsAnimating(false), 1200);
        }, 200);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isAnimating }}>
            {children}
            {/* Theme animation overlay */}
            {isAnimating && <ParticleExplosionAnimation theme={theme} />}
        </ThemeContext.Provider>
    );
};

const ParticleExplosionAnimation = ({ theme }) => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 10 + 5,
        x: Math.random() * 60 - 30,
        y: Math.random() * 60 - 30,
        delay: Math.random() * 0.3
    }));

    const nextTheme = theme === "dark" ? "light" : "dark";
    const particleColors = {
        dark: ["bg-indigo-500", "bg-blue-600", "bg-purple-500", "bg-slate-700"],
        light: ["bg-yellow-300", "bg-amber-400", "bg-orange-300", "bg-sky-300"]
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
            <div className={`w-full h-full absolute transition-colors duration-1000 ${nextTheme === "dark" ? "bg-gray-900 bg-opacity-0" : "bg-white bg-opacity-0"} animate-fade-in`}></div>
            
            <div className="relative">
                {/* Core circle that expands */}
                <div className={`w-16 h-16 rounded-full ${nextTheme === "dark" ? "bg-slate-800" : "bg-yellow-300"} 
                    animate-ping opacity-70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                </div>
                
                {/* Particles exploding outward */}
                {particles.map((particle) => (
                    <div 
                        key={particle.id}
                        className={`absolute rounded-full 
                            ${particleColors[nextTheme][particle.id % particleColors[nextTheme].length]}
                            animate-particle opacity-80`}
                        style={{
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            top: "calc(50% - 5px)",
                            left: "calc(50% - 5px)",
                            animationDelay: `${particle.delay}s`,
                            transform: `translate(${particle.x}px, ${particle.y}px) scale(0)`,
                            animation: "particle 1s cubic-bezier(0.155, 0.405, 0.285, 0.925) forwards"
                        }}
                    ></div>
                ))}
                
                {/* Ripple effect */}
                <div className={`w-16 h-16 rounded-full border-4 ${nextTheme === "dark" ? "border-slate-700" : "border-yellow-400"} 
                    absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ripple`}>
                </div>
                <div className={`w-16 h-16 rounded-full border-4 ${nextTheme === "dark" ? "border-slate-600" : "border-amber-300"} 
                    absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ripple animation-delay-200`}>
                </div>
            </div>
        </div>
    );
};

export const useTheme = () => useContext(ThemeContext);