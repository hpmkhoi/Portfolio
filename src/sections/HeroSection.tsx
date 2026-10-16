import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import OutlinedTitle from '../components/OutlinedTitle';
import { RedlineNote } from '../components/ArchitecturalMarkup';
import InteractiveSearch from '../components/InteractiveSearch';
import DecryptedText from '../components/react-bits/DecryptedText';
import SpotlightCard from '../components/react-bits/SpotlightCard';

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] pt-28 pb-16 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-between overflow-hidden">

      {/* Ambient glow behind hero typography for dramatic catchiness */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#DFC9A6]/10 blur-[130px] pointer-events-none -z-10" />

      {/* Top Drafting Metadata Bar with Official UEH Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-center justify-between font-mono text-[10px] tracking-[0.25em] uppercase text-[#AFA59A] border-b border-[#DFC9A6]/20 pb-4 gap-3 select-none"
      >
        <div className="flex items-center gap-3">
          <span className="text-[#EC633D] font-bold">● SCALE 1:1</span>
          <span className="text-white/40">//</span>
          <div className="flex items-center gap-2 bg-white/95 px-2.5 py-1 rounded-md border border-black/10 shadow-sm">
            <img src="/ueh-logo.png" alt="UEH Logo" className="h-4 sm:h-5 w-auto object-contain" />
            <span className="font-mono text-[9px] text-[#005F69] font-black tracking-wider">TIẾNG ANH THƯƠNG MẠI</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[#AFA59A]">
          <span>COORDINATES [ 10.7769° N, 106.7009° E ]</span>
          <span className="text-[#DFC9A6] font-bold">HO CHI MINH CITY</span>
        </div>
      </motion.div>

      {/* Main Hero Staging: Left Typography + Right Portrait */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-6 lg:my-10 relative z-10">

        {/* Left: Punchy, Cohesive Monumental Headline (Tightened & Eye-Catching) */}
        <div className="lg:col-span-7 flex flex-col gap-3">

          {/* Eyebrow badge + Redline Callout */}
          <div className="flex items-center gap-3 flex-wrap mb-1">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-[#2A1F18] border border-[#DFC9A6]/40 text-[#DFC9A6] font-bold shadow-sm">
              ✦ HỒ SƠ THỰC TẬP SINH 2026
            </span>
            <RedlineNote rotate="-rotate-1">
              "I can make it happen"
            </RedlineNote>
          </div>

          {/* Monumental Name Lockup: Generous overflow clearance, no outline clipping */}
          <div className="flex flex-col gap-0.5 sm:gap-1 select-none overflow-visible">
            <div className="overflow-visible">
              <OutlinedTitle
                text="MINH"
                className="text-[14vw] sm:text-[11vw] md:text-[9.5vw] lg:text-[8vw] drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
              />
            </div>
            <div className="overflow-visible -mt-1 sm:-mt-2">
              <OutlinedTitle
                text="KHÔI"
                accentText="portfolio"
                className="text-[14vw] sm:text-[11vw] md:text-[9.5vw] lg:text-[8vw] drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>

          {/* Subtitle Bio in Illoca's refined Swiss styling */}
          <p className="text-sm sm:text-base text-[#F6F1E7]/85 font-light leading-relaxed max-w-xl mt-1">
            Em là <strong className="font-semibold text-[#F6F1E7]">Huỳnh Phạm Minh Khôi</strong>, sinh viên năm hai{' '}
            <strong className="text-[#DFC9A6]">ĐH Kinh Tế TP.HCM (UEH)</strong>. Với tư duy Art Direction điện ảnh,
            em trực tiếp đảm nhận từ lên ý tưởng, bấm máy hiện trường đến hậu kỳ Match Cut và tối ưu hóa bằng{' '}
            <span className="text-[#EC633D] font-mono text-xs font-bold">[ AI WORKFLOW ]</span>.
          </p>

          {/* Interactive Search + Quick Jump */}
          <div className="mt-2 max-w-md">
            <InteractiveSearch />
          </div>
        </div>

        {/* Right: Real Portrait Poster wrapped in React Bits SpotlightCard */}
        <div className="lg:col-span-5 flex justify-center relative">
          <SpotlightCard
            className="w-full max-w-sm rounded-2xl p-2 bg-[#211813] border border-[#DFC9A6]/30 shadow-[8px_8px_0px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1"
            spotlightColor="rgba(223, 201, 166, 0.2)"
          >
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-black">
              <motion.img
                style={{ y: imgY, scale: imgScale }}
                src="/khoi-portrait.jpg"
                alt="Minh Khôi Portrait"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140F0B]/85 via-transparent to-transparent pointer-events-none" />

              {/* Redline badge overlay */}
              <div className="absolute top-3 left-3 bg-[#EC633D] text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded shadow">
                SAIGON HOTPOT // CREATIVE
              </div>
            </div>

            {/* Bottom Caption Pill */}
            <div className="p-3 flex items-center justify-between font-mono text-[10px] text-[#AFA59A]">
              <div>
                <span className="text-[#F6F1E7] font-bold block">HUỲNH PHẠM MINH KHÔI</span>
                <span>UEH BUSINESS ENGLISH</span>
              </div>
              <div className="text-right">
                <span className="text-[#DFC9A6] font-bold block">GPA 3.5 / 4.0</span>
                <span>IELTS 7.0</span>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>

      {/* Bottom Illoca Index Ribbon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#DFC9A6]/20 font-mono"
      >
        <div className="p-3 rounded-lg bg-[#2A1F18]/50 border border-white/5">
          <div className="text-2xl sm:text-3xl font-display font-black text-[#F6F1E7]">570K+</div>
          <div className="text-[10px] text-[#AFA59A] uppercase tracking-wider mt-0.5">Views Video Đầu Tiên</div>
        </div>
        <div className="p-3 rounded-lg bg-[#2A1F18]/50 border border-white/5">
          <div className="text-2xl sm:text-3xl font-display font-black text-[#F6F1E7]">100K+</div>
          <div className="text-[10px] text-[#AFA59A] uppercase tracking-wider mt-0.5">5 Video Kế Tiếp</div>
        </div>
        <div className="p-3 rounded-lg bg-[#2A1F18]/50 border border-white/5">
          <div className="text-2xl sm:text-3xl font-display font-black text-[#DFC9A6]">+3.3K</div>
          <div className="text-[10px] text-[#AFA59A] uppercase tracking-wider mt-0.5">Followers / 3 Tuần</div>
        </div>
        <div className="p-3 rounded-lg bg-[#2A1F18]/50 border border-white/5">
          <div className="text-2xl sm:text-3xl font-display font-black text-[#EC633D]">9.000+</div>
          <div className="text-[10px] text-[#AFA59A] uppercase tracking-wider mt-0.5">Views Chiến Dịch SGHP</div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
