import React from 'react';
import * as Icons from 'lucide-react';
import { quickActions } from '../mock';

export default function QuickActions() {
  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-[22px] md:text-[28px] font-extrabold tracking-tight text-black">
            Que souhaitez-vous faire aujourd&rsquo;hui&nbsp;?
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {quickActions.map((q) => {
            const Icon = Icons[q.icon] || Icons.Circle;
            return (
              <button
                key={q.label}
                className="group flex flex-col items-start gap-4 p-5 rounded-2xl bg-neutral-50 hover:bg-white hover:shadow-lg border border-transparent hover:border-neutral-200 transition-all text-left"
              >
                <span className="w-11 h-11 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-[#E9041E] group-hover:bg-[#E9041E] group-hover:text-white group-hover:border-[#E9041E] transition-colors">
                  <Icon size={20} />
                </span>
                <span className="text-[15px] font-semibold text-black leading-snug">
                  {q.label}
                </span>
                <span className="mt-auto inline-flex items-center gap-1 text-[13px] font-semibold text-neutral-700 group-hover:text-[#E9041E]">
                  Commencer
                  <Icons.ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
