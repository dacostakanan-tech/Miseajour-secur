import React, { useMemo, useState } from 'react';
import { Volume2 } from 'lucide-react';

/**
 * SG password keypad: 4x4 grid where 10 digits (0-9) are randomly placed.
 * Used after the customer enters their identifier on the Espace Client page.
 *
 * Props:
 *  - length: required password length (default 6)
 *  - value: current entered string of digits (controlled)
 *  - onChange: callback (newValue)
 *  - onValidate: callback when user presses "Valider" (and length is reached)
 */
export default function SGKeypad({ length = 6, value, onChange, onValidate }) {
  const layout = useMemo(() => buildLayout(), []);
  const [pressed, setPressed] = useState(null);

  const handleClick = (n) => {
    if (value.length >= length) return;
    setPressed(`${Math.random()}-${n}`);
    setTimeout(() => setPressed(null), 120);
    onChange(value + n);
  };

  const dots = Array.from({ length }, (_, i) => i < value.length);

  return (
    <div className="w-full max-w-[280px]">
      {/* Password dots */}
      <div className="flex items-center justify-center gap-3 mb-4 h-6">
        {dots.map((filled, i) => (
          <span
            key={i}
            className={`inline-block transition-colors ${
              filled
                ? 'w-2.5 h-2.5 rounded-full bg-[#0F1B33]'
                : 'w-3 h-[2px] bg-neutral-400'
            }`}
          />
        ))}
      </div>

      {/* Grid 4 x 4 — empty cells are visible gray boxes */}
      <div className="grid grid-cols-4 gap-2 select-none">
        {layout.map((cell, idx) => {
          if (cell === null) {
            return (
              <div
                key={idx}
                className="aspect-square rounded-md bg-[#EDEDED] border border-[#E0E0E0]"
                aria-hidden="true"
              />
            );
          }
          const isPressed = pressed && pressed.endsWith(`-${cell}`);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleClick(cell)}
              className={`aspect-square rounded-md border text-[18px] font-bold transition-all ${
                isPressed
                  ? 'bg-[#0F1B33] text-white border-[#0F1B33] scale-95'
                  : 'bg-white text-[#0F1B33] border-neutral-300 hover:border-[#0F1B33]'
              }`}
            >
              {cell}
            </button>
          );
        })}
      </div>

      {/* Valider button */}
      <button
        type="button"
        onClick={() => value.length >= length && onValidate && onValidate()}
        disabled={value.length < length}
        className="mt-4 w-full bg-[#E9041E] hover:bg-[#c8031a] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-full py-2.5 text-[14.5px] transition-colors"
      >
        Valider
      </button>

      {/* Accessibility / audio keypad link */}
      <button
        type="button"
        className="mt-2 w-full text-center text-[12.5px] text-[#0F1B33] hover:underline inline-flex items-center justify-center gap-1.5"
      >
        <Volume2 size={13} /> Activer le clavier sonore
      </button>
    </div>
  );
}

// Place digits 0-9 in 10 of the 16 cells, randomly.
function buildLayout() {
  const cells = Array(16).fill(null);
  const indices = Array.from({ length: 16 }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const targets = indices.slice(0, 10);
  for (let d = 0; d < 10; d += 1) {
    cells[targets[d]] = d;
  }
  return cells;
}
