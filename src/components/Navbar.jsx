import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            const mainContent = document.querySelector(".main-content");
            const scrollPosition = mainContent
                ? mainContent.scrollTop
                : window.scrollY;
            setIsScrolled(scrollPosition > 50);
            
            // Detect which section is currently in view
            const sections = navLinks.map(link => link.href.substring(1));
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        const mainContent = document.querySelector(".main-content");

        if (mainContent) {
            mainContent.addEventListener("scroll", handleScroll);
        }

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (mainContent) {
                mainContent.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Experience", href: "#experience" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    const handleLinkClick = (e, href) => {
        e.preventDefault();
        setIsOpen(false); // Close the mobile menu
        
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Create a smooth animation to the target section
            const offset = targetSection.offsetTop - 80; // Adjust offset to account for navbar height
            
            const mainContent = document.querySelector(".main-content") || window;
            const currentScroll = mainContent.scrollTop || window.scrollY;
            const distance = offset - currentScroll;
            
            // Animate scroll with easing
            const duration = 1000; // ms
            const start = performance.now();
            
            function animateScroll(timestamp) {
                const elapsed = timestamp - start;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (easeInOutCubic)
                const easeInOutCubic = progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                
                const newPosition = currentScroll + (distance * easeInOutCubic);
                
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

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed w-full z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-white/40 dark:bg-gray-900/40 backdrop-blur-md shadow-lg"
                    : "bg-transparent"
            }`}
        >
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    Pavan Rasal
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-700 dark:text-white focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`text-sm tracking-wider uppercase transition-colors relative ${
                                activeSection === link.href.substring(1)
                                    ? "text-gray-900 dark:text-white font-medium"
                                    : "text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white"
                            }`}
                        >
                            {link.name}
                            {activeSection === link.href.substring(1) && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </motion.a>
                    ))}

                    {/* Toggle Theme Button */}
                    <ThemeToggle />
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
                >
                    <div className="px-4 py-3 space-y-3">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link.href)}
                                className={`block py-2 text-sm tracking-wider uppercase transition-colors ${
                                    activeSection === link.href.substring(1)
                                        ? "text-blue-500 dark:text-blue-400 font-medium"
                                        : "text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white"
                                }`}
                            >
                                {link.name}
                            </a>
                        ))}
                        {/* Theme Toggle */}
                        <div className="py-2 flex justify-center">
                            <ThemeToggle />
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;