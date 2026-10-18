import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { RollingLink } from './ArchitecturalMarkup';
import { useScrollVelocity } from './SmoothScroll';

interface NavbarProps {
  onToggleDirector?: () => void;
  isDirectorActive?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleDirector, isDirectorActive }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const { lenis } = useScrollVelocity();

  // Scroll smoothly to anchor target with top navbar offset
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setMobileOpen(false);

    if (hash === '#' || hash === '') {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const targetEl = document.querySelector(hash);
    if (targetEl) {
      if (lenis) {
        lenis.scrollTo(targetEl as HTMLElement, { offset: -90, duration: 1.2 });
      } else {
        const top = (targetEl as HTMLElement).getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = ['about', 'veloth', 'sghp', 'ptha', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Illoca Floating Pill Navigation Bar */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94vw] max-w-5xl h-14 rounded-full bg-[#1A140F]/90 backdrop-blur-xl border border-[#DFC9A6]/30 px-4 sm:px-5 flex items-center justify-between shadow-[4px_4px_0px_rgba(0,0,0,0.4)] select-none">
        {/* Brand / Status + UEH Logo */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, '#')}
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
          title="Về đầu trang"
        >
          <span className="w-2 h-2 rounded-full bg-[#EC633D] animate-pulse shadow-[0_0_8px_#EC633D]" />
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-xs sm:text-sm tracking-tight text-[#F6F1E7] group-hover:text-[#DFC9A6] transition-colors whitespace-nowrap">
              MINH KHÔI
            </span>
            <div className="hidden lg:flex items-center bg-white/90 px-2 py-0.5 rounded-full border border-black/10 shrink-0">
              <img src="/ueh-logo.png" alt="UEH University Logo" className="h-4 w-auto object-contain" />
            </div>
          </div>
        </a>

        {/* Center: Rolling Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 font-mono text-[11px] uppercase tracking-wider shrink-0">
          <RollingLink
            href="#about"
            label="00 // About"
            active={activeSection === 'about'}
            onClick={(e) => handleNavClick(e, '#about')}
          />
          <RollingLink
            href="#veloth"
            label="01 // Veloth"
            active={activeSection === 'veloth'}
            onClick={(e) => handleNavClick(e, '#veloth')}
          />
          <RollingLink
            href="#sghp"
            label="02 // SG Hotpot"
            active={activeSection === 'sghp'}
            onClick={(e) => handleNavClick(e, '#sghp')}
          />
          <RollingLink
            href="#ptha"
            label="03 // Phỉ Thúy"
            active={activeSection === 'ptha'}
            onClick={(e) => handleNavClick(e, '#ptha')}
          />
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {onToggleDirector && (
            <button
              onClick={onToggleDirector}
              className={`hidden xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] font-bold tracking-wider transition-all duration-300 border shrink-0 ${
                isDirectorActive
                  ? 'bg-[#EC633D] text-white border-[#EC633D] animate-pulse shadow-[0_0_12px_#EC633D]'
                  : 'bg-[#2A1F18] text-[#DFC9A6] border-[#DFC9A6]/30 hover:border-[#DFC9A6]'
              }`}
              title="Chế độ Ống ngắm Máy quay Điện ảnh"
            >
              <span>●</span>
              <span>{isDirectorActive ? 'REC ON' : 'REC VIEW'}</span>
            </button>
          )}

          <a
            href="/cv-huynh-pham-minh-khoi.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center h-8 px-3 rounded-full bg-[#DFC9A6] text-[#140F0B] font-mono text-[10px] font-black tracking-wider uppercase shadow-[2px_2px_0px_rgba(0,0,0,0.3)] hover:bg-[#F6F1E7] transition-all shrink-0"
          >
            <span>CV (PDF)</span>
          </a>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="group relative inline-flex items-center h-8 px-3.5 rounded-full bg-[#283F7D] text-[#FFFBF3] font-mono text-[11px] font-bold tracking-wider uppercase overflow-hidden shadow-[2px_2px_0px_rgba(0,0,0,0.4)] hover:bg-[#3B60C5] transition-colors shrink-0"
          >
            <span>Tuyển Dụng</span>
            <ArrowUpRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#F6F1E7] p-1.5 focus:outline-none hover:text-[#DFC9A6] transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Backdrop & Drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-x-4 top-20 z-50 md:hidden rounded-2xl bg-[#1A140F]/95 backdrop-blur-2xl border border-[#DFC9A6]/30 p-6 flex flex-col gap-3 font-mono text-xs uppercase tracking-widest shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[#DFC9A6] text-[11px] font-bold">UEH TIẾNG ANH THƯƠNG MẠI</span>
              <img src="/ueh-logo.png" alt="UEH Logo" className="h-5 w-auto object-contain bg-white/90 px-1.5 py-0.5 rounded" />
            </div>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
              className={`py-2.5 border-b border-white/10 transition-colors flex items-center justify-between ${
                activeSection === 'about' ? 'text-[#DFC9A6] font-bold' : 'text-[#F6F1E7] hover:text-[#DFC9A6]'
              }`}
            >
              <span>00 // Giới Thiệu &amp; AI</span>
              <span className="text-[10px] text-[#AFA59A]">UEH / WORKFLOW</span>
            </a>
            <a
              href="#veloth"
              onClick={(e) => handleNavClick(e, '#veloth')}
              className={`py-2.5 border-b border-white/10 transition-colors flex items-center justify-between ${
                activeSection === 'veloth' ? 'text-[#DFC9A6] font-bold' : 'text-[#F6F1E7] hover:text-[#DFC9A6]'
              }`}
            >
              <span>01 // Veloth.clo Spec Ads</span>
              <span className="text-[10px] text-[#AFA59A]">DIRECTOR / EDIT</span>
            </a>
            <a
              href="#sghp"
              onClick={(e) => handleNavClick(e, '#sghp')}
              className={`py-2.5 border-b border-white/10 transition-colors flex items-center justify-between ${
                activeSection === 'sghp' ? 'text-[#DFC9A6] font-bold' : 'text-[#F6F1E7] hover:text-[#DFC9A6]'
              }`}
            >
              <span>02 // Saigon Hotpot (SGHP)</span>
              <span className="text-[10px] text-[#AFA59A]">TIKTOK TEAM</span>
            </a>
            <a
              href="#ptha"
              onClick={(e) => handleNavClick(e, '#ptha')}
              className={`py-2.5 border-b border-white/10 transition-colors flex items-center justify-between ${
                activeSection === 'ptha' ? 'text-[#DFC9A6] font-bold' : 'text-[#F6F1E7] hover:text-[#DFC9A6]'
              }`}
            >
              <span>03 // Phỉ Thúy Hồng Anh</span>
              <span className="text-[10px] text-[#AFA59A]">SHORT DRAMA</span>
            </a>
            <a
              href="/cv-huynh-pham-minh-khoi.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="py-2.5 border-b border-white/10 text-[#DFC9A6] font-bold flex items-center justify-between"
            >
              <span>📄 Xem CV Cá Nhân (PDF)</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="py-2.5 text-[#EC633D] font-bold flex items-center justify-between"
            >
              <span>Liên Hệ Tuyển Dụng</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
