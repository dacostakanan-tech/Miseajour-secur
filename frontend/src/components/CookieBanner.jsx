import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = typeof window !== 'undefined' && localStorage.getItem('sg_cookie_choice');
    if (!saved) setOpen(true);
  }, []);

  if (!open) return null;

  const close = (choice) => {
    try {
      localStorage.setItem('sg_cookie_choice', choice);
    } catch (e) {
      // ignore
    }
    setOpen(false);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:max-w-md z-[60]">
      <div className="bg-white border border-neutral-200 shadow-2xl rounded-2xl p-5">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-[16px] font-extrabold text-black">Gestion des cookies</h4>
          <button onClick={() => close('dismissed')} className="text-neutral-500 hover:text-black" aria-label="Fermer">
            <X size={18} />
          </button>
        </div>
        <p className="mt-2 text-[13.5px] text-neutral-600 leading-relaxed">
          SG utilise des traceurs (cookies) pour assurer le bon fonctionnement du site, améliorer
          votre navigation et réaliser des statistiques de visites. Vous pouvez à tout moment
          modifier vos choix.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => close('accept')}
            className="bg-black hover:bg-neutral-800 text-white text-[13.5px] font-semibold rounded-full px-4 py-2"
          >
            J&rsquo;accepte tout
          </button>
          <button
            onClick={() => close('reject')}
            className="bg-white border border-neutral-300 text-black hover:border-black text-[13.5px] font-semibold rounded-full px-4 py-2"
          >
            Tout refuser
          </button>
          <button
            onClick={() => close('configure')}
            className="text-[13.5px] font-semibold underline underline-offset-2 text-neutral-700 hover:text-black px-2 py-2"
          >
            Paramétrer
          </button>
        </div>
      </div>
    </div>
  );
}
