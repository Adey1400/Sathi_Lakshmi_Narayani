import React, { useState } from 'react';
import GalaxyBackground from './components/GalaxyBackground';
import BiometricLock from './components/BiometricLock';
import MemoryOrbit from './components/MemoryOrbit';
import MemoryDump from './components/MemoryDump';
import HeartCore from './components/HeartCore';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  // Stages: 
  // 0 = Lock Screen
  // 1 = Orbit (Timeline: Sati/Lakshmi/Narayani)
  // 2 = Heart Core (The Proposal & Message)
  // 3 = Memory Dump (The 4 Final Photos)
  const [stage, setStage] = useState(0); 

  return (
    <div className="relative w-full h-dvh bg-black font-sans overflow-hidden text-white selection:bg-pink-500 selection:text-white">
      
      <GalaxyBackground />

      <main className="relative z-10 w-full h-full max-w-md mx-auto flex flex-col">
        <AnimatePresence mode="wait">
          
          {/* STAGE 0: LOCK SCREEN */}
          {stage === 0 && (
            <motion.div
              key="lock"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
              className="h-full"
            >
              <BiometricLock onUnlock={() => setStage(1)} />
            </motion.div>
          )}

          {/* STAGE 1: MEMORY ORBIT */}
          {stage === 1 && (
            <motion.div
              key="memories"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100, filter: "blur(5px)" }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              {/* Moves to Heart Core next */}
              <MemoryOrbit onComplete={() => setStage(2)} />
            </motion.div>
          )}

          {/* STAGE 2: HEART CORE (PROPOSAL) */}
          {stage === 2 && (
            <motion.div
              key="heart"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 1.1 }}
              transition={{ type: "spring", duration: 1, bounce: 0.5 }}
              className="h-full"
            >
              {/* Moves to Memory Dump next */}
              <HeartCore onComplete={() => setStage(3)} />
            </motion.div>
          )}

          {/* STAGE 3: MEMORY DUMP (FINAL) */}
          {stage === 3 && (
            <motion.div
              key="dump"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="h-full"
            >
              {/* No exit action, this is the end */}
              <MemoryDump />
            </motion.div>
          )}

        </AnimatePresence>
      </main>
      
      {/* S24 Aesthetic Border (Hidden on mobile) */}
      <div className="fixed inset-0 pointer-events-none border-[12px] border-black rounded-[40px] opacity-100 z-50 md:block hidden"></div>
    </div>
  );
}

export default App;