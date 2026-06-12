import React from 'react';
import { ArrowRight } from 'lucide-react';
import { productHighlights } from '../mock';

export default function Products() {
  return (
    <section className="py-12 md:py-20 bg-neutral-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="max-w-2xl mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[#E9041E] font-bold">
            <span className="w-6 h-[2px] bg-[#E9041E]" /> Nos offres
          </span>
          <h2 className="mt-4 text-[28px] md:text-[38px] font-black tracking-tight text-black leading-[1.1]">
            Des solutions pensées pour chaque étape de votre vie.
          </h2>
          <p className="mt-4 text-neutral-600 text-[16px]">
            Compte, crédit, épargne, assurance… SG vous accompagne avec une approche
            personnalisée et 100 % digitale quand vous le souhaitez.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {productHighlights.map((p) => (
            <article
              key={p.title}
              className="group bg-white rounded-3xl overflow-hidden border border-neutral-200 hover:border-black/20 hover:shadow-xl transition-all"
            >
              <div className="relative aspect-[5/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-white text-black text-[12px] font-bold px-3 py-1.5 rounded-full">
                  {p.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-[20px] font-extrabold text-black leading-snug">
                  {p.title}
                </h3>
                <p className="mt-2 text-[14.5px] text-neutral-600 leading-relaxed">
                  {p.desc}
                </p>
                <button className="mt-5 inline-flex items-center gap-2 text-[14px] font-bold text-black group-hover:text-[#E9041E]">
                  {p.cta}
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
