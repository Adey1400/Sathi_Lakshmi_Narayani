import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';

// --- CONFIGURATION ZONE (4 PHOTOS) ---
const POLAROIDS = [
  { 
    id: 1, 
    img: "/WhatsApp Image 2026-02-11 at 20.13.52.jpeg", 
    text: "Sometimes, I look at you and wonder how I got so lucky. The universe must have aligned just for us." 
  },
  { 
    id: 2, 
    img: "/WhatsApp Image 2026-02-11 at 20.13.55.jpeg", 
    text: "Every moment with you feels like a scene from a movie I never want to end. You are my favorite plot twist." 
  },
  { 
    id: 3, 
    img: "/WhatsApp Image 2026-02-11 at 21.08.39.jpeg", 
    text: "It’s not just about the big dates or the gifts. It’s the way you laugh, the way you listen, the way you just are." 
  },
  { 
    id: 4, 
    img: "/WhatsApp Image 2026-02-11 at 21.09.13.jpeg", 
    text: "If I could freeze time, I’d choose the moment I first realized I was falling for you. Best freefall of my life." 
  }
];

const MemoryDump = () => {
  const [selectedId, setSelectedId] = useState(null);

  const scatterConfig = useMemo(() => {
    return POLAROIDS.map((_, index) => ({
      rotate: index % 2 === 0 ? -4 : 4, 
      y: index % 2 === 0 ? 0 : 20,
    }));
  }, []);

  return (
    <div className="relative z-10 w-full h-full flex flex-col items-center pt-10 pb-20">
      
      {/* Header */}
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-white font-thin tracking-[0.3em] text-xl mb-12 z-0"
      >
        FRAGMENTATION
      </motion.h2>

      {/* The Scatter Grid (4 Photos) */}
      <div className="w-full max-w-sm grid grid-cols-2 gap-x-6 gap-y-10 px-8">
        {POLAROIDS.map((item, index) => (
          <motion.div
            key={item.id}
            layoutId={`card-${item.id}`}
            onClick={() => setSelectedId(item.id)}
            initial={{ opacity: 0, y: 50, rotate: 0 }}
            animate={{ 
              opacity: 1, 
              y: scatterConfig[index].y, 
              rotate: scatterConfig[index].rotate 
            }}
            transition={{ 
              type: "spring", 
              damping: 15, 
              stiffness: 100, 
              delay: index * 0.15 
            }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-white p-2 pb-6 shadow-[0_8px_20px_rgba(0,0,0,0.5)] rounded-sm cursor-pointer transform-gpu"
          >
            <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100 mb-2 border border-gray-200">
              <img src={item.img} alt="Memory" className="w-full h-full object-cover pointer-events-none" />
            </div>
            <div className="space-y-1 opacity-20">
              <div className="h-0.5 bg-black w-full rounded-full" />
              <div className="h-0.5 bg-black w-2/3 rounded-full" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* EXPANDED VIEW OVERLAY */}
      <AnimatePresence>
        {selectedId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`card-${selectedId}`}
              className="w-full max-w-sm bg-white rounded-sm overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-3 right-3 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-md transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-full aspect-square">
                <img 
                  src={POLAROIDS.find(p => p.id === selectedId).img} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="p-8 bg-white flex flex-col items-center text-center">
                <p className="text-gray-800 font-serif text-lg leading-relaxed italic mb-6">
                  "{POLAROIDS.find(p => p.id === selectedId).text}"
                </p>
                <div className="w-12 h-1 bg-pink-500 rounded-full opacity-50"></div>
                <p className="text-[10px] text-gray-400 mt-4 uppercase tracking-[0.2em]">
                  Encrypted Memory
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FINAL STATIC FOOTER (No Button) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-10 w-full flex flex-col items-center justify-center space-y-2 pointer-events-none opacity-50"
      >
        <p className="text-[10px] uppercase tracking-[0.4em] text-pink-300">
          Transmission Complete
        </p>
        <Heart size={12} className="text-pink-500 animate-pulse" fill="currentColor" />
      </motion.div>

    </div>
  );
};

export default MemoryDump;