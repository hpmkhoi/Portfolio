import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { RollingLink } from './ArchitecturalMarkup';

interface NavbarProps {
  onToggleDirector?: () => void;
  isDirectorActive?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleDirector, isDirectorActive }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Illoca Floating Pill Navigation Bar */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94vw] max-w-5xl h-14 rounded-full bg-[#1A140F]/85 backdrop-blur-xl border border-[#DFC9A6]/30 px-4 sm:px-5 flex items-center justify-between shadow-[4px_4px_0px_rgba(0,0,0,0.4)]">
        {/* Brand / Status + UEH Logo */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 group">
          <span className="w-2 h-2 rounded-full bg-[#EC633D] animate-pulse shadow-[0_0_8px_#EC633D]" />
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-xs sm:text-sm tracking-tight text-[#F6F1E7] group-hover:text-[#DFC9A6] transition-colors">
              MINH KHÔI
            </span>
            <div className="hidden sm:flex items-center bg-white/90 px-2 py-0.5 rounded-full border border-black/10">
              <img src="/ueh-logo.png" alt="UEH University Logo" className="h-4 w-auto object-contain" />
            </div>
          </div>
        </a>

        {/* Center: Rolling Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-[11px] uppercase tracking-wider">
          <RollingLink href="#about" label="00 // About" />
          <RollingLink href="#veloth" label="01 // Veloth" />
          <RollingLink href="#sghp" label="02 // SG Hotpot" />
          <RollingLink href="#ptha" label="03 // Phỉ Thúy" />
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {onToggleDirector && (
            <button
              onClick={onToggleDirector}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] font-bold tracking-wider transition-all duration-300 border ${
                isDirectorActive
                  ? 'bg-[#EC633D] text-white border-[#EC633D] animate-pulse shadow-[0_0_12px_#EC633D]'
                  : 'bg-[#2A1F18] text-[#DFC9A6] border-[#DFC9A6]/30 hover:border-[#DFC9A6]'
              }`}
            >
              <span>●</span>
              <span>{isDirectorActive ? 'REC ON' : 'REC VIEW'}</span>
            </button>
          )}

          <a
            href="/cv-huynh-pham-minh-khoi.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center h-8 px-3 rounded-full bg-[#DFC9A6] text-[#140F0B] font-mono text-[10px] font-black tracking-wider uppercase shadow-[2px_2px_0px_rgba(0,0,0,0.3)] hover:bg-[#F6F1E7] transition-all"
          >
            <span>CV (PDF)</span>
          </a>

          <a
            href="#contact"
            className="group relative inline-flex items-center h-8 px-3.5 rounded-full bg-[#283F7D] text-[#FFFBF3] font-mono text-[11px] font-bold tracking-wider uppercase overflow-hidden shadow-[2px_2px_0px_rgba(0,0,0,0.4)] hover:bg-[#3B60C5] transition-colors"
          >
            <span>Tuyển Dụng</span>
            <ArrowUpRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#F6F1E7] p-1 focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-x-4 top-20 z-50 md:hidden rounded-2xl bg-[#1A140F]/95 backdrop-blur-2xl border border-[#DFC9A6]/30 p-6 flex flex-col gap-4 font-mono text-xs uppercase tracking-widest shadow-2xl animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-[#DFC9A6]">UEH TIẾNG ANH THƯƠNG MẠI</span>
            <img src="/ueh-logo.png" alt="UEH Logo" className="h-5 w-auto object-contain bg-white/90 px-1.5 py-0.5 rounded" />
          </div>
          <a
            href="#about"
            onClick={() => setMobileOpen(false)}
            className="py-2 border-b border-white/10 text-[#F6F1E7] hover:text-[#DFC9A6]"
          >
            00 // Giới Thiệu &amp; AI
          </a>
          <a
            href="#veloth"
            onClick={() => setMobileOpen(false)}
            className="py-2 border-b border-white/10 text-[#F6F1E7] hover:text-[#DFC9A6]"
          >
            01 // Veloth.clo Spec Ads
          </a>
          <a
            href="#sghp"
            onClick={() => setMobileOpen(false)}
            className="py-2 border-b border-white/10 text-[#F6F1E7] hover:text-[#DFC9A6]"
          >
            02 // Saigon Hotpot (SGHP)
          </a>
          <a
            href="#ptha"
            onClick={() => setMobileOpen(false)}
            className="py-2 border-b border-white/10 text-[#F6F1E7] hover:text-[#DFC9A6]"
          >
            03 // Phỉ Thúy Hồng Anh
          </a>
          <a
            href="/cv-huynh-pham-minh-khoi.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="py-2 border-b border-white/10 text-[#DFC9A6] font-bold flex items-center justify-between"
          >
            <span>📄 Xem CV Cá Nhân (PDF)</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="py-2 text-[#EC633D] font-bold flex items-center justify-between"
          >
            <span>Liên Hệ Tuyển Dụng</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;
