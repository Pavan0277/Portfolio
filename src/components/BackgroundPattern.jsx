import React from "react";
import { useTheme } from "./ThemeContext";

const BackgroundPattern = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="fixed inset-0 w-full h-full z-[-1] overflow-hidden">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
                viewBox="0 0 2050 1000"
            >
                <defs>
                    <pattern
                        id="gridPattern"
                        width="50"
                        height="50"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M.5 50V.5H50"
                            fill="none"
                            stroke={isDark ? "#e0e0e0" : "#808080"}
                            strokeDasharray="1,1"
                            opacity="0.3"
                        ></path>
                    </pattern>
                    <linearGradient
                        id="backgroundGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        {isDark ? (
                            <>
                                <stop
                                    offset="0%"
                                    stopColor="#1a1a2e"
                                    stopOpacity="1"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#16213e"
                                    stopOpacity="1"
                                />
                            </>
                        ) : (
                            <>
                                <stop
                                    offset="0%"
                                    stopColor="#f0f0f0"
                                    stopOpacity="1"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#e0e0e0"
                                    stopOpacity="1"
                                />
                            </>
                        )}
                    </linearGradient>
                </defs>
                <rect
                    width="100%"
                    height="100%"
                    fill="url(#backgroundGradient)"
                />
                <rect width="100%" height="100%" fill="url(#gridPattern)" />

                {/* Grid cells */}
                <g opacity="0.15">
                    {/* Top section */}
                    <rect
                        x="180"
                        y="150"
                        width="50"
                        height="50"
                        fill={isDark ? "white" : "black"}
                    />
                    <rect
                        x="550"
                        y="120"
                        width="50"
                        height="50"
                        fill={isDark ? "white" : "black"}
                    />
                    <rect
                        x="950"
                        y="180"
                        width="50"
                        height="50"
                        fill={isDark ? "white" : "black"}
                    />

                    {/* Middle section */}
                    <rect
                        x="320"
                        y="380"
                        width="50"
                        height="50"
                        fill={isDark ? "white" : "black"}
                    />
                    <rect
                        x="680"
                        y="420"
                        width="50"
                        height="50"
                        fill={isDark ? "white" : "black"}
                    />
                    <rect
                        x="1050"
                        y="350"
                        width="50"
                        height="50"
                        fill={isDark ? "white" : "black"}
                    />
                    <rect
                        x="800"
                        y="500"
                        width="50"
                        height="50"
                        fill={isDark ? "white" : "black"}
                    />

                    {/* Bottom section */}
                    <rect
                        x="200"
                        y="650"
                        width="50"
                        height="50"
                        fill={isDark ? "white" : "black"}
                    />
                    <rect
                        x="550"
                        y="700"
                        width="50"
                        height="50"
                        fill={isDark ? "white" : "black"}
                    />
                    <rect
                        x="900"
                        y="680"
                        width="50"
                        height="50"
                        fill={isDark ? "white" : "black"}
                    />
                </g>
            </svg>
        </div>
    );
};

export default BackgroundPattern;
