import React from 'react';
import { CheckCircle2 } from 'lucide-react';

// 3-step progress used in the verification flow.
const stepsLabel = ['Accueil', 'Vérification', 'Informations'];

export default function VerifSteps({ current = 0 }) {
  return (
    <div className="w-full max-w-[420px] mx-auto px-4">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-[2px] bg-neutral-300 rounded-full" />
        <div
          className="absolute left-[10%] top-1/2 -translate-y-1/2 h-[2px] bg-[#15B27D] rounded-full transition-all duration-500"
          style={{ width: `${(current / (stepsLabel.length - 1)) * 80}%` }}
        />
        {stepsLabel.map((label, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <div key={label} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border-2 transition-colors ${
                  done
                    ? 'bg-[#15B27D] border-[#15B27D] text-white'
                    : active
                    ? 'bg-[#E9041E] border-[#E9041E] text-white'
                    : 'bg-white border-neutral-300 text-neutral-400'
                }`}
              >
                {done ? <CheckCircle2 size={15} strokeWidth={2.6} /> : i + 1}
              </div>
              <span className={`mt-1.5 text-[10.5px] font-semibold ${active || done ? 'text-[#0F1B33]' : 'text-neutral-500'}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
