import React from 'react';
import { ArrowRight } from 'lucide-react';
import { news } from '../mock';

export default function News() {
  return (
    <section className="py-14 md:py-20 bg-neutral-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[#E9041E] font-bold">
              <span className="w-6 h-[2px] bg-[#E9041E]" /> Actualités
            </span>
            <h2 className="mt-4 text-[28px] md:text-[38px] font-black tracking-tight text-black leading-[1.1]">
              À la une de SG.
            </h2>
          </div>
          <a
            href="#all"
            className="hidden md:inline-flex items-center gap-2 text-[14px] font-bold text-black hover:text-[#E9041E]"
          >
            Toutes les actualités <ArrowRight size={15} />
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {news.map((n) => (
            <article key={n.title} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl aspect-[5/3]">
                <img
                  src={n.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="mt-4 flex items-center gap-3 text-[12px]">
                <span className="bg-black text-white px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider">
                  {n.category}
                </span>
                <span className="text-neutral-500">{n.date}</span>
              </div>
              <h3 className="mt-3 text-[19px] font-extrabold text-black leading-snug group-hover:text-[#E9041E] transition-colors">
                {n.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
