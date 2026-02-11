import React, { useState } from 'react';
import GalaxyBackground from './components/GalaxyBackground';
import BiometricLock from './components/BiometricLock';
import MemoryOrbit from './components/MemoryOrbit';
import MemoryDump from './components/MemoryDump'; // Import the new component
import HeartCore from './components/HeartCore';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  // Stages: 
  // 0 = Lock Screen
  // 1 = Orbit (Timeline)
  // 2 = Memory Dump (Scattered Polaroids)
  // 3 = Heart Core (Proposal)
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

          {/* STAGE 1: ORBIT (The 3 Goddess Photos) */}
          {stage === 1 && (
            <motion.div
              key="memories"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100, filter: "blur(5px)" }} // Slides away
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <MemoryOrbit onComplete={() => setStage(2)} />
            </motion.div>
          )}

          {/* STAGE 2: MEMORY DUMP (The Chaos) */}
          {stage === 2 && (
            <motion.div
              key="dump"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              // The "Black Hole" Exit: Everything spirals into nothingness
              exit={{ opacity: 0, scale: 0, rotate: 180 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="h-full"
            >
              <MemoryDump onComplete={() => setStage(3)} />
            </motion.div>
          )}

          {/* STAGE 3: HEART CORE (The Proposal) */}
          {stage === 3 && (
            <motion.div
              key="heart"
              initial={{ opacity: 0, scale: 0.5 }} // Starts small after the vortex
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", duration: 1, bounce: 0.5 }}
              className="h-full"
            >
              <HeartCore />
            </motion.div>
          )}

        </AnimatePresence>
      </main>
      
      {/* S24 Aesthetic Border (Hidden on mobile, visible on PC testing) */}
      <div className="fixed inset-0 pointer-events-none border-[12px] border-black rounded-[40px] opacity-100 z-50 md:block hidden"></div>
    </div>
  );
}

export default App;