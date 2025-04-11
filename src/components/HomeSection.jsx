import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";
import { FaGithub, FaLinkedin, FaEnvelope, FaFilePdf } from "react-icons/fa";
import { ReactTyped } from "react-typed";

const HomeSection = () => {
    const { theme, toggleTheme } = useTheme();

    const [isOpen, setIsOpen] = React.useState(false);
    const [activeSection, setActiveSection] = React.useState("home");

    const handleLinkClick = (e, href) => {
        e.preventDefault();
        setIsOpen(false); // Close the mobile menu

        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            // Create a smooth animation to the target section
            const offset = targetSection.offsetTop - 80; // Adjust offset to account for navbar height

            const mainContent =
                document.querySelector(".main-content") || window;
            const currentScroll = mainContent.scrollTop || window.scrollY;
            const distance = offset - currentScroll;

            // Animate scroll with easing
            const duration = 1000; // ms
            const start = performance.now();

            function animateScroll(timestamp) {
                const elapsed = timestamp - start;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (easeInOutCubic)
                const easeInOutCubic =
                    progress < 0.5
                        ? 4 * progress * progress * progress
                        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                const newPosition = currentScroll + distance * easeInOutCubic;

                if (mainContent === window) {
                    window.scrollTo(0, newPosition);
                } else {
                    mainContent.scrollTop = newPosition;
                }

                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                } else {
                    setActiveSection(targetId);
                }
            }

            requestAnimationFrame(animateScroll);
        }
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8 xl:px-10"
        >
            {/* Background elements for visual interest */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-12 -left-24 w-64 h-64 sm:w-80 sm:h-80 bg-purple-500/10 dark:bg-purple-400/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container max-w-6xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
                        Hello, I'm{" "}
                        <span className="text-blue-600 dark:text-blue-400">
                            <ReactTyped
                                strings={[
                                    "Pavan Rasal",
                                    "Full Stack Developer",
                                ]}
                                typeSpeed={100}
                                backSpeed={80}
                                loop
                            />
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-white/80 mb-8 tracking-wide"
                    >
                        Software Developer | Web Enthusiast | Problem Solver
                    </motion.p>

                    {/* Social links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="flex justify-center space-x-4 sm:space-x-5 mb-8 sm:mb-10"
                    >
                        <div className="group relative">
                            <a
                                href="https://github.com/Pavan0228"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                aria-label="GitHub Profile"
                            >
                                <FaGithub size={24} />
                            </a>
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 w-auto p-2 min-w-max bg-gray-900 text-white text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                GitHub
                            </span>
                        </div>

                        <div className="group relative">
                            <a
                                href="https://www.linkedin.com/in/pavan-rasal/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                aria-label="LinkedIn Profile"
                            >
                                <FaLinkedin size={24} />
                            </a>
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 w-auto p-2 min-w-max bg-gray-900 text-white text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                LinkedIn
                            </span>
                        </div>

                        <div className="group relative">
                            <a
                                href="mailto:pavanrasal4@gmail.com"
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                aria-label="Email Me"
                            >
                                <FaEnvelope size={24} />
                            </a>
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 w-auto p-2 min-w-max bg-gray-900 text-white text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Email
                            </span>
                        </div>

                        <div className="group relative">
                            <a
                                href="/RESUME.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                aria-label="View Resume"
                            >
                                <FaFilePdf size={24} />
                            </a>
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 w-auto p-2 min-w-max bg-gray-900 text-white text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Resume
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="flex flex-wrap justify-center gap-3 sm:gap-4"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-5 py-2 sm:px-6 sm:py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-medium tracking-wide hover:bg-blue-700 dark:hover:bg-blue-600 transition-all shadow-lg flex items-center justify-center"
                            onClick={(e) => handleLinkClick(e, "#about")}
                        >
                            View My Work
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-5 py-2 sm:px-6 sm:py-3 border-2 border-gray-800 dark:border-white text-gray-800 dark:text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-medium tracking-wide hover:bg-gray-100 dark:hover:bg-gray-800/30 transition-all shadow-lg flex items-center justify-center"
                            onClick={(e) => handleLinkClick(e, "#contact")}
                        >
                            Contact Me
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2"
                onClick={() => handleLinkClick(event, "#about")}
                aria-label="Scroll Down"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-4 h-8 sm:w-5 sm:h-10 border-2 border-gray-700 dark:border-gray-300 rounded-full flex justify-center pt-1 sm:pt-2"
                >
                    <div className="w-1 h-2 sm:h-3 bg-gray-700 dark:bg-gray-300 rounded-full"></div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HomeSection;
