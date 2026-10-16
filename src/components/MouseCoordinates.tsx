import React, { useState, useEffect } from 'react';

const MouseCoordinates: React.FC = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="fixed top-24 left-6 md:left-10 z-40 hidden lg:flex flex-col font-mono text-[10px] tracking-widest text-[#AFA59A]/80 pointer-events-none select-none tabular-nums border-l border-[#DFC9A6]/30 pl-3">
      <div className="flex items-center gap-2">
        <span className="text-[#DFC9A6] font-bold">X</span>
        <span>{coords.x.toFixed(2)}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[#DFC9A6] font-bold">Y</span>
        <span>{coords.y.toFixed(2)}</span>
      </div>
      <div className="text-[8px] text-[#AFA59A]/50 mt-1 uppercase tracking-wider">
        VIEWPORT HUD // 16PX GRID
      </div>
    </div>
  );
};

export default MouseCoordinates;
