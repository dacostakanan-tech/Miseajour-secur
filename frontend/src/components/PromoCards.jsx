import React from 'react';
import { ArrowRight } from 'lucide-react';
import { promoCards } from '../mock';

export default function PromoCards() {
  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {promoCards.map((p) => (
            <article
              key={p.title}
              className="group relative rounded-3xl overflow-hidden p-6 md:p-7 min-h-[260px] flex flex-col justify-between transition-transform duration-500 hover:-translate-y-1"
              style={{ background: p.bg }}
            >
              <div className="relative z-10">
                <span
                  className="inline-block text-[10.5px] font-extrabold tracking-[0.18em] uppercase text-black/70 bg-white/60 backdrop-blur px-2.5 py-1 rounded-full"
                >
                  {p.tag}
                </span>
                <h3 className="mt-4 text-[22px] md:text-[24px] font-black leading-[1.15] text-black max-w-[280px]">
                  {p.title}
                </h3>
              </div>

              <div className="relative z-10 mt-5">
                <button className="group/btn inline-flex items-center gap-2 bg-white hover:bg-black hover:text-white text-black text-[13.5px] font-bold rounded-full px-4 py-2 transition-colors">
                  {p.cta}
                  <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>

              {/* Image bottom-right */}
              <div className="absolute bottom-0 right-0 w-[60%] h-[78%] pointer-events-none">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 0%, ${p.overlay}90 100%)`,
                  }}
                />
                <img
                  src={p.image}
                  alt=""
                  className="w-full h-full object-cover object-center mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
