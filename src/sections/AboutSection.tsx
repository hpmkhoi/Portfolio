import React from 'react';
import { motion } from 'framer-motion';
import OutlinedTitle from '../components/OutlinedTitle';
import { FolderTab, RedlineNote } from '../components/ArchitecturalMarkup';
import { Cpu, CheckCircle2, Video, Camera } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative z-10 py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
      {/* Illoca Folder Tab Header */}
      <div className="flex items-center justify-between mb-4">
        <FolderTab index="00" label="NĂNG LỰC CỐT LÕI &amp; AI WORKFLOW" color="#DFC9A6" />
        <span className="font-mono text-[10px] tracking-widest text-[#AFA59A] uppercase hidden sm:block">
          SPECIFICATION SHEET // 2026
        </span>
      </div>

      {/* Main Title */}
      <div className="mb-10">
        <OutlinedTitle text="HỌC VẤN &amp; AI" accentText="thực chiến" className="text-4xl sm:text-6xl md:text-7xl" />
        <div className="mt-2 flex items-center gap-3">
          <RedlineNote rotate="rotate-1">
            "Không chỉ nhìn con số, mà nhìn qua chiều sâu câu chuyện và hình ảnh"
          </RedlineNote>
        </div>
      </div>

      <div className="illoca-divider mb-14" />

      {/* Bento Layout with Architectural Index Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

        {/* Card 1: Học Vấn UEH (Col 5) */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#211813] border border-[#DFC9A6]/30 shadow-[6px_6px_0px_rgba(0,0,0,0.5)] flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded bg-[#DFC9A6] text-[#140F0B] font-bold">
                EDUCATION // UEH
              </span>
              <span className="font-mono text-xs text-[#EC633D] font-bold">2025 – NAY</span>
            </div>

            <div className="flex items-center gap-4 mb-4 bg-white/95 p-3 rounded-xl border border-black/10">
              <img src="/ueh-logo.png" alt="Đại học Kinh tế TP.HCM UEH" className="h-10 w-auto object-contain" />
              <div>
                <h3 className="font-display font-black text-sm text-[#005F69]">
                  ĐẠI HỌC KINH TẾ TP.HCM
                </h3>
                <p className="font-mono text-[11px] text-[#F26F33] font-bold">
                  Tiếng Anh Thương Mại (Business English)
                </p>
              </div>
            </div>

            <p className="text-sm text-[#F6F1E7]/80 leading-relaxed font-light mb-6">
              Đạt danh hiệu <strong className="text-[#F6F1E7] font-semibold">Sinh viên Học lực Giỏi</strong>.
              Năng lực nghiên cứu xu hướng toàn cầu, dịch thuật và biên soạn tài liệu truyền thông song ngữ chuẩn xác.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 font-mono">
            <div className="p-3 rounded-xl bg-black/40 border border-white/5">
              <div className="font-display font-black text-xl text-[#DFC9A6]">3.5 / 4.0</div>
              <div className="text-[10px] text-[#AFA59A] uppercase mt-0.5">GPA Năm Nhất</div>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5">
              <div className="font-display font-black text-xl text-[#F6F1E7]">IELTS 7.0</div>
              <div className="text-[10px] text-[#AFA59A] uppercase mt-0.5">Chứng Chỉ Quốc Tế</div>
            </div>
          </div>
        </div>

        {/* Card 2: ✦ Kỹ Năng Nổi Bật // AI Proficiency (Col 7) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#2A1F18] border border-[#DFC9A6]/30 shadow-[6px_6px_0px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded bg-[#EC633D] text-white font-bold flex items-center gap-1.5">
              <Cpu className="w-3 h-3" />
              <span>AI WORKFLOW // 10X PRODUCTION</span>
            </span>
            <span className="font-mono text-[10px] text-[#DFC9A6]">AUTONOMOUS SYSTEM</span>
          </div>

          <h3 className="font-display font-black text-xl sm:text-2xl text-[#F6F1E7] mb-2">
            Thành Thạo AI Trong Sáng Tạo Nội Dung
          </h3>
          <p className="text-xs text-[#AFA59A] mb-6 font-light">
            Ứng dụng công nghệ Trí tuệ Nhân tạo vào từng mắt xích sản xuất:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-black/30 border border-white/10">
              <span className="font-mono text-xs text-[#EC633D] font-bold block mb-1">01 // KỊCH BẢN &amp; INSIGHT</span>
              <h4 className="font-display font-bold text-xs text-[#F6F1E7] mb-1">ChatGPT · Claude · Gemini</h4>
              <p className="text-[11px] text-[#AFA59A] leading-relaxed">
                Phân tích đối tượng người xem, lên shotlist phân cảnh và viết caption đa mục đích (Entertain, Inform, Educate).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/30 border border-white/10">
              <span className="font-mono text-xs text-[#DFC9A6] font-bold block mb-1">02 // VISUAL &amp; MOODBOARD</span>
              <h4 className="font-display font-bold text-xs text-[#F6F1E7] mb-1">AI Image Generation</h4>
              <p className="text-[11px] text-[#AFA59A] leading-relaxed">
                Phác thảo bố cục ánh sáng, moodboard màu sắc và hình ảnh minh họa concept trước khi bấm máy thực tế.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/30 border border-white/10">
              <span className="font-mono text-xs text-[#DFC9A6] font-bold block mb-1">03 // VIDEO &amp; SOUND HẬU KỲ</span>
              <h4 className="font-display font-bold text-xs text-[#F6F1E7] mb-1">AI Voice &amp; Captions</h4>
              <p className="text-[11px] text-[#AFA59A] leading-relaxed">
                Auto-Captions phụ đề tự động, Voice Isolation khử tiếng ồn môi trường và tách nền chủ thể thông minh.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/30 border border-white/10">
              <span className="font-mono text-xs text-[#EC633D] font-bold block mb-1">04 // TỐI ƯU HÓA VIRAL</span>
              <h4 className="font-display font-bold text-xs text-[#F6F1E7] mb-1">Trend Adaptation</h4>
              <p className="text-[11px] text-[#AFA59A] leading-relaxed">
                Tổng hợp các format video ngắn thịnh hành trên TikTok/Reels để chuyển hóa thành kịch bản nhận diện thương hiệu.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Software & Hardware Gear (with Real App Icons & Photos) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* Software Icons (Col 6) */}
        <div className="md:col-span-6 p-6 rounded-2xl bg-[#211813] border border-[#DFC9A6]/30 shadow-[6px_6px_0px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] tracking-wider uppercase text-[#DFC9A6] font-bold">
              1+ NĂM KINH NGHIỆM VIDEO EDITING
            </span>
            <span className="font-mono text-[10px] text-[#AFA59A]">SOFTWARE STACK</span>
          </div>

          <h4 className="font-display font-bold text-base text-[#F6F1E7] mb-4">
            Phần Mềm Hậu Kỳ &amp; Thiết Kế
          </h4>

          <div className="grid grid-cols-3 gap-4">
            {/* CapCut */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col items-center text-center gap-2">
              <img src="/icon-capcut.png" alt="CapCut Pro" className="w-12 h-12 rounded-xl object-contain shadow" />
              <div className="font-display font-bold text-xs text-[#F6F1E7]">CapCut Pro</div>
              <div className="font-mono text-[9px] text-[#AFA59A]">Nhịp cắt &amp; FX</div>
            </div>

            {/* DaVinci Resolve */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col items-center text-center gap-2">
              <img src="/icon-davinci.png" alt="DaVinci Resolve" className="w-12 h-12 rounded-xl object-contain shadow" />
              <div className="font-display font-bold text-xs text-[#F6F1E7]">DaVinci</div>
              <div className="font-mono text-[9px] text-[#AFA59A]">Color Grading</div>
            </div>

            {/* Canva */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col items-center text-center gap-2">
              <img src="/icon-canva.png" alt="Canva" className="w-12 h-12 rounded-xl object-contain shadow" />
              <div className="font-display font-bold text-xs text-[#F6F1E7]">Canva</div>
              <div className="font-mono text-[9px] text-[#AFA59A]">Proposal &amp; Feed</div>
            </div>
          </div>
        </div>

        {/* Hardware Cameras (Col 6) */}
        <div className="md:col-span-6 p-6 rounded-2xl bg-[#211813] border border-[#DFC9A6]/30 shadow-[6px_6px_0px_rgba(0,0,0,0.5)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] tracking-wider uppercase text-[#DFC9A6] font-bold">
                PHYSICAL EQUIPMENT
              </span>
              <span className="font-mono text-[10px] text-[#AFA59A]">HARDWARE GEAR</span>
            </div>

            <h4 className="font-display font-bold text-base text-[#F6F1E7] mb-4">
              Thiết Bị Quay Chụp Thực Chiến
            </h4>

            <div className="grid grid-cols-2 gap-4">
              {/* Lumix GH5 */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center gap-3">
                <img src="/lumix-gh5.png" alt="Lumix GH5" className="w-14 h-14 object-contain shrink-0" />
                <div>
                  <div className="font-display font-bold text-xs text-[#F6F1E7]">Lumix GH5</div>
                  <div className="font-mono text-[9px] text-[#DFC9A6]">4K 10-Bit Cinematic</div>
                </div>
              </div>

              {/* DJI Action 5 Pro */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center gap-3">
                <img src="/dji-action5.png" alt="DJI Action 5 Pro" className="w-14 h-14 object-contain shrink-0" />
                <div>
                  <div className="font-display font-bold text-xs text-[#F6F1E7]">DJI Action 5</div>
                  <div className="font-mono text-[9px] text-[#DFC9A6]">POV &amp; Super-Wide</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-2 font-mono text-xs text-[#DFC9A6]">
            <CheckCircle2 className="w-4 h-4 text-[#EC633D] shrink-0" />
            <span>Kèm Micro không dây DJI Mic &amp; Chân máy chống rung</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
