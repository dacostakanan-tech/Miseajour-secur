import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { heroImage } from '../mock';

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          'radial-gradient(at 20% 0%, #5C2240 0%, transparent 50%), radial-gradient(at 80% 100%, #2A1525 0%, transparent 50%), #3D1A2E',
      }}
    >
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-[1320px] mx-auto px-4 md:px-6 py-14 md:py-20 lg:py-24 grid lg:grid-cols-12 gap-10 items-center">
        {/* Text */}
        <div className="lg:col-span-7 text-white">
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-bold text-white/80">
            <span className="w-7 h-[2px] bg-[#E9041E]" /> Bienvenue chez SG
          </span>
          <h1 className="mt-5 text-[34px] sm:text-[42px] md:text-[54px] leading-[1.04] font-black tracking-tight">
            SG, une banque ancrée au cœur de votre territoire pour s&rsquo;adapter à la réalité de
            <span className="text-[#FF7286]"> votre quotidien.</span>
          </h1>
          <p className="mt-6 text-[16.5px] md:text-[17px] text-white/80 leading-relaxed max-w-[560px]">
            Découvrez nos offres et solutions pensées pour vous, et nos conseillers dédiés
            prêts à vous accompagner dans tous vos projets de vie.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="group inline-flex items-center gap-2 bg-white text-black font-bold rounded-full px-6 py-3 text-[15px] hover:bg-neutral-200 transition-colors">
              Ouvrir un compte
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <Link
              to="/espace-client"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/30 text-white font-bold rounded-full px-6 py-3 text-[15px] transition-colors"
            >
              <Play size={14} className="fill-white" /> Accéder à mon Espace client
            </Link>
          </div>
        </div>

        {/* Image with red frame */}
        <div className="lg:col-span-5 relative">
          <div className="relative w-full max-w-[460px] mx-auto aspect-[4/5]">
            {/* Red square frame */}
            <div className="absolute -inset-4 border-[6px] border-[#E9041E] rounded-[28px] rotate-2 pointer-events-none" />
            <div className="absolute -inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-[24px] blur-2xl" />
            <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-neutral-200">
              <img
                src={heroImage}
                alt="Cliente SG"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 md:-bottom-5 md:-left-6 bg-white text-black px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#E9041E]/10 flex items-center justify-center text-[#E9041E] font-extrabold">₹</div>
              <div className="leading-tight">
                <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-bold">Appéli SG</p>
                <p className="text-[13.5px] font-bold">4,7/5 · 250k+ avis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
