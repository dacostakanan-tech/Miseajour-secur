import React from 'react';
import { Apple, Smartphone, Star, ShieldCheck, Fingerprint, Bell } from 'lucide-react';

const features = [
  { icon: Fingerprint, label: 'Connexion biométrique' },
  { icon: Bell, label: 'Notifications en temps réel' },
  { icon: ShieldCheck, label: 'Sécurité renforcée' },
];

export default function AppPromo() {
  return (
    <section className="py-14 md:py-24 bg-black text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[#E9041E] font-bold">
            <span className="w-6 h-[2px] bg-[#E9041E]" /> L&rsquo;Appli SG
          </span>
          <h2 className="mt-4 text-[30px] md:text-[44px] font-black tracking-tight leading-[1.05]">
            Votre banque,<br />
            <span className="text-[#E9041E]">dans votre poche.</span>
          </h2>
          <p className="mt-5 text-neutral-300 text-[16px] leading-relaxed max-w-[520px]">
            Consultez vos comptes, virez en un clin d&rsquo;œil, agrégez vos comptes externes,
            et discutez avec votre conseiller depuis l&rsquo;application SG.
          </p>

          <div className="mt-7 flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-[14px] font-semibold">4,7/5</span>
            <span className="text-[13px] text-neutral-400">· plus de 250 000 avis</span>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-3 max-w-[460px]">
            {features.map((f) => {
              const I = f.icon;
              return (
                <div key={f.label} className="flex flex-col gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                  <I size={20} className="text-[#E9041E]" />
                  <span className="text-[12.5px] font-semibold leading-tight">{f.label}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-3 bg-white text-black rounded-2xl px-5 py-3 hover:bg-neutral-200 transition-colors">
              <Apple size={22} />
              <span className="text-left">
                <span className="block text-[11px] leading-none opacity-70">Télécharger sur l&rsquo;</span>
                <span className="block text-[16px] font-bold leading-tight">App Store</span>
              </span>
            </button>
            <button className="inline-flex items-center gap-3 bg-white text-black rounded-2xl px-5 py-3 hover:bg-neutral-200 transition-colors">
              <Smartphone size={22} />
              <span className="text-left">
                <span className="block text-[11px] leading-none opacity-70">Disponible sur</span>
                <span className="block text-[16px] font-bold leading-tight">Google Play</span>
              </span>
            </button>
          </div>
        </div>

        {/* Phone mockup */}
        <div className="relative flex justify-center">
          <div className="absolute w-[420px] h-[420px] bg-[#E9041E]/30 blur-3xl rounded-full -z-0" />
          <div className="relative w-[280px] h-[560px] rounded-[44px] bg-neutral-900 border-[10px] border-neutral-800 shadow-2xl overflow-hidden">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-10" />
            <div className="h-full w-full bg-white text-black p-5 flex flex-col">
              <div className="flex items-center justify-between mt-4 text-[11px] text-neutral-500">
                <span>9:41</span>
                <span>••• 5G</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-[12px] font-bold">SD</div>
                <div>
                  <p className="text-[12px] text-neutral-500">Bonjour,</p>
                  <p className="text-[14px] font-bold">Sophie Dubois</p>
                </div>
              </div>
              <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-black to-neutral-800 text-white">
                <p className="text-[11px] opacity-70">Compte courant ··· 4821</p>
                <p className="mt-1 text-[24px] font-black">2 438,17 €</p>
                <p className="text-[10px] opacity-60">Disponible</p>
              </div>
              <p className="mt-5 text-[12px] font-bold uppercase tracking-wider text-neutral-500">Opérations</p>
              <ul className="mt-2 space-y-2 text-[12px]">
                {[
                  ['Carrefour', '-42,30 €'],
                  ['Virement Loïc', '+200,00 €'],
                  ['SNCF Connect', '-89,00 €'],
                  ['Salaire ACME', '+2 540,00 €'],
                ].map(([n, v]) => (
                  <li key={n} className="flex items-center justify-between py-1.5 border-b border-neutral-100">
                    <span>{n}</span>
                    <span className={v.startsWith('+') ? 'text-emerald-600 font-semibold' : 'font-semibold'}>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
