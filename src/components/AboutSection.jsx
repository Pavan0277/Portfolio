import React from "react";
import { useTheme } from "./ThemeContext";
import { motion } from "framer-motion";
import { FaGraduationCap, FaCode, FaLightbulb, FaRocket } from "react-icons/fa";

const AboutSection = () => {
    const { theme } = useTheme();

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

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
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

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
            },
        },
        hover: {
            scale: 1.05,
            y: -5,
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
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
            },
        },
        hover: {
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 15,
            },
        },
    };

    const highlights = [
        {
            icon: <FaGraduationCap />,
            title: "Education",
            description: "B.Tech in Computer Science & Engineering",
            color: "blue",
        },
        {
            icon: <FaCode />,
            title: "Development",
            description: "Full Stack Web Development with modern technologies",
            color: "green",
        },
        {
            icon: <FaLightbulb />,
            title: "Innovation",
            description: "Creative problem solving and innovative solutions",
            color: "yellow",
        },
        {
            icon: <FaRocket />,
            title: "Growth",
            description: "Continuously learning and adapting to new technologies",
            color: "purple",
        },
    ];

    return (
        <div className="relative" id="about">
            <motion.section
                className="w-full min-h-screen py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden text-gray-900 dark:text-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                {/* Background pattern */}
                <motion.div
                    className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: theme === "dark" ? 0.1 : 0.05 }}
                    transition={{ duration: 0.5 }}
                />
                <div className="relative z-10 max-w-7xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        className="text-center mb-16"
                        variants={itemVariants}
                    >
                        <motion.h2
                            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-blue-600 dark:text-blue-400 inline-block relative"
                            variants={itemVariants}
                        >
                            About Me
                        </motion.h2>
                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-blue-100"
                            variants={itemVariants}
                        >
                            Get to Know Me
                        </motion.h1>
                        <motion.div
                            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full mx-auto mb-6"
                            variants={itemVariants}
                        />
                        <motion.p
                            className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
                            variants={itemVariants}
                        >
                            Passionate developer with a love for creating innovative solutions
                        </motion.p>
                    </motion.div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
                        {/* Profile Image */}
                        <motion.div
                            className="flex justify-center lg:justify-start order-1 lg:order-1"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="relative"
                                variants={imageVariants}
                                whileHover="hover"
                            >
                                <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                                    
                                    {/* Profile image */}
                                    <motion.img
                                        src="/image.png"
                                        alt="Pavan Rasal - Profile"
                                        className="relative w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-2xl z-10"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://via.placeholder.com/400x400?text=Profile+Photo";
                                        }}
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    />
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* About Content */}
                        <motion.div
                            className="order-2 lg:order-2"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-xl"
                                variants={cardVariants}
                                whileHover={{ y: -5 }}
                            >
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    Hello! I'm Pavan Rasal
                                </h3>
                                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                                    <p className="text-base sm:text-lg leading-relaxed">
                                        I'm a passionate <span className="font-semibold text-blue-600 dark:text-blue-400">Full Stack Developer</span> with 
                                        a strong foundation in modern web technologies. I love creating innovative solutions 
                                        that make a real impact.
                                    </p>
                                    <p className="text-base sm:text-lg leading-relaxed">
                                        Currently pursuing my <span className="font-semibold text-green-600 dark:text-green-400">B.Tech in Computer Science</span>, 
                                        I have hands-on experience with React.js, Node.js, and various cloud technologies. 
                                        I've worked on projects ranging from finance trackers to deployment platforms.
                                    </p>
                                    <p className="text-base sm:text-lg leading-relaxed">
                                        When I'm not coding, you'll find me exploring new technologies, contributing to 
                                        open-source projects, or learning about the latest trends in web development. 
                                        I believe in <span className="font-semibold text-purple-600 dark:text-purple-400">continuous learning</span> and 
                                        always strive to write clean, efficient code.
                                    </p>
                                </div>

                                {/* Quick Stats */}
                                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">3+</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Internships</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">10+</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Highlights Grid */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        variants={containerVariants}
                    >
                        {highlights.map((highlight, index) => (
                            <motion.div
                                key={highlight.title}
                                className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-xl text-center`}
                                variants={cardVariants}
                                whileHover="hover"
                                custom={index}
                            >
                                <motion.div
                                    className={`text-4xl mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full ${
                                        highlight.color === "blue"
                                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                            : highlight.color === "green"
                                            ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                            : highlight.color === "yellow"
                                            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                                            : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                                    }`}
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {highlight.icon}
                                </motion.div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                    {highlight.title}
                                </h4>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">
                                    {highlight.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default AboutSection;