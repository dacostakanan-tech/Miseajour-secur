import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';

// Top red bar with "Particuliers" label + "?" help.
// Below it: white main header with SG square logo + tagline + "Ouvrir un compte" red button.
export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      {/* Tiny red bar */}
      <div className="bg-[#E9041E] text-white">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8 h-[28px] flex items-center justify-between">
          <span className="text-[13px] font-bold tracking-wide">Particuliers</span>
          <button
            type="button"
            className="inline-flex items-center justify-center w-6 h-6 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Aide"
          >
            <HelpCircle size={16} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* Main white header */}
      <div className="bg-white border-b border-neutral-200 shadow-sm">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8 h-[60px] flex items-center justify-between">
          <Link to="/espace-client" className="flex items-center gap-3">
            {/* SG letters + square */}
            <span className="flex items-center gap-2.5">
              <span className="font-extrabold text-[22px] text-black tracking-tight leading-none">SG</span>
              <svg width="30" height="30" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="block shrink-0">
                <rect x="0" y="0" width="40" height="17" fill="#E9041E" />
                <rect x="0" y="23" width="40" height="17" fill="#000000" />
              </svg>
            </span>
            <span className="text-[10.5px] md:text-[11.5px] font-bold tracking-[0.14em] uppercase leading-tight text-[#0F1B33]">
              C&rsquo;est vous
              <br />
              l&rsquo;avenir
            </span>
          </Link>

          <button
            type="button"
            className="hidden sm:inline-flex items-center bg-[#E9041E] hover:bg-[#c8031a] text-white text-[13.5px] font-bold rounded-full px-5 py-2 transition-colors"
          >
            Ouvrir un compte
          </button>
        </div>
      </div>
    </header>
  );
}
