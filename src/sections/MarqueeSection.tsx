import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const words = [
  'VIDEOGRAPHER',
  'VIDEO EDITOR',
  'LEAD PRODUCER',
  'SPEC ADS',
  'STORYTELLING',
  'AI WORKFLOW',
  'MATCH CUT',
  'UEH 2026',
];

const MarqueeSection: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    // Smooth subtle skew reaction on scroll without hitching the marquee animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: marqueeRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const vel = self.getVelocity() / 350;
        const clampedSkew = Math.max(-2.5, Math.min(2.5, vel));
        gsap.to(marqueeRef.current, {
          skewX: clampedSkew,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <section className="relative z-20 py-4.5 bg-[#F6F1E7] overflow-hidden -rotate-[1.2deg] scale-[1.03] my-6 select-none shadow-[0_6px_20px_rgba(0,0,0,0.4)]">
      <div
        ref={marqueeRef}
        className="marquee-track flex whitespace-nowrap will-change-transform"
      >
        {[0, 1, 2, 3].map((loop) => (
          <div key={loop} className="flex items-center shrink-0">
            {words.map((w, i) => (
              <span key={i} className="flex items-center">
                <span className="font-display font-black text-xs sm:text-sm md:text-base tracking-[0.1em] uppercase text-[#140F0B] px-5 md:px-7">
                  {w}
                </span>
                <span className="text-[#EC633D] text-xs font-bold">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        .marquee-track {
          animation: smoothMarquee 30s linear infinite;
        }
        @keyframes smoothMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </section>
  );
};

export default MarqueeSection;
