import React from 'react';
import { motion } from 'framer-motion';

const DraggableStickers: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      {/* 1. "intern" Polaroid Sticker */}
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 1000, top: -50, bottom: 800 }}
        dragElastic={0.2}
        whileHover={{ scale: 1.08, rotate: -2, cursor: 'grab' }}
        whileDrag={{ scale: 1.15, rotate: 6, cursor: 'grabbing', zIndex: 60 }}
        initial={{ x: 60, y: 340, rotate: -5 }}
        className="pointer-events-auto absolute bg-cream text-burgundy font-display font-black text-xs md:text-sm px-3.5 py-1.5 rounded-lg border-2 border-cream-gold shadow-2xl cursor-grab uppercase tracking-wider hidden sm:block"
      >
        <span>✦ INTERN 2026</span>
        <div className="text-[8px] font-mono font-normal opacity-70">drag me!</div>
      </motion.div>

      {/* 2. Vintage Camera Sticker */}
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 1000, top: -50, bottom: 800 }}
        dragElastic={0.2}
        whileHover={{ scale: 1.1, rotate: 4, cursor: 'grab' }}
        whileDrag={{ scale: 1.2, rotate: -8, cursor: 'grabbing', zIndex: 60 }}
        initial={{ x: 280, y: 560, rotate: 8 }}
        className="pointer-events-auto absolute p-3 rounded-2xl bg-walnut/90 border border-cream-gold/40 shadow-2xl backdrop-blur-md cursor-grab flex items-center gap-2.5 hidden lg:flex"
      >
        <span className="text-xl">📷</span>
        <div className="text-left font-mono text-[10px] text-cream leading-tight">
          <div className="font-bold text-cream-gold">LUMIX GH5</div>
          <div className="text-white/60">4K 10-Bit Cinematic</div>
        </div>
      </motion.div>

      {/* 3. UEH Pill Badge */}
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 1000, top: -50, bottom: 800 }}
        dragElastic={0.2}
        whileHover={{ scale: 1.08, rotate: -3, cursor: 'grab' }}
        whileDrag={{ scale: 1.15, rotate: 4, cursor: 'grabbing', zIndex: 60 }}
        initial={{ x: 80, y: 680, rotate: 3 }}
        className="pointer-events-auto absolute bg-[#005F69] text-white px-3 py-1.5 rounded-full font-mono text-[10px] font-bold border border-white/20 shadow-xl cursor-grab flex items-center gap-2 hidden md:flex"
      >
        <span className="w-2 h-2 rounded-full bg-[#F26F33]" />
        <span>UEH // TIẾNG ANH THƯƠNG MẠI</span>
      </motion.div>

      {/* 4. Film Strip Motif */}
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 1000, top: -50, bottom: 800 }}
        dragElastic={0.2}
        whileHover={{ scale: 1.08, rotate: 2, cursor: 'grab' }}
        whileDrag={{ scale: 1.15, rotate: -5, cursor: 'grabbing', zIndex: 60 }}
        initial={{ x: 920, y: 160, rotate: -4 }}
        className="pointer-events-auto absolute bg-black/80 text-cream px-3 py-1 rounded border border-white/20 font-mono text-[10px] shadow-xl cursor-grab hidden xl:block"
      >
        <span>🎞️ 35MM GRAIN // MATCH CUT</span>
      </motion.div>
    </div>
  );
};

export default DraggableStickers;
