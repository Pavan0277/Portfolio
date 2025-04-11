import React from "react";
import { useTheme } from "./ThemeContext";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

const ExperienceSection = () => {
    const { theme } = useTheme();

    // Work experience data
    const experiences = [
        {
            company: "Coding Jr",
            role: "Web Development Intern",
            period: "March 2025",
            link: "https://drive.google.com/file/d/1gMedbbVIwkLAL_2Tq3po3_hWVjE1Vtjk/view?usp=drive_link",
            responsibilities: [
                "Engineered scalable backend APIs using Go (Golang), improving system performance and supporting 10,000+ concurrent users on a real-time student-mentor platform.",
                "Optimized complex MySQL queries, reducing API response times by 40% and enhancing database performance under high load.",
                "Built automated and interactive API documentation using Swagger UI, improving developer onboarding speed by 30%.",
            ],
            logo: "/coding.jpg",
            color: "blue",
        },
        {
            company: "The Skill Guru Foundation",
            role: "Backend Development Intern",
            period: "December 2024",
            link: "https://drive.google.com/file/d/1UgLDWu3MVY4YbFl5Liq7ZauzOhmacpBl/view?usp=sharing",
            responsibilities: [
                "Contributed to the development of a web platform enabling real-time communication between students and mentors.",
                "Integrated voice and video calling, boosting direct communication efficiency by 40%.",
                "Developed intuitive UI/UX for the web platform, increasing user satisfaction (measured by surveys) by 20% and resulting in the tool now being used by over 200 mentors.",
            ],
            logo: "/theskill.jpg", // Replace with actual logo path
            color: "purple",
        },
        {
            company: "Rentkar - Switch To Share",
            role: "Full Stack Developer",
            period: "September 2024",
            link: "https://drive.google.com/file/d/1TX_m7Zbju9suZxYN6g0fuFK6dLftu1AH/view?usp=sharing",
            responsibilities: [
                "Maintaining a web app for renting products like PS5s and laptops.",
                "Streamlined the rental process for a better user experience.",
                "Worked with cross-functional teams to improve functionality and design.",
                "Engaged in code reviews to uphold code quality.",
            ],
            logo: "/rentkar.jpg", // Replace with actual logo path
            color: "green",
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
        hidden: { opacity: 0, x: (index) => (index % 2 === 0 ? -30 : 30) }, // Alternate direction based on index
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 12,
            },
        },
        hover: {
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

    return (
        <div id="experience" className="relative flex justify-right items-center">
            <motion.section
                className="flex flex-col w-full min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 ml-0 lg:ml-20 gap-6 md:gap-10 relative overflow-hidden text-gray-900 dark:text-white"
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

                <motion.div
                    className="relative z-10 w-full flex flex-col items-center md:items-start mb-10"
                    variants={itemVariants}
                >
                    <motion.h2
                        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-blue-600 dark:text-blue-400"
                        variants={itemVariants}
                    >
                        Experience
                    </motion.h2>
                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
                        variants={itemVariants}
                    >
                        Work Journey
                    </motion.h1>
                    <motion.div
                        className="w-20 h-1 bg-blue-500 dark:bg-blue-400 rounded-full mb-6"
                        variants={itemVariants}
                    />
                    <motion.p
                        className="text-base sm:text-lg text-gray-700 dark:text-[#87A4B6] font-medium text-center md:text-left max-w-2xl"
                        variants={itemVariants}
                    >
                        My professional journey through various roles and projects
                        that have shaped my expertise in web development.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="relative z-10 w-full flex flex-col"
                    variants={containerVariants}
                >
                    <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-700 ml-6 md:ml-0"></div>

                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            className={`flex flex-col md:flex-row items-start ${
                                index % 2 !== 0 ? "md:flex-row-reverse" : ""
                            } mb-12 relative`}
                            variants={containerVariants}
                        >
                            <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-4 border-blue-500 dark:border-blue-400 z-10 flex items-center justify-center ml-0 md:ml-0">
                                <motion.div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center`}
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <img
                                        src={exp.logo}
                                        alt={`${exp.company} logo`}
                                        className="w-full h-full object-contain rounded-full"
                                    />
                                </motion.div>
                            </div>

                            {/* Content card */}
                            <div
                                className={`md:w-[calc(50%-40px)] pl-20 md:pl-0 relative ${
                                    index % 2 === 0
                                        ? "md:mr-auto md:ml-0 md:pr-10"
                                        : "md:ml-auto md:mr-0 md:pl-10"
                                }`}
                            >
                                <motion.div
                                    className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl w-full`}
                                    variants={{
                                        ...cardVariants,
                                        hidden: {
                                            opacity: 0,
                                            x: index % 2 === 0 ? -30 : 30,
                                        },
                                    }}
                                    custom={index}
                                    whileHover="hover"
                                >
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <div className="flex flex-col sm:flex-row justify-between mb-3">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                                        {exp.company}
                                                        <a
                                                            href={exp.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors inline-block"
                                                        >
                                                            <FaExternalLinkAlt
                                                                size={14}
                                                            />
                                                        </a>
                                                    </h3>
                                                    <h4 className="text-md font-medium text-blue-600 dark:text-blue-400 mt-1">
                                                        {exp.role}
                                                    </h4>
                                                </div>
                                                <div className="mt-2 sm:mt-0 text-sm text-gray-600 dark:text-gray-400">
                                                    <div>{exp.period}</div>
                                                </div>
                                            </div>

                                            <ul className="mt-4 space-y-3">
                                                {exp.responsibilities.map(
                                                    (item, idx) => (
                                                        <motion.li
                                                            key={idx}
                                                            className="flex items-start gap-2 text-gray-700 dark:text-[#87A4B6]"
                                                            initial={{
                                                                opacity: 0,
                                                                x: -10,
                                                            }}
                                                            whileInView={{
                                                                opacity: 1,
                                                                x: 0,
                                                            }}
                                                            transition={{
                                                                delay: 0.1 * idx,
                                                            }}
                                                            viewport={{
                                                                once: true,
                                                            }}
                                                        >
                                                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 mt-2"></span>
                                                            <span>{item}</span>
                                                        </motion.li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>
        </div>
    );
};

export default ExperienceSection;
