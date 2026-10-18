import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import OutlinedTitle from '../components/OutlinedTitle';
import { FolderTab, RedlineNote } from '../components/ArchitecturalMarkup';
import { ArrowUpRight, Play, Maximize2, Camera, Scissors, Sparkles, UserCheck, Flame, Layers, CheckCircle2 } from 'lucide-react';
import SpotlightCard from '../components/react-bits/SpotlightCard';
import ShinyText from '../components/react-bits/ShinyText';

/* Parallax Frame */
const ParallaxFrame: React.FC<{
  src: string;
  alt: string;
  aspect?: string;
  caption?: string;
  className?: string;
}> = ({ src, alt, aspect = 'aspect-[4/5]', caption, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl bg-[#1A140F] border border-[#DFC9A6]/30 shadow-[6px_6px_0px_rgba(0,0,0,0.5)] ${aspect} ${className}`}
    >
      <motion.img
        style={{ y }}
        src={src}
        alt={alt}
        className="w-full h-full object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      {caption && (
        <div className="absolute bottom-3 left-3 right-3 font-mono text-[10px] tracking-wider uppercase text-[#F6F1E7] bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
          {caption}
        </div>
      )}
    </div>
  );
};

/* TikTok Video Data */
interface TikTokCard {
  id: string;
  category: 'ENTERTAIN' | 'INFORM';
  badgeLabel: string;
  badgeClass: string;
  title: string;
  views: string;
  desc: string;
  url: string;
}

const tiktokVideos: TikTokCard[] = [
  {
    id: '1',
    category: 'ENTERTAIN',
    badgeLabel: '● CONTENT: ENTERTAIN (TƯƠNG TÁC PHỎNG VẤN)',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
    title: '#01. Video Phỏng Vấn Vui Nhộn Saigon Hotpot',
    views: '7,094+ Views',
    desc: 'Content Entertain — thu hút lượt xem tự nhiên qua tình huống phỏng vấn gần gũi sinh viên. Khôi trực tiếp lên ý tưởng, cầm máy quay và dựng hậu kỳ.',
    url: 'https://www.tiktok.com/@saigonhotpot1111/video/7687616000430247188',
  },
  {
    id: '2',
    category: 'ENTERTAIN',
    badgeLabel: '● CONTENT: ENTERTAIN (HẬU TRƯỜNG STORYTELLING)',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
    title: '#02. "Hành Trình Làm Merch Của Saigon Hotpot"',
    views: '1,031+ Views',
    desc: 'Content Entertain — kể chuyện hậu trường chuẩn bị bộ Merch theo nhịp điệu hài hước, trẻ trung, bám sát insight Gen Z.',
    url: 'https://www.tiktok.com/@saigonhotpot1111/video/7687224524495965460',
  },
  {
    id: '3',
    category: 'INFORM',
    badgeLabel: '▲ CONTENT: INFORM (MỞ ĐƠN PRE-ORDER)',
    badgeClass: 'bg-[#DFC9A6]/15 text-[#DFC9A6] border-[#DFC9A6]/40',
    title: '#03. "Đừng Bỏ Lỡ Cuộc Gọi Từ Merchandise SGHP"',
    views: '766+ Views',
    desc: 'Content Inform — thông báo mở đơn đặt trước và giới thiệu chi tiết sản phẩm kết hợp hiệu ứng giao diện cuộc gọi điện thoại sáng tạo.',
    url: 'https://www.tiktok.com/@saigonhotpot1111/video/7676824640672566536',
  },
  {
    id: '4',
    category: 'INFORM',
    badgeLabel: '▲ CONTENT: INFORM (TEASER & TIMELINE)',
    badgeClass: 'bg-[#DFC9A6]/15 text-[#DFC9A6] border-[#DFC9A6]/40',
    title: '#04. Teaser "Get Ready For The Vibe — Merch \'25"',
    views: 'Teaser Video',
    desc: 'Content Inform — cung cấp thông tin thời gian mở bán chính thức (Opening Order 12/12) và định hình nhận diện năng động cho chiến dịch.',
    url: 'https://www.tiktok.com/@saigonhotpot1111/video/7625655739796933909',
  },
];

