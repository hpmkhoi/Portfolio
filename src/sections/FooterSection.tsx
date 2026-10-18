import React, { useState } from 'react';
import OutlinedTitle from '../components/OutlinedTitle';
import { RedlineNote, ArchitectCTA } from '../components/ArchitecturalMarkup';
import { Mail, Phone, Copy, Check, FileText } from 'lucide-react';

const FooterSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hpmkhoi2007@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <footer id="contact" className="relative z-10 pt-28 pb-16 bg-[#0E0A07] border-t border-[#DFC9A6]/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Top Eyebrow */}
        <div className="flex items-center justify-between mb-6 font-mono text-[10px] tracking-[0.25em] uppercase text-[#AFA59A]">
          <span>04 // CONTACT SPECIFICATION</span>
          <span className="text-[#EC633D]">AVAILABLE FOR INTERNSHIP 2026</span>
        </div>

        {/* Giant Illoca Call-To-Action Title */}
        <div className="mb-12">
          <OutlinedTitle text="LET'S WORK" accentText="together." className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl" />
          <div className="mt-3">
            <RedlineNote rotate="-rotate-1">
              "Sẵn sàng bứt phá mục tiêu cùng đội ngũ của bạn"
            </RedlineNote>
          </div>
        </div>

        {/* Contact Action Pills & Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-20">
          <a
            href="mailto:hpmkhoi2007@gmail.com"
            className="group flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#211813] border border-[#DFC9A6]/30 hover:border-[#DFC9A6] text-[#F6F1E7] font-mono text-xs sm:text-sm tracking-wider shadow-[4px_4px_0px_rgba(0,0,0,0.4)] transition-all duration-200"
          >
            <Mail className="w-4 h-4 text-[#DFC9A6] group-hover:scale-110 transition-transform" />
            <span>hpmkhoi2007@gmail.com</span>
          </a>

          <a
            href="tel:0934677709"
            className="group flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#211813] border border-[#DFC9A6]/30 hover:border-[#DFC9A6] text-[#F6F1E7] font-mono text-xs sm:text-sm tracking-wider shadow-[4px_4px_0px_rgba(0,0,0,0.4)] transition-all duration-200"
          >
            <Phone className="w-4 h-4 text-[#DFC9A6] group-hover:scale-110 transition-transform" />
            <span>0934 677 709</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#DFC9A6] text-[#140F0B] font-mono text-xs sm:text-sm font-bold tracking-wider shadow-[4px_4px_0px_rgba(0,0,0,0.4)] hover:bg-[#F6F1E7] transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-700" />
                <span>Đã Copy Email!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Email Nhanh</span>
              </>
            )}
          </button>

          <a
            href="/cv-huynh-pham-minh-khoi.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#283F7D] hover:bg-[#3B60C5] text-white font-mono text-xs sm:text-sm font-bold tracking-wider shadow-[4px_4px_0px_rgba(0,0,0,0.4)] transition-all duration-200"
          >
            <FileText className="w-4 h-4 text-[#DFC9A6] group-hover:scale-110 transition-transform" />
            <span>Tải / Xem CV Cá Nhân (PDF)</span>
          </a>
        </div>

        {/* Illoca Giant Debossed Brand Mark at the very bottom */}
        <div className="overflow-hidden select-none opacity-20 hover:opacity-35 transition-opacity text-center my-8">
          <div className="font-display font-black text-[13vw] leading-none tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px #DFC9A6' }}>
            MINH KHÔI
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-8 border-t border-white/10 font-mono text-[10px] text-[#AFA59A] gap-4">
          <div>
            © 2026 HUỲNH PHẠM MINH KHÔI — CREATIVE &amp; CONTENT INTERN.
          </div>
          <div className="flex items-center gap-4">
            <span>UEH BUSINESS ENGLISH</span>
            <span>·</span>
            <span>DESIGN INFLUENCED BY ILLOCA</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterSection;
