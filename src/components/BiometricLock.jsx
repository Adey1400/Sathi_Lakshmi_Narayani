import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint } from 'lucide-react';

const BiometricLock = ({ onUnlock }) => {
  const [progress, setProgress] = useState(0);

  const handlePressStart = () => {
    // Start scanning animation
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8 text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h1 className="text-4xl font-thin tracking-[0.2em] text-white font-mono">
          SYSTEM <span className="text-pink-500 font-bold">LOCKED</span>
        </h1>
        <p className="mt-2 text-gray-400 text-xs tracking-widest uppercase">
          Biometric Match Required
        </p>
      </motion.div>

      <div className="relative">
        {/* Ring Animation */}
        <motion.div
          className="absolute inset-0 border-4 border-pink-500/30 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* The Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="relative w-24 h-24 bg-gradient-to-tr from-pink-600 to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(236,72,153,0.5)] border border-white/20"
          onPointerDown={() => setProgress(100)}
          onPointerUp={() => {
            if (progress < 100) setProgress(0);
          }}
          onTransitionEnd={() => {
            if (progress === 100) onUnlock();
          }}
        >
          <Fingerprint className="w-12 h-12 text-white" />
          
          {/* Filling Circle */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <circle
              cx="48" cy="48" r="46"
              stroke="white" strokeWidth="4"
              fill="none"
              strokeDasharray="289"
              strokeDashoffset={289 - (289 * progress) / 100}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
        </motion.button>
      </div>
      
      <p className="text-pink-300/80 text-sm animate-pulse">
        Hold to Authenticate Love
      </p>
    </div>
  );
};

export default BiometricLock;