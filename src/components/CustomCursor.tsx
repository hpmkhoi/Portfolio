import React, { useEffect, useState, useRef } from 'react';

interface PreviewData {
  title: string;
  tag: string;
  bg?: string;
  image?: string;
}

const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const reqRef = useRef<number | null>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.18;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.18;
      setPos({ x: currentPos.current.x, y: currentPos.current.y });
      reqRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    reqRef.current = requestAnimationFrame(animate);

    // Add listeners for hover preview elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-preview-title]');
      if (target) {
        const title = target.getAttribute('data-preview-title') || '';
        const tag = target.getAttribute('data-preview-tag') || 'PREVIEW';
        const bg = target.getAttribute('data-preview-bg') || undefined;
        const image = target.getAttribute('data-preview-image') || undefined;
        setPreview({ title, tag, bg, image });
      }

      const isInteractive = (e.target as HTMLElement).closest('a, button, input, [role="button"]');
      setIsHoveringLink(!!isInteractive);
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-preview-title]');
      if (target) {
        setPreview(null);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, []);

  return (
    <>
      {/* Small cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full transition-transform duration-75 mix-blend-difference hidden md:block"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isHoveringLink ? '28px' : '10px',
          height: isHoveringLink ? '28px' : '10px',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#F6F1E7',
          opacity: 0.9,
        }}
      />

      {/* Floating Preview Card */}
      {preview && (
        <div
          className="fixed pointer-events-none z-[9995] rounded-2xl p-4 w-[280px] shadow-2xl border border-cream-gold/30 backdrop-blur-md transition-all duration-300 ease-out hidden md:block"
          style={{
            left: `${pos.x + 28}px`,
            top: `${pos.y - 40}px`,
            background: preview.bg || 'rgba(33, 24, 19, 0.92)',
            transform: 'rotate(2deg) scale(1)',
          }}
        >
          <div className="flex flex-col gap-2">
            <span className="self-start text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cream text-espresso font-bold">
              {preview.tag}
            </span>
            <div className="font-display font-extrabold text-sm text-cream leading-tight">
              {preview.title}
            </div>
            {preview.image && (
              <img
                src={preview.image}
                alt=""
                className="w-full h-24 object-cover rounded-lg mt-1 border border-white/10"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CustomCursor;
