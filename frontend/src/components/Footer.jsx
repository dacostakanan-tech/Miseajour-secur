import React from 'react';
import { Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0F1B33] text-neutral-300">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 py-12 md:py-14">
        <div className="grid md:grid-cols-4 gap-8 md:gap-10">
          {/* Logo + intro */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="text-white font-extrabold text-[20px] tracking-tight">SG</span>
              <svg width="26" height="26" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="0" width="40" height="17" fill="#E9041E" />
                <rect x="0" y="23" width="40" height="17" fill="#ffffff" />
              </svg>
            </div>
            <p className="mt-4 text-[13px] leading-[1.6] text-neutral-400">
              Votre sécurité est notre priorité. Mettez à jour votre Secur&rsquo;Pass pour
              bénéficier d&rsquo;une protection renforcée.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="text-white text-[14px] font-bold mb-4">Liens rapides</h4>
            <ul className="space-y-2.5 text-[13px]">
              {[
                'Accueil',
                'Mettre à jour mon Secur’Pass',
                'Questions fréquentes',
              ].map((l) => (
                <li key={l}>
                  <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-[14px] font-bold mb-4">Contact</h4>
            <ul className="space-y-2.5 text-[13px]">
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-[#E9041E] shrink-0" />
                <span>09 69 39 00 00</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#E9041E] shrink-0" />
                <a href="mailto:support@sg.fr" className="hover:text-white transition-colors">
                  support@sg.fr
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={14} className="text-[#E9041E] shrink-0" />
                <span>Service disponible 24h/24, 7j/7</span>
              </li>
            </ul>
          </div>

          {/* Informations légales */}
          <div>
            <h4 className="text-white text-[14px] font-bold mb-4">Informations légales</h4>
            <ul className="space-y-2.5 text-[13px]">
              {[
                'Mentions légales',
                'Politique de confidentialité',
                'Conditions d’utilisation',
                'Gestion des cookies',
              ].map((l) => (
                <li key={l}>
                  <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-[12.5px] text-neutral-400">
            © {new Date().getFullYear()} Société Générale. Tous droits réservés.
          </p>
          <p className="mt-1 text-[11.5px] text-neutral-500">
            Sécurisé par cryptage SSL 256-bit
          </p>
        </div>
      </div>
    </footer>
  );
}
