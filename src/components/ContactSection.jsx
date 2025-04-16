import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import emailjs from "@emailjs/browser";

const ContactSection = () => {
    const { theme } = useTheme();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    // Initialize EmailJS when component mounts
    useEffect(() => {
        emailjs.init(import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY);
    }, []);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = "Name is required";
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (
            !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
        ) {
            errors.email = "Please enter a valid email address";
        }
        if (!formData.message.trim()) errors.message = "Message is required";
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsSubmitting(true);

            try {
                // Create template parameters object according to EmailJS expected format
                const templateParams = {
                    from_name: formData.name,
                    reply_to: formData.email,
                    subject: formData.subject || "Portfolio Contact Form",
                    message: formData.message,
                    to_name: "Pavan Rasal",
                };

                // Send email with proper error handling
                const response = await emailjs.send(
                    import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                    templateParams,
                    {
                        publicKey: import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
                    }
                );

                console.log("Email successfully sent!", response);
                setSubmitStatus("success");
                setFormData({ name: "", email: "", subject: "", message: "" });

                setTimeout(() => {
                    setSubmitStatus(null);
                }, 5000);
            } catch (error) {
                // Improved error logging with full error details
                console.error("Failed to send email:", error);
                
                // Log more details if available
                if (error && typeof error === 'object') {
                    if (error.text) console.error("Error text:", error.text);
                    if (error.message) console.error("Error message:", error.message);
                    if (error.status) console.error("Error status:", error.status);
                    if (error.name) console.error("Error name:", error.name);
                }
                
                setSubmitStatus("error");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="relative" id="contact">
            <motion.section
                className="w-full min-h-screen py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden text-gray-900 dark:text-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                <motion.div
                    className="absolute inset-0 bg-grid-pattern opacity-3 dark:opacity-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: theme === "dark" ? 0.05 : 0.03 }}
                    transition={{ duration: 0.5 }}
                />

                <div className="relative z-10 max-w-6xl mx-auto">
                    <motion.div
                        className="text-center mb-14"
                        variants={itemVariants}
                    >
                        <motion.h2
                            className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 text-blue-700 dark:text-blue-400 inline-block relative"
                            variants={itemVariants}
                        >
                            Contact Us
                        </motion.h2>
                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200"
                            variants={itemVariants}
                        >
                            Request a Consultation
                        </motion.h1>
                        <motion.div
                            className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 rounded-full mx-auto mb-6"
                            variants={itemVariants}
                        />
                        <motion.p
                            className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
                            variants={itemVariants}
                        >
                            We value your inquiries. Please complete the form
                            below to discuss your project requirements or
                            schedule a meeting with our team.
                        </motion.p>
                    </motion.div>

                    <div className="flex items-center justify-center mt-10">
                        <motion.div
                            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl p-8 sm:p-10 border border-gray-200 dark:border-gray-700 w-full max-w-2xl"
                            variants={itemVariants}
                        >
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                                Contact Information
                            </h3>

                            {submitStatus === "success" ? (
                                <motion.div
                                    className="bg-green-50 border-l-4 border-green-500 text-green-800 dark:bg-green-900/40 dark:text-green-100 p-4 rounded mb-8"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p className="font-medium">
                                        Thank you for your message. Our team
                                        will review your inquiry and respond
                                        promptly.
                                    </p>
                                </motion.div>
                            ) : submitStatus === "error" ? (
                                <motion.div
                                    className="bg-red-50 border-l-4 border-red-500 text-red-800 dark:bg-red-900/40 dark:text-red-100 p-4 rounded mb-8"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <p className="font-medium">
                                        We apologize, but there was an error
                                        processing your request. Please try
                                        again or contact us directly.
                                    </p>
                                </motion.div>
                            ) : null}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                        >
                                            Full Name*
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            autoComplete="name"
                                            className={`w-full px-4 py-3 rounded-md bg-white/50 dark:bg-gray-700/50 border ${
                                                formErrors.name
                                                    ? "border-red-500 dark:border-red-400"
                                                    : "border-gray-300 dark:border-gray-600"
                                            } focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none transition-colors`}
                                            placeholder="Enter your name"
                                        />
                                        {formErrors.name && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                                {formErrors.name}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                        >
                                            Email Address*
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            autoComplete="email"
                                            className={`w-full px-4 py-3 rounded-md bg-white/70 dark:bg-gray-700/70 border ${
                                                formErrors.email
                                                    ? "border-red-500 dark:border-red-400"
                                                    : "border-gray-300 dark:border-gray-600"
                                            } focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none transition-colors`}
                                            placeholder="Enter your email"
                                        />
                                        {formErrors.email && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                                {formErrors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        className="w-full px-4 py-3 rounded-md bg-white/70 dark:bg-gray-700/70 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none transition-colors"
                                        placeholder="Specify the purpose of your message"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Message*
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        rows="6"
                                        className={`w-full px-4 py-3 rounded-md bg-white/70 dark:bg-gray-700/70 border ${
                                            formErrors.message
                                                ? "border-red-500 dark:border-red-400"
                                                : "border-gray-300 dark:border-gray-600"
                                        } focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none transition-colors`}
                                        placeholder="Please describe your project or inquiry in detail"
                                    />
                                    {formErrors.message && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                            {formErrors.message}
                                        </p>
                                    )}
                                </div>

                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    *Required fields
                                </p>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-medium py-3 px-6 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 flex items-center justify-center"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isSubmitting ? (
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                    ) : (
                                        <FaPaperPlane className="mr-2" />
                                    )}
                                    {isSubmitting
                                        ? "Submitting..."
                                        : "Submit Inquiry"}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default ContactSection;