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
            
            setTimeout(() => setIsAnimating(false), 1500);
        }, 200);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isAnimating }}>
            {children}
            {/* Enhanced theme animation overlay */}
            {isAnimating && <EnhancedThemeAnimation theme={theme} />}
        </ThemeContext.Provider>
    );
};

const EnhancedThemeAnimation = ({ theme }) => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    
    // Generate particles with different shapes and behaviors
    const generateElements = (count, type) => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            size: Math.random() * 10 + 5,
            x: (Math.random() * 100 - 50) * (Math.random() > 0.5 ? 1 : -1),
            y: (Math.random() * 100 - 50) * (Math.random() > 0.5 ? 1 : -1),
            delay: Math.random() * 0.5,
            duration: 0.8 + Math.random() * 0.7,
            rotation: Math.random() * 360,
            type: type || (Math.random() > 0.6 ? "circle" : Math.random() > 0.5 ? "square" : "triangle")
        }));
    };

    // Create different types of particles
    const particles = [
        ...generateElements(15, "circle"),
        ...generateElements(12, "square"),
        ...generateElements(10, "triangle"),
        ...generateElements(8, "star")
    ];

    // Theme-specific color palettes
    const colorPalettes = {
        dark: ["bg-indigo-500", "bg-blue-600", "bg-purple-500", "bg-violet-600", "bg-blue-400"],
        light: ["bg-yellow-300", "bg-amber-400", "bg-orange-300", "bg-sky-300", "bg-pink-300"]
    };

    // Shape components
    const renderShape = (particle, color) => {
        switch(particle.type) {
            case "square":
                return (
                    <div 
                        className={`absolute ${color} rounded-sm`}
                        style={{
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                        }}
                    />
                );
            case "triangle":
                return (
                    <div 
                        className="absolute w-0 h-0 border-solid"
                        style={{
                            borderWidth: `0 ${particle.size/2}px ${particle.size}px ${particle.size/2}px`,
                            borderColor: `transparent transparent ${getComputedBorderColor(color)} transparent`
                        }}
                    />
                );
            case "star":
                return (
                    <div className={`absolute ${color}`} style={{ width: `${particle.size}px`, height: `${particle.size}px` }}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0L15.09 7.26L23 8.27L17.5 13.8L18.9 21.71L12 18.09L5.1 21.71L6.5 13.8L1 8.27L8.91 7.26L12 0Z" />
                        </svg>
                    </div>
                );
            case "circle":
            default:
                return (
                    <div 
                        className={`absolute ${color} rounded-full`}
                        style={{
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                        }}
                    />
                );
        }
    };

    // Helper function to extract color from Tailwind class for triangle borders
    const getComputedBorderColor = (className) => {
        if (className.includes("indigo")) return "#6366f1";
        if (className.includes("blue-600")) return "#2563eb";
        if (className.includes("blue-400")) return "#60a5fa";
        if (className.includes("purple")) return "#a855f7";
        if (className.includes("violet")) return "#8b5cf6";
        if (className.includes("yellow")) return "#fde047";
        if (className.includes("amber")) return "#fbbf24";
        if (className.includes("orange")) return "#fdba74";
        if (className.includes("sky")) return "#7dd3fc";
        if (className.includes("pink")) return "#f9a8d4";
        return "#ffffff";
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
            {/* Background transition layer */}
            <div 
                className={`w-full h-full absolute transition-colors duration-1000 
                    ${nextTheme === "dark" ? "bg-gray-900" : "bg-white"} bg-opacity-0 animate-fade-in`}
            />
            
            {/* Central pulsing orb */}
            <div className="relative">
                {/* Core expanding orb with glow effect */}
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    w-20 h-20 rounded-full animate-pulse-grow
                    ${nextTheme === "dark" 
                        ? "bg-slate-800 shadow-lg shadow-indigo-500/50" 
                        : "bg-amber-300 shadow-lg shadow-amber-500/50"}`}>
                    <div className="absolute inset-0 rounded-full bg-opacity-50 animate-pulse"></div>
                </div>
                
                {/* Inner spinning ring */}
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    w-28 h-28 rounded-full border-4 border-dashed animate-spin-slow
                    ${nextTheme === "dark" ? "border-indigo-500/70" : "border-amber-400/70"}`}>
                </div>
                
                {/* Outer expanding rings */}
                <div className={`w-24 h-24 rounded-full border-4
                    ${nextTheme === "dark" ? "border-slate-700" : "border-yellow-400"} 
                    absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ripple`}>
                </div>
                <div className={`w-24 h-24 rounded-full border-4 
                    ${nextTheme === "dark" ? "border-indigo-600" : "border-orange-300"} 
                    absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ripple-delayed`}>
                </div>
                <div className={`w-24 h-24 rounded-full border-4 
                    ${nextTheme === "dark" ? "border-purple-500" : "border-amber-300"} 
                    absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ripple-delayed-more`}>
                </div>
                
                {/* Particles exploding outward */}
                {particles.map((particle) => {
                    const color = colorPalettes[nextTheme][particle.id % colorPalettes[nextTheme].length];
                    return (
                        <div 
                            key={particle.id}
                            className="absolute opacity-80"
                            style={{
                                top: "50%",
                                left: "50%",
                                transform: `translateX(-50%) translateY(-50%) scale(0) rotate(0deg)`,
                                animation: `
                                    particle-fly-out ${particle.duration}s cubic-bezier(0.155, 0.405, 0.285, 0.925) ${particle.delay}s forwards,
                                    particle-fade-out ${particle.duration}s ease-out ${particle.delay}s forwards,
                                    particle-rotate ${particle.duration}s linear ${particle.delay}s forwards
                                `
                            }}
                            data-x={particle.x} 
                            data-y={particle.y}
                            data-rotation={particle.rotation}
                        >
                            {renderShape(particle, color)}
                        </div>
                    );
                })}
            </div>
            
            {/* Add this style block for custom animations */}
            <style jsx>{`
                @keyframes particle-fly-out {
                    0% { transform: translateX(-50%) translateY(-50%) scale(0) rotate(0deg); }
                    10% { transform: translateX(-50%) translateY(-50%) scale(1) rotate(36deg); }
                    100% { 
                        transform: 
                            translateX(calc(-50% + var(--tw-translate-x) + ${(props) => props["data-x"]}px))
                            translateY(calc(-50% + var(--tw-translate-y) + ${(props) => props["data-y"]}px))
                            scale(0.8)
                            rotate(${(props) => props["data-rotation"]}deg);
                    }
                }
                
                @keyframes particle-fade-out {
                    0% { opacity: 0; }
                    10% { opacity: 0.9; }
                    80% { opacity: 0.8; }
                    100% { opacity: 0; }
                }
                
                @keyframes particle-rotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(${(props) => props["data-rotation"]}deg); }
                }
                
                .animate-ripple {
                    animation: ripple 1.5s ease-out forwards;
                }
                
                .animate-ripple-delayed {
                    animation: ripple 1.5s ease-out 0.2s forwards;
                }
                
                .animate-ripple-delayed-more {
                    animation: ripple 1.5s ease-out 0.4s forwards;
                }
                
                .animate-pulse-grow {
                    animation: pulse-grow 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                
                .animate-spin-slow {
                    animation: spin 3s linear infinite;
                }
                
                @keyframes ripple {
                    0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
                    100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
                }
                
                @keyframes pulse-grow {
                    0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.7; }
                    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.9; }
                    100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
                }
                
                @keyframes spin {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export const useTheme = () => useContext(ThemeContext);




// import React, { createContext, useContext, useEffect, useState } from "react";

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//     const [theme, setTheme] = useState(
//         localStorage.getItem("theme") || "dark"
//     );
//     const [isAnimating, setIsAnimating] = useState(false);

//     useEffect(() => {
//         const root = window.document.documentElement;

//         if (theme === "dark") {
//             root.classList.add("dark");
//             localStorage.setItem("theme", "dark");
//         } else {
//             root.classList.remove("dark");
//             localStorage.setItem("theme", "light");
//         }
//     }, [theme]);

//     const toggleTheme = () => {
//         setIsAnimating(true);
        
//         setTimeout(() => {
//             setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
            
//             setTimeout(() => setIsAnimating(false), 1200);
//         }, 200);
//     };

//     return (
//         <ThemeContext.Provider value={{ theme, toggleTheme, isAnimating }}>
//             {children}
//             {/* Theme animation overlay */}
//             {isAnimating && <ParticleExplosionAnimation theme={theme} />}
//         </ThemeContext.Provider>
//     );
// };

// const ParticleExplosionAnimation = ({ theme }) => {
//     const particles = Array.from({ length: 20 }, (_, i) => ({
//         id: i,
//         size: Math.random() * 10 + 5,
//         x: Math.random() * 60 - 30,
//         y: Math.random() * 60 - 30,
//         delay: Math.random() * 0.3
//     }));

//     const nextTheme = theme === "dark" ? "light" : "dark";
//     const particleColors = {
//         dark: ["bg-indigo-500", "bg-blue-600", "bg-purple-500", "bg-slate-700"],
//         light: ["bg-yellow-300", "bg-amber-400", "bg-orange-300", "bg-sky-300"]
//     };

//     return (
//         <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
//             <div className={`w-full h-full absolute transition-colors duration-1000 ${nextTheme === "dark" ? "bg-gray-900 bg-opacity-0" : "bg-white bg-opacity-0"} animate-fade-in`}></div>
            
//             <div className="relative">
//                 {/* Core circle that expands */}
//                 <div className={`w-16 h-16 rounded-full ${nextTheme === "dark" ? "bg-slate-800" : "bg-yellow-300"} 
//                     animate-ping opacity-70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
//                 </div>
                
//                 {/* Particles exploding outward */}
//                 {particles.map((particle) => (
//                     <div 
//                         key={particle.id}
//                         className={`absolute rounded-full 
//                             ${particleColors[nextTheme][particle.id % particleColors[nextTheme].length]}
//                             animate-particle opacity-80`}
//                         style={{
//                             width: `${particle.size}px`,
//                             height: `${particle.size}px`,
//                             top: "calc(50% - 5px)",
//                             left: "calc(50% - 5px)",
//                             animationDelay: `${particle.delay}s`,
//                             transform: `translate(${particle.x}px, ${particle.y}px) scale(0)`,
//                             animation: "particle 1s cubic-bezier(0.155, 0.405, 0.285, 0.925) forwards"
//                         }}
//                     ></div>
//                 ))}
                
//                 {/* Ripple effect */}
//                 <div className={`w-16 h-16 rounded-full border-4 ${nextTheme === "dark" ? "border-slate-700" : "border-yellow-400"} 
//                     absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ripple`}>
//                 </div>
//                 <div className={`w-16 h-16 rounded-full border-4 ${nextTheme === "dark" ? "border-slate-600" : "border-amber-300"} 
//                     absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ripple animation-delay-200`}>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export const useTheme = () => useContext(ThemeContext);