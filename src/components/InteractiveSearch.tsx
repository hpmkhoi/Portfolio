import React, { useState } from 'react';
import { Search, X, Sparkles, ArrowUpRight } from 'lucide-react';

interface SearchOption {
  label: string;
  sub: string;
  targetId: string;
}

const searchOptions: SearchOption[] = [
  { label: '01. Veloth.clo (Spec Ads)', sub: 'Lead Producer, Videographer, Editor — Break the Matrix', targetId: 'veloth' },
  { label: '02. Saigon Hotpot (SGHP)', sub: 'Chiến dịch Merch 2025 & TikTok Entertain/Inform', targetId: 'sghp' },
  { label: '03. Thế Giới Phỉ Thúy', sub: 'Viral 570K+ views, 5 video 100K+, Storyboard Affiliate', targetId: 'ptha' },
  { label: '04. Học Vấn & Năng Lực AI', sub: 'ĐH Kinh Tế TP.HCM (UEH) — GPA 3.5, IELTS 7.0, AI Tools', targetId: 'about' },
  { label: '05. Tuyển Dụng & Liên Hệ', sub: 'Email hpmkhoi2007@gmail.com, SĐT 0934 677 709', targetId: 'contact' },
];

const InteractiveSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = searchOptions.filter(
    (opt) =>
      opt.label.toLowerCase().includes(query.toLowerCase()) ||
      opt.sub.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (targetId: string) => {
    setIsOpen(false);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative inline-block w-full max-w-md z-40">
      {/* Search pill bar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-cream text-espresso border-2 border-cream-gold shadow-xl cursor-pointer transition-all duration-300 hover:shadow-cream-gold/20 hover:-translate-y-0.5"
      >
        <div className="flex items-center gap-2.5 font-display font-extrabold text-xs sm:text-sm tracking-tight text-burgundy">
          <Search className="w-4 h-4 text-burgundy transition-transform group-hover:scale-110" />
          <span>HUỲNH PHẠM MINH KHÔI</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-espresso/60 font-semibold">
          <span className="hidden sm:inline bg-walnut/10 px-2 py-0.5 rounded">QUICK JUMP ↵</span>
          <X className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-mocha/95 border border-cream-gold/40 rounded-2xl shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="mb-2 px-1">
            <input
              type="text"
              autoFocus
              placeholder="Gõ để tìm kiếm dự án, kỹ năng..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-walnut/60 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-cream placeholder-white/40 focus:outline-none focus:border-cream-gold"
            />
          </div>

          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
            {filtered.map((item) => (
              <button
                key={item.targetId}
                onClick={() => handleSelect(item.targetId)}
                className="flex items-start justify-between p-2.5 rounded-xl text-left transition-colors duration-150 hover:bg-cream hover:text-espresso group"
              >
                <div>
                  <div className="font-display font-bold text-xs text-cream group-hover:text-espresso flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-cream-gold group-hover:text-espresso" />
                    <span>{item.label}</span>
                  </div>
                  <div className="font-sans text-[11px] text-white/60 group-hover:text-espresso/80 mt-0.5">
                    {item.sub}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-cream-gold group-hover:text-espresso shrink-0 mt-1" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveSearch;
