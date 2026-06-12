import React from 'react';
import * as Icons from 'lucide-react';
import { otherSpaces } from '../mock';

export default function OtherSpaces() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="mb-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[#E9041E] font-bold">
            <span className="w-6 h-[2px] bg-[#E9041E]" /> Nos autres Espaces Client
          </span>
          <h2 className="mt-4 text-[28px] md:text-[38px] font-black tracking-tight text-black leading-[1.1]">
            Vous êtes pro, entrepreneur ou à l&rsquo;international&nbsp;?
          </h2>
          <p className="mt-3 text-neutral-600">
            SG vous accompagne sur l&rsquo;ensemble de vos besoins financiers, du quotidien aux
            projets les plus ambitieux.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherSpaces.map((s) => {
            const Icon = Icons[s.icon] || Icons.Circle;
            return (
              <a
                key={s.title}
                href="#"
                className="group relative p-6 rounded-2xl bg-neutral-50 hover:bg-black hover:text-white border border-neutral-200 hover:border-black transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-neutral-200 group-hover:bg-[#E9041E] group-hover:border-[#E9041E] flex items-center justify-center text-[#E9041E] group-hover:text-white transition-colors">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 text-[16.5px] font-extrabold leading-snug">{s.title}</h3>
                <p className="mt-1.5 text-[13.5px] text-neutral-600 group-hover:text-neutral-300">
                  {s.desc}
                </p>
                <Icons.ArrowUpRight
                  size={18}
                  className="absolute top-5 right-5 opacity-40 group-hover:opacity-100 group-hover:rotate-12 transition-all"
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
