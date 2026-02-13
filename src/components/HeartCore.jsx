import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HeartCore = ({ onComplete }) => {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  
  // Typewriter State
  const [displayedText, setDisplayedText] = useState("");
  const [startTyping, setStartTyping] = useState(false);

  // YOUR SPECIFIC MESSAGE
  const fullMessage = "Hey baby girl... I just want to let you know that you mean a lot to me, okay? I will be there with you no matter what and I just want to say that I love you to the moon and I want you to achieve each and everything in your life... I know that I'm not perfect but I try my best to keep you happy and last but not least... Happy Valentine's Day. ❤️";

  const moveNoButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100; 
    setNoPosition({ x, y });
  };

  // 1. Wait 0.8s after clicking YES before typing starts
  useEffect(() => {
    if (accepted) {
      const delayTimer = setTimeout(() => {
        setStartTyping(true);
      }, 800);
      return () => clearTimeout(delayTimer);
    }
  }, [accepted]);

  // 2. Typewriter Logic
  useEffect(() => {
    if (startTyping) {
      let i = 0;
      const timer = setInterval(() => {
        if (i <= fullMessage.length) {
          setDisplayedText(fullMessage.slice(0, i));
          // Optional Haptic Feedback for S24
          if (i % 3 === 0 && navigator.vibrate) navigator.vibrate(5); 
          i++;
        } else {
          clearInterval(timer);
        }
      }, 50); // Typing speed

      return () => clearInterval(timer);
    }
  }, [startTyping, fullMessage]);

  if (accepted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="z-20 h-full flex flex-col items-center justify-center text-center p-6"
      >
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 drop-shadow-[0_0_20px_rgba(236,72,153,0.6)] mb-8"
        >
          FOREVER <br/> BOUND
        </motion.h1>
        
        {/* Message Container */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl max-w-sm w-full min-h-[280px] flex flex-colBW justify-start text-left relative overflow-hidden">
            <p className="text-white/90 text-lg font-mono leading-relaxed whitespace-pre-wrap relative z-10">
                {displayedText}
                <motion.span 
                  animate={{ opacity: [1, 0] }} 
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="text-pink-500 font-bold"
                >|</motion.span>
            </p>
        </div>
        
        {/* Button to go to Memory Fragments (Dump) */}
        <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 9 }} // Waits for message to complete
            onClick={onComplete}
            className="mt-8 flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 transition-all"
        >
            <span>ACCESS MEMORY FRAGMENTS</span>
            <ArrowRight size={18} />
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="z-20 h-full flex flex-col items-center justify-center space-y-12 px-4">
      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        >
           <svg viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32 md:w-40 md:h-40 text-red-600 drop-shadow-[0_0_50px_rgba(220,38,38,0.9)]">
             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
           </svg>
        </motion.div>
      </div>

      <div className="text-center space-y-4">
        <h2 className="text-3xl text-white font-bold tracking-tight drop-shadow-lg">Priority Message</h2>
        <p className="text-gray-400 font-light tracking-wide">Will you be my Valentine?</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center w-full justify-center relative min-h-[100px]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setAccepted(true)}
          className="z-50 px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl shadow-[0_0_30px_rgba(34,197,94,0.6)] border border-green-400/50"
        >
          YES
        </motion.button>
        
        <motion.button
            animate={{ x: noPosition.x, y: noPosition.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            onClick={moveNoButton}
            className="px-12 py-4 bg-gray-800/80 backdrop-blur-sm text-gray-500 font-bold text-lg rounded-xl border border-gray-700 w-36"
        >
          NO
        </motion.button>
      </div>
    </div>
  );
};

export default HeartCore;