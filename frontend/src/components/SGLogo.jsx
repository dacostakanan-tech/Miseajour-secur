import React from 'react';

// SG iconic compact logo: square divided red top / black bottom with white gap.
export default function SGLogo({ size = 36, color = 'dark', withTag = true, className = '' }) {
  const isLight = color === 'light';
  return (
    <div className={`flex items-center gap-2.5 ${className}`} aria-label="SG">
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <rect x="0" y="0" width="40" height="17" fill="#E9041E" />
        <rect x="0" y="23" width="40" height="17" fill="#000000" />
      </svg>
      <div className="leading-none">
        <div
          className={`font-black tracking-tight text-[20px] ${isLight ? 'text-white' : 'text-black'}`}
          style={{ letterSpacing: '-0.02em' }}
        >
          SG
        </div>
        {withTag && (
          <div
            className={`text-[9px] font-bold tracking-[0.12em] uppercase mt-1 ${
              isLight ? 'text-white/90' : 'text-black/80'
            }`}
          >
            C&rsquo;est vous l&rsquo;avenir
          </div>
        )}
      </div>
    </div>
  );
}
