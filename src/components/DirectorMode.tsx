import React, { useState, useEffect } from 'react';
import { Camera, Eye, Video } from 'lucide-react';

interface DirectorModeProps {
  active: boolean;
  onToggle: () => void;
}

export const DirectorViewfinderOverlay: React.FC<{ active: boolean }> = ({ active }) => {
  const [timecode, setTimecode] = useState('00:00:00:00');
  const [audioLevel, setAudioLevel] = useState([65, 78]);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const f = String(Math.floor(now.getMilliseconds() / 40)).padStart(2, '0');
      setTimecode(`${h}:${m}:${s}:${f}`);

      setAudioLevel([
        Math.floor(50 + Math.random() * 45),
        Math.floor(45 + Math.random() * 50),
      ]);
    }, 100);

    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9980] border-[16px] md:border-[28px] border-black/40 font-mono select-none">
      {/* Corner Crop Marks */}
      <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-white/60" />
      <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-white/60" />
      <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-white/60" />
      <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-white/60" />

      {/* Center Focus Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white -translate-x-1/2" />
        <div className="absolute top-1/2 left-0 h-[1px] w-full bg-white -translate-y-1/2" />
        <div className="w-full h-full border border-white/60 rounded-full" />
      </div>

      {/* Rule of Thirds Gridlines */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-15">
        <div className="border-r border-b border-white" />
        <div className="border-r border-b border-white" />
        <div className="border-b border-white" />
        <div className="border-r border-b border-white" />
        <div className="border-r border-b border-white" />
        <div className="border-b border-white" />
        <div className="border-r border-white" />
        <div className="border-r border-white" />
        <div />
      </div>

      {/* Top HUD: REC, Battery, Resolution */}
      <div className="absolute top-6 left-8 right-8 flex justify-between items-center text-xs md:text-sm text-cream font-bold drop-shadow">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 bg-red-600/90 text-white px-2.5 py-0.5 rounded tracking-widest text-[11px] animate-pulse">
            <span className="w-2 h-2 rounded-full bg-white" />
            REC
          </span>
          <span className="text-white/80 tracking-wider">TC {timecode}</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-white/70">
          <span>4K UHD 60FPS</span>
          <span>10-BIT 4:2:2 LOG</span>
          <span>BAT 92% ▰▰▰▰</span>
        </div>
      </div>

      {/* Bottom HUD: Camera settings, Audio VU Meter */}
      <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end text-xs md:text-sm text-cream font-bold drop-shadow">
        <div className="flex items-center gap-4 text-[11px] text-white/80">
          <span className="bg-white/10 px-2 py-0.5 rounded">LUMIX GH5</span>
          <span>ISO 400</span>
          <span>1/120s</span>
          <span>f/2.8</span>
          <span>5600K</span>
        </div>

        {/* Audio VU Meter */}
        <div className="flex flex-col gap-1 w-32 bg-black/50 p-2 rounded border border-white/10">
          <div className="flex items-center gap-1.5 text-[9px] text-white/60">
            <span>CH1</span>
            <div className="h-1.5 flex-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 via-yellow-400 to-red-500 transition-all duration-75"
                style={{ width: `${audioLevel[0]}%` }}
              />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] text-white/60">
            <span>CH2</span>
            <div className="h-1.5 flex-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 via-yellow-400 to-red-500 transition-all duration-75"
                style={{ width: `${audioLevel[1]}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DirectorToggleButton: React.FC<DirectorModeProps> = ({ active, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed bottom-6 right-6 z-[9990] flex items-center gap-2.5 px-4 py-2.5 rounded-full font-mono text-xs font-bold transition-all duration-300 shadow-2xl border backdrop-blur-md ${
        active
          ? 'bg-red-600/90 text-white border-red-400 shadow-red-900/50 scale-105'
          : 'bg-walnut/90 text-cream border-cream-gold/40 hover:bg-cream hover:text-espresso hover:border-cream'
      }`}
      title="Bật/Tắt chế độ Ống ngắm Máy quay Điện ảnh (Director Viewfinder)"
    >
      <Video className={`w-3.5 h-3.5 ${active ? 'animate-pulse' : ''}`} />
      <span>{active ? 'DIRECTOR MODE: ON' : 'DIRECTOR VIEW'}</span>
    </button>
  );
};
