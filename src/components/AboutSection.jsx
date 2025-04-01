import React from "react";
import { useTheme } from "./ThemeContext";
import { motion } from "framer-motion";

const AboutSection = () => {
    const { theme } = useTheme();

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    const imageVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.05,
            rotate: 3,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 15
            }
        },
        tap: {
            scale: 0.98,
            rotate: -2,
            transition: {
                type: "spring",
                stiffness: 500,
                damping: 10
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 12
            }
        },
        hover: {
            y: -5,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 15
            }
        }
    };

    return (
        <motion.section
            id="about"
            className="flex flex-col w-full min-h-screen md:flex-row items-center justify-evenly py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 ml-0 lg:ml-20 gap-6 md:gap-10 relative overflow-hidden text-gray-900 dark:text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
        >
            <motion.div 
                className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: theme === "dark" ? 0.1 : 0.05 }}
                transition={{ duration: 0.5 }}
            />

            {/* Left side content with profile image */}
            <motion.div 
                className="relative z-10 w-full md:w-2/5 flex flex-col items-center md:items-start justify-center text-center md:text-left"
                variants={itemVariants}
            >
                <motion.div 
                    className="mb-6"
                    variants={itemVariants}
                >
                    <motion.h2 
                        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-blue-600 dark:text-blue-400"
                        variants={itemVariants}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        About
                    </motion.h2>
                    <motion.h1 
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
                        variants={itemVariants}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Pavan Rasal
                    </motion.h1>
                </motion.div>

                <motion.div 
                    className="logo w-64 lg:w-64 h-auto mb-6"
                    variants={itemVariants}
                >
                    <motion.div 
                        className="relative overflow-hidden rounded-full border-4 border-blue-500/30 dark:border-blue-400/20 shadow-xl"
                        variants={imageVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                        animate={{
                            boxShadow: [
                                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                            ],
                            transition: {
                                repeat: Infinity,
                                repeatType: "reverse",
                                duration: 2
                            }
                        }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/20"
                            animate={{ 
                                opacity: [0.1, 0.2, 0.1],
                                background: [
                                    "linear-gradient(to top right, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.2))",
                                    "linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.1))",
                                    "linear-gradient(to top right, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.2))"
                                ]
                            }}
                            transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />
                        <motion.img
                            src="src/assets/image.png"
                            alt="Pavan Rasal"
                            className="w-full h-auto object-cover filter drop-shadow-lg dark:drop-shadow-[0_0_20px_rgba(0,0,0,0.7)]"
                            whileHover={{ scale: 1.03 }}
                        />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Right side content */}
            <motion.div 
                className="relative z-10 w-full md:w-3/5 flex flex-col items-center md:items-start"
                variants={itemVariants}
            >
                <motion.div 
                    className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
                    variants={cardVariants}
                    whileHover="hover"
                >
                    <motion.p 
                        className="text-base sm:text-lg mb-6 text-gray-700 dark:text-[#87A4B6] font-medium leading-relaxed"
                        variants={itemVariants}
                    >
                        An ambitious Front-end Developer and designer who takes
                        great pride in the presentation and quality of work.
                    </motion.p>

                    <motion.p 
                        className="text-base sm:text-lg text-gray-700 dark:text-[#87A4B6] font-medium leading-relaxed"
                        variants={itemVariants}
                    >
                        Pavan is someone who can design and create simple,
                        beautiful and easy to understand things. He is an expert
                        at taking designs into original, exciting and new
                        directions.
                    </motion.p>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default AboutSection;