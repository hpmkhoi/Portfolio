import React from 'react';

interface OutlinedTitleProps {
  text: string;
  className?: string;
  accentText?: string;
  as?: 'h1' | 'h2' | 'h3' | 'div';
}

const OutlinedTitle: React.FC<OutlinedTitleProps> = ({
  text,
  className = '',
  accentText,
  as: Component = 'h2',
}) => {
  return (
    <Component className={`relative inline-block font-display font-black leading-[1.05] tracking-tight uppercase select-none group pb-3 pt-1 overflow-visible ${className}`}>
      {/* Grid Stack: Ensures both layers have identical dimensions and baselines */}
      <div className="grid grid-cols-1 grid-rows-1 items-baseline overflow-visible">
        {/* Background layer: Outline stroke only (Illoca blueprint stroke) */}
        <div
          className="col-start-1 row-start-1 flex items-baseline text-transparent overflow-visible"
          style={{
            WebkitTextStroke: '2px rgba(223, 201, 166, 0.45)',
            paintOrder: 'stroke fill',
          }}
          aria-hidden="true"
        >
          <span>{text}</span>
          {accentText && (
            <span
              className="font-serif italic font-normal text-transparent lowercase ml-3 sm:ml-5 inline-block text-[0.48em] tracking-normal"
              style={{
                WebkitTextStroke: '1.2px rgba(223, 201, 166, 0.4)',
              }}
            >
              {accentText}
            </span>
          )}
        </div>

        {/* Top layer: Solid fill overlaid cleanly on top */}
        <div className="col-start-1 row-start-1 flex items-baseline text-[#F6F1E7] transition-all duration-300 group-hover:text-[#DFC9A6] overflow-visible pointer-events-none">
          <span>{text}</span>
          {accentText && (
            <span className="font-serif italic font-normal text-[#DFC9A6] lowercase ml-3 sm:ml-5 inline-block text-[0.48em] tracking-normal">
              {accentText}
            </span>
          )}
        </div>
      </div>
    </Component>
  );
};

export default OutlinedTitle;
