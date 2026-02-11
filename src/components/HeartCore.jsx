import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HeartCore = () => {
  const [accepted, setAccepted] = useState(false);

  if (accepted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="z-20 h-full flex flex-col items-center justify-center text-center p-6"
      >
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 drop-shadow-2xl">
          FOREVER <br/> BOUND
        </h1>
        <p className="mt-6 text-white text-xl font-light">See you on the 14th.</p>
      </motion.div>
    );
  }

  return (
    <div className="z-20 h-full flex flex-col items-center justify-center space-y-12">
      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        >
           <svg viewBox="0 0 24 24" fill="currentColor" className="w-40 h-40 text-red-600 drop-shadow-[0_0_50px_rgba(220,38,38,0.8)]">
             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
           </svg>
        </motion.div>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-3xl text-white font-bold">Priority Message</h2>
        <p className="text-gray-400">Will you be my Valentine?</p>
      </div>

      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setAccepted(true)}
          className="px-8 py-3 bg-green-500 text-white font-bold rounded-lg shadow-lg shadow-green-500/30"
        >
          YES
        </motion.button>
        
        {/* The Trick Button - Moves when you try to click NO */}
        <motion.button
          whileHover={{ x: Math.random() * 100 - 50, y: Math.random() * 100 - 50 }}
          className="px-8 py-3 bg-gray-800 text-gray-400 font-bold rounded-lg border border-gray-700"
        >
          NO
        </motion.button>
      </div>
    </div>
  );
};

export default HeartCore;