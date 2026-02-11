import React from 'react';
import { motion } from 'framer-motion';

const MEMORIES = [
 { 
    id: 1, 
    img: "/WhatsApp Image 2026-02-11 at 20.48.45.jpeg", 
    title: "The Soul", 
    date: "Phase 1",
    label: "SATI" 
  },
  { 
    id: 2, 
    img: "/WhatsApp Image 2026-02-11 at 20.13.50.jpeg", 
    title: "The Grace", 
    date: "Phase 2",
    label: "LAKSHMI" 
  },
  { 
    id: 3, 
    img: "/WhatsApp Image 2026-02-11 at 20.48.26.jpeg", 
    title: "The Divine", 
    date: "Phase 3",
    label: "NARAYANI" 
  },
];

const MemoryOrbit = ({ onComplete }) => {
  return (
    <div className="relative z-10 w-full h-full flex flex-col items-center pt-10 pb-20 overflow-y-scroll no-scrollbar scroll-smooth">
      <motion.h2 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="text-2xl text-white font-light tracking-widest mb-12 sticky top-5 z-50 mix-blend-difference"
      >
        ARCHIVES
      </motion.h2>

      <div className="space-y-20 w-full px-4 pb-32">
        {MEMORIES.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, type: "spring" }}
       
            className={`flex w-full items-center ${index % 2 !== 0 ? 'flex-row-reverse' : 'flex-row'}`}
          >
          
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative p-1 bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img 
                  src={memory.img} 
                  alt={memory.title} 
                  className="w-40 h-56 object-cover rounded-xl filter grayscale group-hover:grayscale-0 transition-all duration-500" 
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                  <p className="text-white font-bold text-[10px] uppercase tracking-widest text-center">{memory.title}</p>
                </div>
              </div>
            </div>

            {/* 2. The Text Container (Fills the Gap & Centers content) */}
            <div className="flex-1 flex justify-center items-center h-56">
              <div className="flex flex-col space-y-1">
                {memory.label.split('').map((char, i) => (
                  <motion.span 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    // Text Styling:
                    // - Large, Heavy Font
                    // - Neon Gradient (Pink to Purple)
                    // - Drop Shadow for 'Glow'
                    className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-300 to-purple-500 drop-shadow-[0_0_5px_rgba(236,72,153,0.8)] leading-none text-center"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>

          </motion.div>
        ))}
        
        <motion.button
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onComplete}
          className="w-full py-4 mt-12 bg-white text-black font-bold text-xl rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.4)]"
        >
          INITIALIZE PROTOCOL ❤️
        </motion.button>
      </div>
    </div>
  );
};

export default MemoryOrbit;