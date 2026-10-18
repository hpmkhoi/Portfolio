import React from 'react';

/* Illoca-style Die-cut Folder Tab */
export const FolderTab: React.FC<{
  index: string;
  label: string;
  color?: string;
}> = ({ index, label, color = '#DFC9A6' }) => {
  return (
    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-t-xl bg-[#2A1F18] border-t border-x border-[#DFC9A6]/30 font-mono text-[11px] font-bold uppercase tracking-widest text-[#F6F1E7] shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
      <span style={{ color }}>{index}</span>
      <span className="w-1 h-1 rounded-full bg-[#DFC9A6]/50" />
      <span>{label}</span>
    </div>
  );
};

/* Illoca-style Hand-drawn Redline Annotation */
export const RedlineNote: React.FC<{
  children: React.ReactNode;
  className?: string;
  rotate?: string;
}> = ({ children, className = '', rotate = '-rotate-2' }) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-serif italic text-sm md:text-base text-[#EC633D] font-normal tracking-wide transform ${rotate} ${className}`}
    >
      <span className="opacity-70">✦</span>
      <span>{children}</span>
    </span>
  );
};

/* Illoca Rolling Text Link */
export const RollingLink: React.FC<{
  href: string;
  label: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  active?: boolean;
}> = ({ href, label, external = false, onClick, active = false }) => {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      className={`group relative inline-block font-mono text-xs uppercase tracking-widest transition-colors select-none ${
        active ? 'text-[#DFC9A6]' : 'text-[#F6F1E7]/80 hover:text-[#DFC9A6]'
      }`}
    >
      <span className="inline-block overflow-hidden h-[1.4em] leading-[1.4em] align-middle">
        <span className="block transition-transform duration-300 ease-[cubic-bezier(0.2,0,0.1,1)] group-hover:-translate-y-1/2">
          <span className="block h-[1.4em] leading-[1.4em]">{label}</span>
          <span className="block h-[1.4em] leading-[1.4em] text-[#DFC9A6] font-bold">{label}</span>
        </span>
      </span>
      {/* Sliding Perforated Dotted Underline */}
      <span className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden pointer-events-none">
        <span
          className={`block w-full h-full transition-transform duration-300 ease-[cubic-bezier(0.2,0,0.1,1)] ${
            active ? 'translate-x-0' : '-translate-x-full group-hover:translate-x-0'
          }`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='2' viewBox='0 0 4 2'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23DFC9A6'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat-x',
            backgroundSize: '4px 2px',
          }}
        />
      </span>
    </a>
  );
};

/* Illoca-style Architectural CTA Button */
export const ArchitectCTA: React.FC<{
  label: string;
  onClick?: () => void;
  href?: string;
  badgeText?: string;
}> = ({ label, onClick, href, badgeText = '01' }) => {
  const content = (
    <div className="group relative inline-flex items-center h-11 px-1 rounded-lg bg-[#283F7D] text-[#FFFBF3] overflow-hidden cursor-pointer shadow-[4px_4px_0px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:-translate-y-0.5">
      {/* Background scale up fill */}
      <div className="absolute inset-0 size-full bg-[#3B60C5] origin-bottom scale-y-0 transition-transform duration-300 ease-[cubic-bezier(0.2,0,0.1,1)] group-hover:scale-y-100 z-0" />

      {/* Left Orange Drafting Badge */}
      <div className="relative z-10 w-9 h-9 shrink-0 flex items-center justify-center bg-[#EC633D] rounded font-mono text-[11px] font-bold text-white">
        {badgeText}
      </div>

      {/* Rolling Label */}
      <div className="relative z-10 px-4 font-mono text-xs font-semibold tracking-wider text-center overflow-hidden h-[1.4em] leading-[1.4em]">
        <div className="transition-transform duration-300 ease-[cubic-bezier(0.2,0,0.1,1)] group-hover:-translate-y-1/2">
          <div className="h-[1.4em] leading-[1.4em]">{label}</div>
          <div className="h-[1.4em] leading-[1.4em] text-white font-bold">{label}</div>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className="inline-block">
        {content}
      </a>
    );
  }

  return <button onClick={onClick}>{content}</button>;
};