const CaseStudiesSection: React.FC = () => {
  const [tiktokFilter, setTiktokFilter] = useState<'ALL' | 'ENTERTAIN' | 'INFORM'>('ALL');
  const [activeVelothLook, setActiveVelothLook] = useState<number>(0);

  const velothLooks = [
    {
      id: 0,
      title: 'LOOK #01 // BREAK THE MATRIX',
      tag: 'PORTRAIT // HERO LOOK',
      format: 'Ảnh Dọc (Portrait 4:5)',
      src: '/veloth-1.png',
      desc: 'Flash ngược sáng, chủ thể trung tâm bứt phá khuôn mẫu thực tại. Nhịp cắt Match Cut 0.5s–2s dẫn dắt cảm xúc.',
    },
    {
      id: 1,
      title: 'LOOK #02 // VELOTH#01 POLO DETAIL',
      tag: 'LANDSCAPE // MACRO ZOOM',
      format: 'Ảnh Ngang (Landscape 16:9)',
      src: '/veloth-2.png',
      desc: 'Chi tiết logo kim loại dập nổi ngực áo, hiệu ứng quang sai màu sắc chromatic aberration và đường dẫn callout kỹ thuật.',
    },
    {
      id: 2,
      title: 'LOOK #03 // VELOTH#02 OVERSHIRT',
      tag: 'LANDSCAPE // ARCHITECTURAL',
      format: 'Ảnh Ngang (Landscape 16:9)',
      src: '/veloth-3.png',
      desc: 'Áo khoác sơ mi đen washed kết hợp bố cục watermark kiến trúc đường phố Quận 1.',
    },
  ];

  const filteredTikToks = tiktokVideos.filter(
    (v) => tiktokFilter === 'ALL' || v.category === tiktokFilter
  );

  return (
    <section className="relative z-10 py-16 px-6 md:px-12 max-w-7xl mx-auto">

      {/* =========================================================================
          CASE STUDY 01: VELOTH.CLO (SPEC ADS STREETWEAR)
          ========================================================================= */}
      <article id="veloth" className="mb-28 md:mb-40 pt-12">
        {/* Illoca Folder Tab */}
        <div className="flex items-center justify-between mb-4">
          <FolderTab index="01" label="SPEC ADS PROJECT BRIEF" color="#EC633D" />
          <span className="font-mono text-[10px] tracking-widest text-[#AFA59A] uppercase hidden sm:block">
            STREETWEAR CINEMATIC TVC // 2026
          </span>
        </div>

        {/* Title */}
        <div className="mb-8">
          <OutlinedTitle text="VELOTH.CLO" accentText="spec ads" className="text-4xl sm:text-6xl md:text-7xl" />
          <div className="mt-2 flex items-center gap-3">
            <RedlineNote rotate="-rotate-1">
              "Break the matrix" — Ngôn ngữ thị giác điện ảnh tương phản mạnh
            </RedlineNote>
          </div>
        </div>

        <div className="illoca-divider mb-12" />

        {/* BRAND IDENTITY BANNER — Huge Chrome Gothic Veloth Logo (Scaled Up & Cropped Tight) */}
        <SpotlightCard
          className="p-6 md:p-8 rounded-2xl bg-[#1D1612] border border-[#DFC9A6]/30 shadow-[8px_8px_0px_rgba(0,0,0,0.5)] mb-12"
          spotlightColor="rgba(236, 99, 61, 0.15)"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Real Chrome Gothic Veloth Logo — Scaled Up & Bold */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-8 bg-black/60 rounded-2xl border border-white/10 group relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />
              <img
                src="/veloth-logo.png"
                alt="Veloth Chrome Gothic Logo"
                className="h-32 sm:h-40 md:h-48 w-auto object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_25px_rgba(255,255,255,0.35)]"
              />
              <span className="font-display font-black text-base text-[#F6F1E7] tracking-[0.25em] uppercase mt-4">
                <ShinyText text="VELOTH" speed={4} />
              </span>
              <span className="font-mono text-[9px] text-[#AFA59A] tracking-[0.3em] uppercase mt-1">
                STREETWEAR IDENTITY EMBLEM
              </span>
            </div>

            {/* Description & Technical Direction */}
            <div className="md:col-span-7">
              <span className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-0.5 rounded bg-[#EC633D] text-white font-bold inline-block mb-2">
                PROJECT SPECIFICATION // LEAD PRODUCER
              </span>
              <h4 className="font-display font-black text-xl text-[#F6F1E7] mb-2">
                Định Hình Thương Hiệu &amp; Đột Phá Thực Tại
              </h4>
              <p className="text-xs sm:text-sm text-[#F6F1E7]/80 leading-relaxed mb-4 font-light">
                <strong>Mục tiêu cốt lõi:</strong> Đưa ra một thương hiệu định hình dành cho những con người có hoàn cảnh khó khăn, đồng hành cùng họ bứt phá khỏi khuôn mẫu thực tại thông qua thông điệp <em className="text-[#DFC9A6] font-serif italic text-base">"Break the matrix"</em>. Minh Khôi trực tiếp đảm nhận toàn diện từ xây dựng Project Brief, chỉ đạo hình ảnh hiện trường đến dựng hậu kỳ TVC 4 vòng lặp thời gian bằng kỹ thuật <strong>Match Cut</strong> tốc độ cao (0.5s – 2s/cảnh).
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://veloth.pages.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#283F7D] text-[#FFFBF3] font-mono text-xs font-bold shadow hover:bg-[#3B60C5] transition-colors"
                >
                  <span>Xem Trang Web Dự Án: veloth.pages.dev</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                {/* Moodboard Swatches */}
                <div className="flex items-center gap-1.5 ml-auto">
                  <span className="font-mono text-[10px] text-[#AFA59A] mr-1">PALETTE:</span>
                  <span className="w-4 h-4 rounded-full bg-[#000000] border border-white/20" title="#000000" />
                  <span className="w-4 h-4 rounded-full bg-[#101016] border border-white/20" title="#101016" />
                  <span className="w-4 h-4 rounded-full bg-[#171723] border border-white/20" title="#171723" />
                  <span className="w-4 h-4 rounded-full bg-[#31241A] border border-white/20" title="#31241A" />
                  <span className="w-4 h-4 rounded-full bg-[#DFC9A6] border border-white/20" title="#DFC9A6" />
                </div>
              </div>
            </div>
          </div>
        </SpotlightCard>

        {/* 3 Real Photos: Adaptive Lookbook Viewer (ZERO CROPPING for both Vertical & Horizontal photos) */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#DFC9A6] font-bold tracking-wider uppercase">
              ✦ VELOTH.CLO LOOKBOOK GALLERY // 3 BỘ HÌNH CHÍNH THỨC
            </span>

            {/* Look Selector Tabs */}
            <div className="flex items-center gap-2 font-mono text-xs">
              {velothLooks.map((look) => (
                <button
                  key={look.id}
                  onClick={() => setActiveVelothLook(look.id)}
                  className={`px-3 py-1.5 rounded-full border transition-all duration-200 ${
                    activeVelothLook === look.id
                      ? 'bg-[#DFC9A6] text-[#140F0B] font-bold border-[#DFC9A6]'
                      : 'bg-transparent text-[#AFA59A] border-white/15 hover:border-[#DFC9A6]'
                  }`}
                >
                  LOOK #0{look.id + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Active Lookbook Feature Card with ZERO CROPPING (Object Contain + Ambient Blur) */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#211813] border border-[#DFC9A6]/30 shadow-[6px_6px_0px_rgba(0,0,0,0.5)] mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Theater Canvas: Accommodates both Vertical & Horizontal without cutting */}
              <div className="lg:col-span-8 relative w-full h-[480px] sm:h-[540px] md:h-[600px] rounded-xl bg-black/90 flex items-center justify-center p-3 sm:p-5 overflow-hidden border border-white/10">
                {/* Ambient Blurred Backdrop */}
                <img
                  src={velothLooks[activeVelothLook].src}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-20 scale-110 pointer-events-none"
                />

                {/* Foreground Image: Full size, zero crop, 100% visible */}
                <img
                  src={velothLooks[activeVelothLook].src}
                  alt={velothLooks[activeVelothLook].title}
                  className="relative z-10 max-h-full max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300"
                />

                {/* Aspect ratio badge */}
                <div className="absolute top-4 left-4 z-20 font-mono text-[9px] tracking-wider uppercase px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[#DFC9A6] border border-white/15">
                  {velothLooks[activeVelothLook].format}
                </div>
              </div>

              {/* Lookbook Info */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full p-2">
                <div>
                  <span className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded bg-[#EC633D] text-white font-bold inline-block mb-2">
                    {velothLooks[activeVelothLook].tag}
                  </span>
                  <h4 className="font-display font-black text-lg text-[#F6F1E7] mb-2">
                    {velothLooks[activeVelothLook].title}
                  </h4>
                  <p className="text-xs text-[#AFA59A] leading-relaxed font-light mb-4">
                    {velothLooks[activeVelothLook].desc}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/10 font-mono text-[10px] text-[#DFC9A6]">
                  <div className="flex justify-between">
                    <span className="text-white/40">COLOR PROFILE:</span>
                    <span>SHADOW GRAY / DEEP WALNUT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">EDITING TECHNIQUE:</span>
                    <span>MATCH CUT (0.5S – 2.0S)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">LIGHTING:</span>
                    <span>BACKLIT FLASH / CCTV FOCUS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Lookbook Thumbnails with ZERO CROPPING (Object Contain) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {velothLooks.map((look) => (
              <div
                key={look.id}
                onClick={() => setActiveVelothLook(look.id)}
                className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  activeVelothLook === look.id
                    ? 'border-[#DFC9A6] shadow-[0_0_15px_rgba(223,201,166,0.3)] scale-[1.02]'
                    : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                }`}
              >
                <div className="h-44 bg-black/80 flex items-center justify-center p-2 relative overflow-hidden">
                  <img
                    src={look.src}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-lg opacity-15"
                  />
                  <img
                    src={look.src}
                    alt={look.title}
                    className="relative z-10 max-h-full max-w-full object-contain rounded"
                  />
                </div>
                <div className="p-2.5 bg-[#211813] font-mono text-[10px] text-[#F6F1E7] flex justify-between items-center">
                  <span className="font-bold">{look.title}</span>
                  <span className="text-[#DFC9A6]">{look.id === 0 ? 'DỌC ↕' : 'NGANG ↔'}</span>
                </div>
              </div>
            ))}
          </div>

          {/* INDIVIDUAL CONTRIBUTION & WORK BREAKDOWN */}
          <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#1B140E] border-2 border-[#DFC9A6]/40 shadow-[8px_8px_0px_rgba(0,0,0,0.6)]">
            {/* Header Tag */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#DFC9A6]/20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EC633D]" />
                <span className="font-mono text-xs text-[#EC633D] font-black tracking-widest uppercase">
                  ✦ PHẦN VIỆC KHÔI TRỰC TIẾP LÀM TRONG PROJECT NÀY
                </span>
              </div>
              <span className="font-mono text-[11px] px-3 py-1 rounded bg-[#2A1F18] border border-[#DFC9A6]/30 text-[#DFC9A6] font-bold">
                LEAD PRODUCER &amp; VIDEO EDITOR
              </span>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-[#AFA59A] uppercase tracking-wider font-bold">01 // TIỀN KỲ</span>
                    <Sparkles className="w-4 h-4 text-[#DFC9A6]" />
                  </div>
                  <h5 className="font-display font-black text-sm text-[#F6F1E7] mb-2">
                    Lên Kịch Bản &amp; Shotlist
                  </h5>
                  <p className="text-xs text-[#AFA59A] leading-relaxed">
                    Nghĩ ý tưởng và thông điệp <strong className="text-[#DFC9A6]">"Break the matrix"</strong>. Tự gom moodboard hình ảnh, chọn địa điểm quay đêm ở Quận 1 và lên danh sách từng góc máy (shotlist) để hôm quay không bị rối.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-white/5 font-mono text-[10px] text-[#EC633D] font-bold">
                  ✓ Tự viết kịch bản &amp; shotlist
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-[#AFA59A] uppercase tracking-wider font-bold">02 // HIỆN TRƯỜNG</span>
                    <Camera className="w-4 h-4 text-[#EC633D]" />
                  </div>
                  <h5 className="font-display font-black text-sm text-[#F6F1E7] mb-2">
                    Cầm Máy Quay &amp; Canh Sáng
                  </h5>
                  <p className="text-xs text-[#AFA59A] leading-relaxed">
                    Trực tiếp cầm máy <strong className="text-[#F6F1E7]">Lumix GH5</strong> bấm toàn bộ các cảnh quay đêm. Đánh flash và đèn ngược sáng để làm rõ chất vải và đường may của áo.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-white/5 font-mono text-[10px] text-[#EC633D] font-bold">
                  ✓ Tự cầm máy quay chính
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-[#AFA59A] uppercase tracking-wider font-bold">03 // HẬU KỲ</span>
                    <Scissors className="w-4 h-4 text-[#DFC9A6]" />
                  </div>
                  <h5 className="font-display font-black text-sm text-[#F6F1E7] mb-2">
                    Cắt Dựng &amp; Nhạc Nền
                  </h5>
                  <p className="text-xs text-[#AFA59A] leading-relaxed">
                    Tự tay import file, lọc footage, cắt nhịp trên <strong className="text-[#F6F1E7]">CapCut &amp; DaVinci</strong>. Chọn nhạc beat căng, cắt hình khớp từng nhịp trống (beat drop) và nối chuyển động của mẫu qua từng shot.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-white/5 font-mono text-[10px] text-[#EC633D] font-bold">
                  ✓ 100% tự dựng &amp; làm âm thanh
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-[#AFA59A] uppercase tracking-wider font-bold">04 // LÀM VIỆC NHÓM</span>
                    <UserCheck className="w-4 h-4 text-[#DFC9A6]" />
                  </div>
                  <h5 className="font-display font-black text-sm text-[#F6F1E7] mb-2">
                    Chỉ Dẫn Mẫu &amp; Chốt Tiến Độ
                  </h5>
                  <p className="text-xs text-[#AFA59A] leading-relaxed">
                    Ekip quay gồm 5 người. Khôi là người trực tiếp hướng dẫn mẫu cách đi đứng, ánh mắt và góc mặt trước ống kính, đồng thời kiểm soát thời gian quay để kịp trả địa điểm.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-white/5 font-mono text-[10px] text-[#EC633D] font-bold">
                  ✓ Hướng dẫn mẫu &amp; quản lý buổi quay
                </div>
              </div>
            </div>

            {/* Signature Highlight Banner */}
            <div className="p-4 rounded-xl bg-[#2A1F18] border border-[#DFC9A6]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Flame className="w-5 h-5 text-[#EC633D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-display font-bold text-xs sm:text-sm text-[#F6F1E7] block">
                    Điểm riêng của Khôi ở project này:
                  </span>
                  <p className="text-xs text-[#AFA59A] leading-relaxed mt-0.5">
                    Thích <strong className="text-[#DFC9A6]">dựng theo nhịp beat nhạc</strong> thay vì lạm dụng hiệu ứng chuyển cảnh màu mè. Cắt nhanh, dứt khoát theo chuyển động thực của mẫu để video xem đã mắt và giữ chân người xem tốt hơn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* =========================================================================
          CASE STUDY 02: SAIGON HOTPOT (SGHP)
          ========================================================================= */}
      <article id="sghp" className="mb-28 md:mb-40 pt-12">
        {/* Illoca Folder Tab */}
        <div className="flex items-center justify-between mb-4">
          <FolderTab index="02" label="TỔ CHỨC TÌNH NGUYỆN // MERCH 2025" color="#FBB03B" />
          <span className="font-mono text-[10px] tracking-widest text-[#AFA59A] uppercase hidden sm:block">
            VOLUNTEER YOUTH CAMPAIGN
          </span>
        </div>

        {/* Title */}
        <div className="mb-8">
          <OutlinedTitle text="SAIGON HOTPOT" accentText="merchandise '25" className="text-4xl sm:text-6xl md:text-7xl" />
          <div className="mt-2 flex items-center gap-3">
            <RedlineNote rotate="rotate-1">
              "Travel with local youth — 9.000+ Views chiến dịch"
            </RedlineNote>
          </div>
        </div>

        <div className="illoca-divider mb-12" />

        {/* BRAND IDENTITY BANNER — Clean, Authentic Saigon Hotpot Logo Presentation */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#F6F1E7] text-[#140F0B] shadow-[8px_8px_0px_rgba(0,0,0,0.5)] mb-12 border border-[#DFC9A6]/40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Real Transparent Saigon Hotpot Logo */}
            <div className="md:col-span-4 flex items-center justify-center p-4 bg-white/70 rounded-xl border border-black/10">
              <img
                src="/sghp-logo.png"
                alt="Saigon Hotpot Official Logo — Travel with local youth"
                className="max-h-24 md:max-h-28 w-auto object-contain"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-8">
              <span className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded bg-[#A6191E] text-white font-bold inline-block mb-2">
                OFFICIAL PARTNER // 13/11/2025 – HIỆN TẠI
              </span>
              <h4 className="font-display font-black text-xl text-[#140F0B] mb-2">
                Chiến Dịch Merchandise 2025: "Get Ready For The Vibe"
              </h4>
              <p className="text-xs sm:text-sm text-[#373737] leading-relaxed mb-3">
                <strong>Saigon Hotpot:</strong> Tổ chức sinh viên tình nguyện thành lập từ 2006, chuyên cung cấp các tour đi bộ miễn phí nhằm quảng bá vẻ đẹp và văn hóa TP.HCM đến bạn bè quốc tế.
              </p>
              <p className="text-xs sm:text-sm text-[#373737] leading-relaxed">
                <strong>Đóng góp của Minh Khôi:</strong> Lên concept bộ ảnh photoshoot sản phẩm, thiết kế ấn phẩm social, sáng tạo caption đa mục đích (Entertain, Inform, Educate) và trực tiếp bấm máy, dựng chuỗi video TikTok chiến dịch đạt <strong className="text-[#A6191E]">9.000+ views</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* 5 Real Photos: Merchandise Gallery */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-[#DFC9A6] font-bold tracking-wider uppercase">
              ✦ HÌNH ẢNH THỰC CHIẾN // MERCHANDISE 2025 PHOTOSHOOT
            </span>
            <span className="font-mono text-[10px] text-[#AFA59A]">5 ASSETS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 md:gap-6">
            {/* Poster (Col 4) */}
            <div className="sm:col-span-4">
              <ParallaxFrame
                src="/sghp-merch-poster.jpg"
                alt="Saigon Hotpot Merchandise 2025 Poster"
                aspect="aspect-[3/4]"
                caption="01. POSTER CHÍNH THỨC // PRE-ORDER 13.12 – 26.12"
              />
            </div>

            {/* Flatlay Full Lineup (Col 4) */}
            <div className="sm:col-span-4">
              <ParallaxFrame
                src="/sghp-merch-flatlay.jpg"
                alt="Saigon Hotpot Merch Flatlay on grass"
                aspect="aspect-[3/4]"
                caption="02. TRỌN BỘ MERCH // LANYARD, KEYCHAIN, STICKER"
              />
            </div>

            {/* Sticker Concept (Col 4) */}
            <div className="sm:col-span-4">
              <ParallaxFrame
                src="/sghp-merch-sticker.jpg"
                alt="Saigon Hotpot Sticker Concept"
                aspect="aspect-[3/4]"
                caption="03. CONCEPT STICKER // PHIẾU LẨU NGOAN"
              />
            </div>

            {/* Tote Bag (Col 6) */}
            <div className="sm:col-span-6">
              <ParallaxFrame
                src="/sghp-merch-totebag.jpg"
                alt="Saigon Hotpot Tote Bag"
                aspect="aspect-[4/3] sm:aspect-[16/10]"
                caption="04. TOTE BAG 'SAIGON' // CONCEPT GRAFFITI CẦU THANG"
              />
            </div>

            {/* Keychain (Col 6) */}
            <div className="sm:col-span-6">
              <ParallaxFrame
                src="/sghp-merch-keychain.jpg"
                alt="Saigon Hotpot Keychain detail"
                aspect="aspect-[4/3] sm:aspect-[16/10]"
                caption="05. CẬN CẢNH MÓC KHÓA KEYCHAIN NHÀ LẨU"
              />
            </div>
          </div>
        </div>

        {/* TikTok Filter & Interactive Cards */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#211813] border border-[#DFC9A6]/30 shadow-[6px_6px_0px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <h4 className="font-display font-bold text-base text-[#F6F1E7]">
                Tuyến Nội Dung Video TikTok (@saigonhotpot1111)
              </h4>
              <p className="font-mono text-xs text-[#AFA59A]">
                Phân loại chiến lược giữa <strong>ENTERTAIN</strong> (Giải trí/Tương tác) và <strong>INFORM</strong> (Thông tin mở đơn).
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-2 font-mono text-xs">
              {(['ALL', 'ENTERTAIN', 'INFORM'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTiktokFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
                    tiktokFilter === filter
                      ? 'bg-[#DFC9A6] text-[#140F0B] font-bold border-[#DFC9A6]'
                      : 'bg-transparent text-[#AFA59A] border-white/15 hover:border-[#DFC9A6]'
                  }`}
                >
                  {filter === 'ALL' ? 'TẤT CẢ (4)' : filter === 'ENTERTAIN' ? '✦ ENTERTAIN (2)' : '📢 INFORM (2)'}
                </button>
              ))}
            </div>
          </div>

          {/* Video Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTikToks.map((video) => (
              <div
                key={video.id}
                className="p-5 rounded-xl bg-black/40 border border-white/10 hover:border-[#DFC9A6]/50 transition-all duration-300 flex flex-col justify-between gap-4 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded border ${video.badgeClass}`}>
                      {video.badgeLabel}
                    </span>
                    <span className="font-mono text-xs font-black text-[#DFC9A6]">
                      {video.views}
                    </span>
                  </div>
                  <h5 className="font-display font-bold text-sm text-[#F6F1E7] group-hover:text-[#DFC9A6] transition-colors">
                    {video.title}
                  </h5>
                  <p className="text-xs text-[#AFA59A] mt-2 leading-relaxed">
                    {video.desc}
                  </p>
                </div>

                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2 rounded-lg bg-white/5 hover:bg-[#DFC9A6] hover:text-[#140F0B] text-[#F6F1E7] font-mono text-xs transition-colors duration-200"
                >
                  <span className="flex items-center gap-2">
                    <Play className="w-3.5 h-3.5" />
                    <span>Xem Video TikTok</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>

          {/* INDIVIDUAL CONTRIBUTION & WORK BREAKDOWN */}
          <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#1B140E] border-2 border-[#FBB03B]/40 shadow-[8px_8px_0px_rgba(0,0,0,0.6)]">
            {/* Header Tag */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#FBB03B]/20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FBB03B]" />
                <span className="font-mono text-xs text-[#FBB03B] font-black tracking-widest uppercase">
                  ✦ PHẦN VIỆC KHÔI TRỰC TIẾP LÀM TẠI SAIGON HOTPOT
                </span>
              </div>
              <span className="font-mono text-[11px] px-3 py-1 rounded bg-[#2A1F18] border border-[#FBB03B]/30 text-[#FBB03B] font-bold">
                MEDIA EXECUTIVE &amp; VIDEO CREATOR
              </span>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-[#AFA59A] uppercase tracking-wider font-bold">01 // CHỤP ẢNH MERCH</span>
                    <Camera className="w-4 h-4 text-[#FBB03B]" />
                  </div>
                  <h5 className="font-display font-black text-sm text-[#F6F1E7] mb-2">
                    Tự Chụp 5 Bộ Ảnh Sản Phẩm
                  </h5>
                  <p className="text-xs text-[#AFA59A] leading-relaxed">
                    Tự tìm góc chụp, sắp xếp sản phẩm (áo tote, móc khóa, sticker) trên bãi cỏ và cầu thang. Cầm máy <strong className="text-[#F6F1E7]">Lumix GH5</strong> chụp và chỉnh màu hoàn chỉnh để kịp chạy bài mở đơn.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-white/5 font-mono text-[10px] text-[#FBB03B] font-bold">
                  ✓ 100% tự chụp &amp; chỉnh ảnh
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-[#AFA59A] uppercase tracking-wider font-bold">02 // QUAY DỰNG TIKTOK</span>
                    <Scissors className="w-4 h-4 text-[#DFC9A6]" />
                  </div>
                  <h5 className="font-display font-black text-sm text-[#F6F1E7] mb-2">
                    Quay Phỏng Vấn &amp; Dựng Clip Viral
                  </h5>
                  <p className="text-xs text-[#AFA59A] leading-relaxed">
                    Cầm máy quay phỏng vấn tương tác sinh viên và người đi đường. Tự dựng, chèn âm thanh meme bắt trend, tự thu giọng lồng tiếng (voiceover) cho chuỗi video TikTok đạt hơn 9.000 views.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-white/5 font-mono text-[10px] text-[#FBB03B] font-bold">
                  ✓ 100% tự quay &amp; dựng video
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-[#AFA59A] uppercase tracking-wider font-bold">03 // VIẾT BÀI SOCIAL</span>
                    <Sparkles className="w-4 h-4 text-[#FBB03B]" />
                  </div>
                  <h5 className="font-display font-black text-sm text-[#F6F1E7] mb-2">
                    Viết Nội Dung &amp; Caption
                  </h5>
                  <p className="text-xs text-[#AFA59A] leading-relaxed">
                    Soạn caption bài đăng mở bán, bài giới thiệu câu lạc bộ và các bài tương tác vui nhộn. Tận dụng AI để gợi ý câu từ ngắn gọn, đánh trúng sự tò mò của sinh viên và du khách.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-white/5 font-mono text-[10px] text-[#FBB03B] font-bold">
                  ✓ Viết caption &amp; nội dung bài đăng
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-[#AFA59A] uppercase tracking-wider font-bold">04 // PHỐI HỢP NHÓM</span>
                    <UserCheck className="w-4 h-4 text-[#DFC9A6]" />
                  </div>
                  <h5 className="font-display font-black text-sm text-[#F6F1E7] mb-2">
                    Bám Sát Timeline Bán Hàng
                  </h5>
                  <p className="text-xs text-[#AFA59A] leading-relaxed">
                    Làm việc trực tiếp với bạn thiết kế sticker và ban tổ chức để chốt lịch lên video teaser trước ngày mở bán (13/12 – 26/12), đảm bảo bài đăng đúng giờ có lượng tương tác cao.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-white/5 font-mono text-[10px] text-[#FBB03B] font-bold">
                  ✓ Bám sát deadline chiến dịch
                </div>
              </div>
            </div>

            {/* Signature Highlight Banner */}
            <div className="p-4 rounded-xl bg-[#2A1F18] border border-[#FBB03B]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Flame className="w-5 h-5 text-[#FBB03B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-display font-bold text-xs sm:text-sm text-[#F6F1E7] block">
                    Điểm riêng của Khôi ở project này:
                  </span>
                  <p className="text-xs text-[#AFA59A] leading-relaxed mt-0.5">
                    Không quay giới thiệu sản phẩm kiểu bán hàng nhàm chán. Khôi lồng đồ merch vào các <strong className="text-[#FBB03B]">tình huống phỏng vấn giấu mặt và câu hỏi troll vui vẻ</strong>, giúp người xem coi hết clip một cách tự nhiên.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* =========================================================================
          CASE STUDY 03: THẾ GIỚI PHỈ THÚY — HỒNG ANH
          ========================================================================= */}
      <article id="ptha" className="pt-12">
        {/* Illoca Folder Tab */}
        <div className="flex items-center justify-between mb-4">
          <FolderTab index="03" label="CINEMATIC STORYTELLING &amp; AFFILIATE" color="#7A181D" />
          <span className="font-mono text-[10px] tracking-widest text-[#AFA59A] uppercase hidden sm:block">
            VIRAL GROWTH ENGINE
          </span>
        </div>

        {/* Title */}
        <div className="mb-8">
          <OutlinedTitle text="PHỈ THÚY" accentText="hồng anh &amp; vụ nổ lớn" className="text-4xl sm:text-6xl md:text-7xl" />
          <div className="mt-2 flex items-center gap-3">
            <RedlineNote rotate="-rotate-1">
              "570K+ Views video đầu tiên — Storytelling dẫn dắt cảm xúc"
            </RedlineNote>
          </div>
        </div>

        <div className="illoca-divider mb-12" />

        {/* Layout: Circular Logo + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Logo with Real Photo */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-[#DFC9A6] shadow-[8px_8px_0px_rgba(0,0,0,0.5)] bg-[#7A181D]">
              <img
                src="/ptha-logo.jpg"
                alt="Thế Giới Phỉ Thúy Hồng Anh"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Description & Dual Instagram Channels */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-[#211813] border border-[#DFC9A6]/30 shadow-[6px_6px_0px_rgba(0,0,0,0.5)]">
            <p className="text-sm text-[#F6F1E7]/90 leading-relaxed font-light mb-6">
              <strong>Mục tiêu nội dung:</strong> Định hình tuyến video theo hướng <em className="text-[#DFC9A6] font-serif italic text-base">"Storytelling"</em> với phong cách cinematic, kết hợp tối ưu hình ảnh và nhịp điệu để dẫn dắt cảm xúc người xem. Minh Khôi trực tiếp đảm nhận bấm máy/dựng cho kênh thương hiệu chính và lên Storyboard kịch bản phân cảnh cho kênh Affiliate.
            </p>

            {/* 2 Channel Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* @phithuyhonganh */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between gap-3">
                <div>
                  <span className="font-mono text-[9px] tracking-wider uppercase text-[#DFC9A6] font-bold block mb-1">
                    ✦ KÊNH THƯƠNG HIỆU CHÍNH
                  </span>
                  <div className="font-display font-extrabold text-base text-[#F6F1E7]">
                    @phithuyhonganh
                  </div>
                  <p className="text-xs text-[#AFA59A] mt-1">
                    Trang sức phỉ thúy cao cấp Type A Myanmar. Minh Khôi làm Videographer &amp; Editor set quay sản phẩm.
                  </p>
                </div>
                <a
                  href="https://www.instagram.com/phithuyhonganh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between font-mono text-xs text-[#DFC9A6] hover:underline"
                >
                  <span>Mở Instagram @phithuyhonganh</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              {/* @vu.nolon */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between gap-3">
                <div>
                  <span className="font-mono text-[9px] tracking-wider uppercase text-emerald-400 font-bold block mb-1">
                    ✦ KÊNH AFFILIATE &amp; NHÂN HIỆU
                  </span>
                  <div className="font-display font-extrabold text-base text-[#F6F1E7]">
                    @vu.nolon (vụ nổ lớn)
                  </div>
                  <p className="text-xs text-[#AFA59A] mt-1">
                    Kênh Affiliate (3.4K+ Followers). Minh Khôi trực tiếp lên Storyboard phân cảnh dẫn dắt câu chuyện.
                  </p>
                </div>
                <a
                  href="https://www.instagram.com/vu.nolon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between font-mono text-xs text-[#DFC9A6] hover:underline"
                >
                  <span>Mở Instagram @vu.nolon</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Giant Metric Cards with SpotlightCard from React Bits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
          <SpotlightCard className="p-5 rounded-2xl bg-[#2A1F18] border border-[#DFC9A6]/30 shadow-[4px_4px_0px_rgba(0,0,0,0.4)]" spotlightColor="rgba(223, 201, 166, 0.15)">
            <div className="font-display font-black text-3xl sm:text-4xl text-[#F6F1E7]">570K+</div>
            <div className="text-xs text-[#DFC9A6] uppercase mt-1">Views Video Đầu Tiên Lên Xu Hướng</div>
          </SpotlightCard>
          <SpotlightCard className="p-5 rounded-2xl bg-[#2A1F18] border border-[#DFC9A6]/30 shadow-[4px_4px_0px_rgba(0,0,0,0.4)]" spotlightColor="rgba(223, 201, 166, 0.15)">
            <div className="font-display font-black text-3xl sm:text-4xl text-[#F6F1E7]">100K+</div>
            <div className="text-xs text-[#DFC9A6] uppercase mt-1">Views 5 Video Tiếp Theo Giữ Phong Độ</div>
          </SpotlightCard>
          <SpotlightCard className="p-5 rounded-2xl bg-[#2A1F18] border border-[#DFC9A6]/30 shadow-[4px_4px_0px_rgba(0,0,0,0.4)]" spotlightColor="rgba(236, 99, 61, 0.15)">
            <div className="font-display font-black text-3xl sm:text-4xl text-[#EC633D]">+3.300</div>
            <div className="text-xs text-[#DFC9A6] uppercase mt-1">Followers Tăng Tự Nhiên Chỉ Sau 3 Tuần</div>
          </SpotlightCard>
        </div>

        {/* INDIVIDUAL CONTRIBUTION & WORK BREAKDOWN */}
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#1B140E] border-2 border-[#7A181D]/60 shadow-[8px_8px_0px_rgba(0,0,0,0.6)]">
          {/* Header Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#7A181D]/40">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EC633D]" />
              <span className="font-mono text-xs text-[#EC633D] font-black tracking-widest uppercase">
                ✦ PHẦN VIỆC KHÔI TỰ LÀM CHO KÊNH NÀY
              </span>
            </div>
            <span className="font-mono text-[11px] px-3 py-1 rounded bg-[#2A1F18] border border-[#7A181D]/60 text-[#DFC9A6] font-bold">
              SOLO VIDEOGRAPHER &amp; VIDEO EDITOR
            </span>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Pillar 1 */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-[#AFA59A] uppercase tracking-wider font-bold">01 // KỊCH BẢN</span>
                  <Sparkles className="w-4 h-4 text-[#DFC9A6]" />
                </div>
                <h5 className="font-display font-black text-sm text-[#F6F1E7] mb-2">
                  Viết Kịch Bản &amp; Câu Hook
                </h5>
                <p className="text-xs text-[#AFA59A] leading-relaxed">
                  Tự nghĩ chủ đề và câu mở đầu (hook) trong 3 giây đầu để người xem không lướt qua. Tập trung vào cách phân biệt ngọc thật - giả và chia sẻ kiến thức thật lòng, không nói quá.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-white/5 font-mono text-[10px] text-[#EC633D] font-bold">
                ✓ Tự viết 100% kịch bản video
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-[#AFA59A] uppercase tracking-wider font-bold">02 // QUAY CẬN CẢNH</span>
                  <Camera className="w-4 h-4 text-[#EC633D]" />
                </div>
                <h5 className="font-display font-black text-sm text-[#F6F1E7] mb-2">
                  Đánh Đèn &amp; Quay Macro
                </h5>
                <p className="text-xs text-[#AFA59A] leading-relaxed">
                  Tự kê đèn chiếu xuyên và đèn viền để thấy rõ độ trong và vân ngọc tự nhiên. Dùng máy <strong className="text-[#F6F1E7]">Lumix GH5</strong> quay sát cận cảnh từng chi tiết nhỏ của vòng ngọc.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-white/5 font-mono text-[10px] text-[#EC633D] font-bold">
                ✓ Tự setup đèn &amp; quay cận cảnh
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-[#AFA59A] uppercase tracking-wider font-bold">03 // CHỈNH MÀU &amp; NHẠC</span>
                  <Scissors className="w-4 h-4 text-[#DFC9A6]" />
                </div>
                <h5 className="font-display font-black text-sm text-[#F6F1E7] mb-2">
                  Chỉnh Màu DaVinci &amp; Lồng Tiếng
                </h5>
                <p className="text-xs text-[#AFA59A] leading-relaxed">
                  Cân chỉnh màu trên <strong className="text-[#F6F1E7]">DaVinci</strong> để màu xanh của ngọc và màu da tay đúng thực tế, không bị ám vàng. Lọc tiếng ồn và lồng nhạc nền êm dịu, nhẹ nhàng.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-white/5 font-mono text-[10px] text-[#EC633D] font-bold">
                ✓ Tự chỉnh màu &amp; xử lý âm thanh
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-[#AFA59A] uppercase tracking-wider font-bold">04 // KẾT QUẢ</span>
                  <Flame className="w-4 h-4 text-[#EC633D]" />
                </div>
                <h5 className="font-display font-black text-sm text-[#F6F1E7] mb-2">
                  Thử Nghiệm &amp; Lên Xu Hướng
                </h5>
                <p className="text-xs text-[#AFA59A] leading-relaxed">
                  Thay đổi cách đặt tiêu đề và ảnh bìa để tìm ra kiểu người xem thích nhất. Clip đầu tiên đạt <strong className="text-[#EC633D]">570K+ views</strong> và mang về hơn <strong className="text-[#DFC9A6]">3.300 followers</strong> chỉ sau 3 tuần.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-white/5 font-mono text-[10px] text-[#EC633D] font-bold">
                ✓ Theo dõi số liệu &amp; tối ưu lượt xem
              </div>
            </div>
          </div>

          {/* Signature Highlight Banner */}
          <div className="p-4 rounded-xl bg-[#2A1F18] border border-[#7A181D]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-[#EC633D] shrink-0 mt-0.5" />
              <div>
                <span className="font-display font-bold text-xs sm:text-sm text-[#F6F1E7] block">
                  Điểm riêng của Khôi ở project này:
                </span>
                <p className="text-xs text-[#AFA59A] leading-relaxed mt-0.5">
                  Không chèo kéo mua hàng. Khôi tập trung quay cận cảnh vẻ đẹp thật của sản phẩm kết hợp <strong className="text-[#EC633D]">giọng chia sẻ từ tốn, thẳng thắn</strong>, tạo được sự tin tưởng cho khách hàng trước khi họ quyết định mua.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

    </section>
  );
};

export default CaseStudiesSection;
