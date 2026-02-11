import React, { useState } from 'react';
import GalaxyBackground from './components/GalaxyBackground';
import BiometricLock from './components/BiometricLock';
import MemoryOrbit from './components/MemoryOrbit';
import HeartCore from './components/HeartCore';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [stage, setStage] = useState(0); 

  return (

    <div className="relative w-full h-dvh bg-black font-sans overflow-hidden text-white selection:bg-pink-500 selection:text-white">
      
      <GalaxyBackground />

      <main className="relative z-10 w-full h-full max-w-md mx-auto flex flex-col">
        <AnimatePresence mode="wait">
          
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

          {stage === 1 && (
            <motion.div
              key="memories"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="h-full"
            >
              <MemoryOrbit onComplete={() => setStage(2)} />
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              key="heart"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="h-full"
            >
              <HeartCore />
            </motion.div>
          )}

        </AnimatePresence>
      </main>
      

      <div className="fixed inset-0 pointer-events-none border-[12px] border-black rounded-[40px] opacity-100 z-50 md:block hidden"></div>
    </div>
  );
}

export default App;