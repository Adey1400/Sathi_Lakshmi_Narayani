import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// --- CONFIGURATION ZONE ---
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
  },
  { 
    id: 5, 
    img: "/WhatsApp Image 2026-02-11 at 20.13.52.jpeg", // Reusing for grid balance
    text: "You are the peace in my chaos, the silence in my noise, and the beat in my heart." 
  },
  { 
    id: 6, 
    img: "/WhatsApp Image 2026-02-11 at 20.13.55.jpeg", // Reusing for grid balance
    text: "Forever is a long time, but I wouldn't mind spending it by your side. Let's make history." 
  }
];

const MemoryDump = ({ onComplete }) => {
  const [selectedId, setSelectedId] = useState(null);

  // REFINED SCATTER: Less chaotic, more aesthetic
  // We use useMemo to ensure positions don't jump around on re-renders
  const scatterConfig = useMemo(() => {
    return POLAROIDS.map((_, index) => ({
      // Alternate tilts for a neat "stacked" look (e.g., -6, +6, -6, +6)
      rotate: index % 2 === 0 ? -6 : 6, 
      // Slight vertical offset to break the grid rigidity without making it messy
      y: index % 2 === 0 ? 0 : 20,
    }));
  }, []);

  return (
    <div className="relative z-10 w-full h-full flex flex-col items-center pt-10 pb-20">
      
      {/* Header */}
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-white font-thin tracking-[0.3em] text-xl mb-8 z-0"
      >
        FRAGMENTATION
      </motion.h2>

      {/* The Scatter Grid - Two Columns for clearer mobile view */}
      <div className="w-full max-w-lg grid grid-cols-2 gap-x-4 gap-y-12 px-6 pb-32">
        {POLAROIDS.map((item, index) => (
          <motion.div
            key={item.id}
            layoutId={`card-${item.id}`}
            onClick={() => setSelectedId(item.id)}
            
            // Entrance: Slide up with a slight fade
            initial={{ opacity: 0, y: 100, rotate: 0 }}
            animate={{ 
              opacity: 1, 
              y: scatterConfig[index].y, 
              rotate: scatterConfig[index].rotate 
            }}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 100, 
              delay: index * 0.1 
            }}
            
            // Interactions
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
            
            className="relative bg-white p-3 pb-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-sm cursor-pointer transform-gpu"
          >
            {/* The Polaroid Image */}
            <div className="w-full aspect-[4/5] overflow-hidden bg-gray-100 mb-3 border border-gray-200">
              <img src={item.img} alt="Memory" className="w-full h-full object-cover pointer-events-none" />
            </div>
            {/* Cleaner Text Lines */}
            <div className="space-y-2 opacity-30">
              <div className="h-1 bg-black w-full rounded-full" />
              <div className="h-1 bg-black w-2/3 rounded-full" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* THE EXPANDED VIEW OVERLAY */}
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

      {/* The Next Button - Fixed at bottom */}
      <div className="fixed bottom-8 w-full px-6 flex justify-center z-40 pointer-events-none">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          onClick={onComplete}
          className="pointer-events-auto px-10 py-4 bg-white text-black font-bold text-lg rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] tracking-wider hover:scale-105 active:scale-95 transition-transform"
        >
          ASSEMBLE HEART CORE
        </motion.button>
      </div>

    </div>
  );
};

export default MemoryDump;