import React from "react";
import { useTheme } from "./ThemeContext";
import { motion } from "framer-motion";
import {
    FaReact,
    FaJs,
    FaNode,
    FaDocker,
    FaAws,
    FaLinux,
} from "react-icons/fa";
import {
    SiRedux,
    SiTypescript,
    SiMongodb,
    SiMysql,
    SiExpress,
    SiFirebase,
} from "react-icons/si";

const SkillsSection = () => {
    const { theme } = useTheme();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 15,
            },
        },
    };

    const skills = [
        { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
        { name: "React.js", icon: <FaReact />, color: "#61DAFB" },
        { name: "Node.js", icon: <FaNode />, color: "#339933" },
        { name: "Express.js", icon: <SiExpress />, color: "#000000" },
        { name: "TypeScript", icon: <SiTypescript />, color: "#007ACC" },
        { name: "Redux", icon: <SiRedux />, color: "#764ABC" },
        { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
        { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
        { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28" },
        { name: "AWS", icon: <FaAws />, color: "#FF9900" },
        { name: "Docker", icon: <FaDocker />, color: "#2496ED" },
        { name: "Linux", icon: <FaLinux />, color: "#FCC624" },
    ];

    return (
        <div className="relative" id="skills">
            <motion.section
                className="w-full min-h-screen py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden text-gray-900 dark:text-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                <motion.div
                    className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: theme === "dark" ? 0.1 : 0.05 }}
                    transition={{ duration: 0.5 }}
                />

                <div className="relative z-10 max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-12"
                        variants={itemVariants}
                    >
                        <motion.h2
                            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-blue-600 dark:text-blue-400 inline-block relative"
                            variants={itemVariants}
                        >
                            Skills
                        </motion.h2>
                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-blue-100"
                            variants={itemVariants}
                        >
                            Technical Expertise
                        </motion.h1>
                        <motion.div
                            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full mx-auto mb-6"
                            variants={itemVariants}
                        />
                        <motion.p
                            className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
                            variants={itemVariants}
                        >
                            Technologies and languages I've been working with
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8"
                        variants={containerVariants}
                    >
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-5 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center shadow-md`}
                                variants={cardVariants}
                                whileHover="hover"
                                custom={index}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: index * 0.05 }}
                            >
                                <motion.div
                                    className="text-4xl sm:text-5xl mb-3"
                                    style={{ color: skill.color }}
                                    whileHover={{ y: -5 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                    }}
                                >
                                    {skill.icon}
                                </motion.div>
                                <h3 className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200">
                                    {skill.name}
                                </h3>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Skill level categories - updated with your skill categories */}
                    <motion.div
                        className="mt-16 max-w-5xl mx-auto"
                        variants={itemVariants}
                    >
                        <motion.h3
                            className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200"
                            variants={itemVariants}
                        >
                            Technical Skills
                        </motion.h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {/* Programming Languages */}
                            <motion.div
                                className="bg-gradient-to-br backdrop-blur-sm from-blue-50/50 to-blue-100/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl p-6 shadow-md border border-blue-200 dark:border-gray-600"
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <h4 className="text-lg font-bold mb-3 text-blue-600 dark:text-blue-400">
                                    Programming Languages
                                </h4>
                                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                    <li className="flex items-center">
                                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                        Java
                                    </li>
                                    <li className="flex items-center">
                                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                        JavaScript
                                    </li>
                                    <li className="flex items-center">
                                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                        C++
                                    </li>
                                    <li className="flex items-center">
                                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                        C
                                    </li>
                                    <li className="flex items-center">
                                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                        Golang
                                    </li>
                                </ul>
                            </motion.div>

                            {/* Web Development */}
                            <motion.div
                                className="bg-gradient-to-br from-green-50/50 to-green-100/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl backdrop-blur-sm p-6 shadow-md border border-green-200 dark:border-gray-600"
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <h4 className="text-lg font-bold mb-3 text-green-600 dark:text-green-400">
                                    Web Development
                                </h4>
                                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                    <li className="flex items-center">
                                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        React.js
                                    </li>
                                    <li className="flex items-center">
                                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        Node.js & Express.js
                                    </li>
                                    <li className="flex items-center">
                                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        HTML, CSS & Tailwind
                                    </li>
                                    <li className="flex items-center">
                                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        MongoDB & MySQL
                                    </li>
                                    <li className="flex items-center">
                                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        Firebase & Redis
                                    </li>
                                </ul>
                            </motion.div>

                            {/* DevOps */}
                            <motion.div
                                className="bg-gradient-to-br from-purple-50/50 to-purple-100/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl p-6 backdrop-blur-sm shadow-md border border-purple-200 dark:border-gray-600"
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <h4 className="text-lg font-bold mb-3 text-purple-600 dark:text-purple-400">
                                    DevOps
                                </h4>
                                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                    <li className="flex items-center">
                                        <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                        AWS
                                    </li>
                                    <li className="flex items-center">
                                        <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                        Docker
                                    </li>
                                    <li className="flex items-center">
                                        <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                        Jenkins
                                    </li>
                                    <li className="flex items-center">
                                        <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                        Kubernetes
                                    </li>
                                    <li className="flex items-center">
                                        <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                        Linux
                                    </li>
                                </ul>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default SkillsSection;
