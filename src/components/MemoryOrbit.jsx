import React from 'react';
import { motion } from 'framer-motion';


const MEMORIES = [
  { id: 1, img: "/WhatsApp Image 2026-02-11 at 20.13.50.jpeg", title: "The Beginning", date: "Phase 1" },
  { id: 2, img: "/WhatsApp Image 2026-02-11 at 20.13.52.jpeg", title: "The Chaos", date: "Phase 2" },
  { id: 3, img: "/WhatsApp Image 2026-02-11 at 20.13.55.jpeg", title: "The Forever", date: "Phase 3" },
];

const MemoryOrbit = ({ onComplete }) => {
  return (
    <div className="relative z-10 w-full h-full flex flex-col items-center pt-10 pb-20 overflow-y-scroll no-scrollbar scroll-smooth">
      <motion.h2 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="text-2xl text-white font-light tracking-widest mb-10 sticky top-5 z-50 mix-blend-difference"
      >
        ARCHIVES
      </motion.h2>

      <div className="space-y-24 w-full px-6 pb-32">
        {MEMORIES.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, rotateY: 90 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, type: "spring" }}
            className={`flex flex-col ${index % 2 === 0 ? 'items-start' : 'items-end'}`}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative p-1 bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img 
                  src={memory.img} 
                  alt={memory.title} 
                  className="w-48 h-64 object-cover rounded-xl filter grayscale group-hover:grayscale-0 transition-all duration-500" 
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <p className="text-white font-bold text-lg">{memory.title}</p>
                  <p className="text-pink-400 text-xs font-mono">{memory.date}</p>
                </div>
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