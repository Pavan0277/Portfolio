import React from "react";
import { useTheme } from "./ThemeContext";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProjectsSection = () => {
    const { theme } = useTheme();

    // Sample project data - replace with your actual projects
    const projects = [
        {
            id: 1,
            title: "AI Assistant App",
            description:
                "A smart AI assistant that helps users with daily tasks, scheduling, and information retrieval using natural language processing.",
            image: "/project1.jpg", // Add your project images to public folder
            technologies: ["React", "Node.js", "OpenAI API", "MongoDB"],
            githubLink: "https://github.com/yourusername/ai-assistant",
            liveLink: "https://ai-assistant-demo.netlify.app",
        },
        {
            id: 2,
            title: "Finance Tracker",
            description:
                "Personal finance application that helps users track expenses, set budgets, and visualize spending patterns with interactive charts.",
            image: "/project2.jpg",
            technologies: ["Vue.js", "Express", "PostgreSQL", "Chart.js"],
            githubLink: "https://github.com/yourusername/finance-tracker",
            liveLink: "https://finance-tracker-app.herokuapp.com",
        },
        {
            id: 3,
            title: "E-commerce Platform",
            description:
                "Full-featured e-commerce platform with product catalog, shopping cart, user authentication, and payment processing.",
            image: "/project3.jpg",
            technologies: ["Next.js", "Tailwind CSS", "Stripe API", "Firebase"],
            githubLink: "https://github.com/yourusername/ecommerce-platform",
            liveLink: "https://ecommerce-example.vercel.app",
        },
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
            },
        },
    };

    const projectVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 12,
            },
        },
        hover: {
            y: -8,
            boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 15,
            },
        },
    };

    const imageVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.08,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 15,
            },
        },
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
        tap: {
            scale: 0.95,
        },
    };

    const tagVariants = {
        hover: {
            y: -3,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10,
            },
        },
    };

    return (
        <div className="relative" id="projects">
            <motion.section
                className="w-full min-h-screen py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden text-gray-900 dark:text-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants}
            >
                {/* Background pattern with animated particles */}
                <motion.div
                    className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: theme === "dark" ? 0.1 : 0.05 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {/* Floating particles background effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="particle-container">
                        {[...Array(10)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={`particle ${
                                    theme === "dark"
                                        ? "bg-blue-400/20"
                                        : "bg-blue-600/10"
                                } rounded-full absolute`}
                                style={{
                                    width: Math.random() * 20 + 5,
                                    height: Math.random() * 20 + 5,
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    y: [0, Math.random() * -100 - 50],
                                    x: [0, Math.random() * 50 - 25],
                                    opacity: [0, 0.7, 0],
                                }}
                                transition={{
                                    duration: Math.random() * 10 + 10,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: Math.random() * 5,
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    {/* Section Header - Enhanced with animated accent */}
                    <motion.div
                        className="text-center relative z-10 mb-16"
                        variants={headerVariants}
                    >
                        <motion.h2
                            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-blue-600 dark:text-blue-400 inline-block relative"
                            variants={headerVariants}
                        >
                            Projects
                        </motion.h2>
                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-blue-100"
                            variants={headerVariants}
                        >
                            Recent Work
                        </motion.h1>
                        <motion.div
                            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full mx-auto mb-6"
                            variants={headerVariants}
                        />
                        <motion.p
                            className="max-w-2xl mx-auto text-base sm:text-lg text-gray-700 dark:text-[#87A4B6] font-medium"
                            variants={headerVariants}
                        >
                            Here are some of my recent projects showcasing my
                            skills and passion for building innovative
                            solutions.
                        </motion.p>
                    </motion.div>

                    {/* Projects Grid - Enhanced with better spacing and refined cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 relative z-10">
                        {projects.map((project, index) => (
                            <motion.article
                                key={project.id}
                                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-200/70 dark:border-gray-700/70 overflow-hidden flex flex-col h-full group"
                                variants={projectVariants}
                                whileHover="hover"
                                custom={index}
                                transition={{ delay: index * 0.1 }}
                                style={{
                                    boxShadow:
                                        theme === "dark"
                                            ? "0 4px 20px -2px rgba(0, 0, 0, 0.3)"
                                            : "0 4px 20px -2px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <motion.div
                                    className="relative overflow-hidden h-52"
                                    variants={imageVariants}
                                >
                                    <motion.img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-all duration-300"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "https://via.placeholder.com/400x200?text=Project+Image";
                                        }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-80"
                                        initial={{ opacity: 0.7 }}
                                        whileHover={{ opacity: 0.5 }}
                                    />

                                    {/* Project title overlay on image */}
                                    <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                                        <h3 className="text-xl sm:text-2xl font-bold mb-1 drop-shadow-md">
                                            {project.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {project.technologies
                                                .slice(0, 2)
                                                .map((tech, index) => (
                                                    <motion.span
                                                        key={index}
                                                        className="px-2 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm"
                                                        variants={tagVariants}
                                                        whileHover="hover"
                                                    >
                                                        {tech}
                                                    </motion.span>
                                                ))}
                                            {project.technologies.length >
                                                2 && (
                                                <motion.span
                                                    className="px-2 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm"
                                                    variants={tagVariants}
                                                    whileHover="hover"
                                                >
                                                    +
                                                    {project.technologies
                                                        .length - 2}
                                                </motion.span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>

                                <div className="p-6 flex flex-col flex-grow relative">
                                    <p className="text-gray-700 dark:text-[#87A4B6] mb-6 flex-grow">
                                        {project.description}
                                    </p>

                                    {/* All technology tags in body */}
                                    <div className="mb-6 flex flex-wrap gap-2">
                                        {project.technologies.map(
                                            (tech, index) => (
                                                <motion.span
                                                    key={index}
                                                    className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/50"
                                                    variants={tagVariants}
                                                    whileHover="hover"
                                                >
                                                    {tech}
                                                </motion.span>
                                            )
                                        )}
                                    </div>

                                    {/* Link buttons with better styling */}
                                    <div className="flex justify-between mt-auto pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                                        <motion.a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                                            variants={buttonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                        >
                                            <FaGithub className="text-lg" />
                                            <span className="text-sm font-medium">
                                                Code
                                            </span>
                                        </motion.a>
                                        <motion.a
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                                            variants={buttonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                        >
                                            <FaExternalLinkAlt className="text-sm" />
                                            <span className="text-sm font-medium">
                                                Live Demo
                                            </span>
                                        </motion.a>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {/* Enhanced View More Button with animation */}
                    <motion.div
                        className="mt-16 text-center relative z-10"
                        variants={headerVariants}
                    >
                        <motion.a
                            href="https://github.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 text-white rounded-lg shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-blue-700/20 transition-all duration-300 font-medium"
                            variants={buttonVariants}
                            whileHover={{
                                scale: 1.03,
                                boxShadow:
                                    "0 10px 25px -5px rgba(59, 130, 246, 0.5), 0 8px 10px -6px rgba(59, 130, 246, 0.3)",
                            }}
                            whileTap="tap"
                        >
                            <span>See More Projects</span>
                            <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1.5,
                                    repeatType: "loop",
                                    ease: "easeInOut",
                                }}
                            >
                                →
                            </motion.span>
                        </motion.a>
                    </motion.div>
                </div>
            </motion.section>

            {/* Add CSS for particle animations */}
            <style jsx>{`
                .particle-container {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                }
                .particle {
                    filter: blur(1px);
                }
            `}</style>
        </div>
    );
};

export default ProjectsSection;
