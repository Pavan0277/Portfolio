import React from "react";
import { motion } from "framer-motion";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "./ThemeContext";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors"
        >
            {theme === "dark" ? (
                <SunIcon className="h-6 w-6 text-yellow-500" />
            ) : (
                <MoonIcon className="h-6 w-6 text-blue-600" />
            )}
        </motion.button>
    );
};

export default ThemeToggle;
