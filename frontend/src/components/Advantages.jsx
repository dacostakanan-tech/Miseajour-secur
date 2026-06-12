import React from 'react';
import * as Icons from 'lucide-react';
import { advantages } from '../mock';

export default function Advantages() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[#E9041E] font-bold">
              <span className="w-6 h-[2px] bg-[#E9041E]" /> Les avantages de SG
            </span>
            <h2 className="mt-4 text-[28px] md:text-[38px] font-black tracking-tight text-black leading-[1.1]">
              Une banque ancrée au cœur de votre territoire,<br />
              <span className="text-[#E9041E]">adaptée à votre quotidien.</span>
            </h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {advantages.map((a) => {
            const Icon = Icons[a.icon] || Icons.Circle;
            return (
              <div
                key={a.title}
                className="group p-6 rounded-2xl border border-neutral-200 hover:border-black bg-white hover:bg-neutral-50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E9041E] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 text-[17px] font-extrabold text-black leading-snug">{a.title}</h3>
                <p className="mt-2 text-[14px] text-neutral-600 leading-relaxed">{a.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
