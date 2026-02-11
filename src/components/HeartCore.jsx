import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeartCore = () => {
  const [accepted, setAccepted] = useState(false);
  

  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

 
  const moveNoButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100; 
    setNoPosition({ x, y });
  };

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
        
        {/* Added a reset button for testing/replayability */}
        <button 
            onClick={() => setAccepted(false)}
            className="mt-12 text-gray-500 text-xs uppercase tracking-widest hover:text-white transition-colors"
        >
            Reset System
        </button>
      </motion.div>
    );
  }

  return (
    <div className="z-20 h-full flex flex-col items-center justify-center space-y-12 px-4">
      {/* Heartbeat Animation */}
      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        >
           <svg viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32 md:w-40 md:h-40 text-red-600 drop-shadow-[0_0_35px_rgba(220,38,38,0.8)]">
             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
           </svg>
        </motion.div>
      </div>

      <div className="text-center space-y-4">
        <h2 className="text-3xl text-white font-bold tracking-tight">Priority Message</h2>
        <p className="text-gray-400">Will you be my Valentine?</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center w-full justify-center relative min-h-[100px]">
        {/* YES Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setAccepted(true)}
          className="z-50 px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.5)] border border-green-400/30"
        >
          YES
        </motion.button>
        
        {/* The IMPOSSIBLE NO Button */}
        <motion.button
            // Use 'animate' to bind position to state
            animate={{ x: noPosition.x, y: noPosition.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            
            // Desktop: Run away on hover
            onMouseEnter={moveNoButton}
            
            // Mobile: Run away on touch start (happens before click)
            onTouchStart={moveNoButton}
            
            // Fail-safe: If they somehow click it, move it anyway
            onClick={moveNoButton}
            
            className="px-10 py-4 bg-gray-800/80 backdrop-blur-sm text-gray-400 font-bold rounded-xl border border-gray-700 w-32"
        >
          NO
        </motion.button>
      </div>
    </div>
  );
};

export default HeartCore;