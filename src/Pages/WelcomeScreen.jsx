import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, User, Github, Zap } from "lucide-react";

const ParticleBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Floating particles */}
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20"
        style={{
          width: `${Math.random() * 10 + 2}px`,
          height: `${Math.random() * 10 + 2}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      />
    ))}

    {/* Gradient overlays */}
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-transparent to-purple-900/30" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.1)_0%,transparent_70%)]" />
  </div>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentText, setCurrentText] = useState(0);

  const welcomeTexts = ["Innovator", "Developer", "Creator", "Problem Solver"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 800);
    }, 3500);

    // Rotate through welcome texts
    const textTimer = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % welcomeTexts.length);
    }, 800);

    return () => {
      clearTimeout(timer);
      clearInterval(textTimer);
    };
  }, [onLoadingComplete, welcomeTexts.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <ParticleBackground />

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            {/* Main Logo/Avatar */}
            <motion.div
              className="mb-8 flex justify-center"
              variants={itemVariants}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-gray-800 to-black border-2 border-cyan-500/30 flex items-center justify-center">
                  <Zap className="w-12 h-12 text-cyan-400" />
                </div>
              </div>
            </motion.div>

            {/* Welcome Message */}
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              variants={itemVariants}
            >
              <span className="block text-white mb-2">Hello, I'm</span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Abrham Asrat
              </span>
            </motion.h1>

            {/* Rotating Role Text */}
            <motion.div
              className="h-16 flex items-center justify-center"
              variants={itemVariants}
            >
              <div className="text-2xl md:text-3xl text-cyan-300 font-semibold min-h-[2.5rem]">
                <motion.span
                  key={currentText}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block"
                >
                  {welcomeTexts[currentText]}
                </motion.span>
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
              variants={itemVariants}
            >
              Crafting digital experiences with modern web technologies and
              creative solutions
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={itemVariants}
            >
              <button
                className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full font-medium hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20"
                onClick={() => setIsLoading(false)}
              >
                Enter Portfolio
              </button>

              <div className="flex gap-4">
                <a
                  href="#"
                  className="p-3 rounded-full bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 transition-all duration-300 hover:scale-110"
                >
                  <Github className="w-5 h-5 text-gray-300" />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-full bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 transition-all duration-300 hover:scale-110"
                >
                  <User className="w-5 h-5 text-gray-300" />
                </a>
              </div>
            </motion.div>

            {/* Loading Progress */}
            <motion.div
              className="mt-12 max-w-md mx-auto"
              variants={itemVariants}
            >
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3.5, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Loading awesome content...
              </p>
            </motion.div>
          </div>

          {/* Custom styles for animations */}
          <style>{`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0px) rotate(0deg);
              }
              50% {
                transform: translateY(-20px) rotate(180deg);
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
