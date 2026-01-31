"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Info } from "lucide-react";

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [role, setRole] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPwHelp, setShowPwHelp] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => setSuccess(false), 4000);
      return () => clearTimeout(t);
    }
  }, [success]);

  const validate = () => {
    const e = {};
    if (!firstName.trim()) e.firstName = "Prénom requis";
    if (!lastName.trim()) e.lastName = "Nom requis";
    if (!role) e.role = "Sélectionnez un rôle";
    if (!ageRange) e.ageRange = "Sélectionnez une tranche d'âge";
    if (!/^\d{10}$/.test(phone.replace(/\s+/g, "")))
      e.phone = "Entrer un n° valide (10 chiffres)";
    if (password.length < 8)
      e.password = "Le mot de passe doit faire au moins 8 caractères";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const passwordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (password.length >= 12) score++;
    return score; // 0-5
  };

  const strengthLabel = () => {
    const s = passwordStrength();
    if (!password) return "";
    if (s <= 1) return "Faible";
    if (s <= 3) return "Moyen";
    return "Fort";
  };

  const handlePhoneChange = (value) => {
    // remove non-digits, keep at most 10
    const digits = value.replace(/\D/g, "").slice(0, 10);
    // format as groups: 2 2 2 2 2 -> 05 12 34 56 78
    const parts = digits.match(/.{1,2}/g) || [];
    setPhone(parts.join(" "));
  };

  const progress = () => {
    const fields = [firstName, lastName, role, ageRange, phone, password];
    const filled = fields.filter((f) => f && f.toString().trim() !== "").length;
    return Math.round((filled / fields.length) * 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulate request
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSuccess(true);
    // For demo, clear password only
    setPassword("");
  };

  // progress color: hue 0 (red) -> 120 (green) based on completion; solid green at 100%
  const pct = progress();
  const hue = Math.round((pct / 100) * 120);
  const barColor = pct === 100 ? "#16a34a" : `hsl(${hue} 70% 45%)`;

  return (
    <div className="mx-auto w-full max-w-5xl rounded-lg bg-white/90 p-6 text-black shadow-lg backdrop-blur">
      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
        <aside className="flex flex-col justify-center p-4">
          <h2 className="mb-2 text-3xl font-bold">Créer votre compte</h2>
          <div className="my-6 text-sm text-gray-700">
            Besoin d&apos;aide ? Appelez :{" "}
            <a
              href="tel:+33123456789"
              className="font-semibold text-red-600 duration-75 text-base underline"
            >
              01 23 45 67 89
            </a>
          </div>
          <ul className="space-y-4 text-sm">
            {" "}
            <li className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong>Simplicité</strong>
                <div className="text-gray-600">
                  Site internet accessible à tous.
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">📞</span>
              <div>
                <strong>Assistance</strong>
                <div className="text-gray-600">
                  Aide téléphonique disponible si nécessaire.
                </div>
              </div>
            </li>
            <div className="mt-6 text-sm text-gray-700">
              Déja inscrit ?{" "}
              <a href="/login" className="font-semibold text-red-600 text-base underline">
                Se connecter
              </a>
            </div>
          </ul>
        </aside>

        <section className="rounded-lg bg-white p-4 shadow-inner">
          <div className="mb-4 h-3 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-3 transition-all"
              style={{
                width: `${pct}%`,
                backgroundColor: barColor,
                transition: "width 400ms ease, background-color 400ms ease",
              }}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-base font-medium">
                  Prénom
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`w-full rounded-lg border px-4 py-3 text-lg ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Jean"
                  aria-label="Prénom"
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-base font-medium">Nom</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={`w-full rounded-lg border px-4 py-3 text-lg ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Dupont"
                  aria-label="Nom"
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-base font-medium">Rôle</label>
              <div className="mb-3 flex flex-col gap-3 sm:flex-row">
                {[
                  { id: "benevole", label: "Bénévole" },
                  { id: "utilisateur", label: "Utilisateur" },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 sm:w-auto ${role === opt.id ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={opt.id}
                      checked={role === opt.id}
                      onChange={() => setRole(opt.id)}
                      className="accent-red-600"
                    />
                    <span className="text-base text-black">{opt.label}</span>
                  </label>
                ))}
              </div>

              <label className="mb-2 block text-base font-medium">
                Tranche d&apos;âge
              </label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {[
                  { id: "18-25", label: "18-25", emoji: "🧑" },
                  { id: "25-50", label: "25-50", emoji: "🧑‍💼" },
                  { id: "50-80+", label: "50-80+", emoji: "👵" },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`relative flex min-h-[104px] w-full transform cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border px-4 py-4 transition focus-within:ring-2 focus-within:ring-red-200 hover:-translate-y-1 sm:flex-row sm:justify-start ${ageRange === opt.id ? "border-red-400 bg-red-50 shadow-lg" : "border-gray-200 bg-white"}`}
                  >
                    <input
                      type="radio"
                      name="age"
                      value={opt.id}
                      checked={ageRange === opt.id}
                      onChange={() => setAgeRange(opt.id)}
                      className="peer sr-only"
                      aria-label={`Tranche ${opt.label}`}
                    />

                    <div className="mb-2 flex-shrink-0 text-4xl sm:mb-0 sm:text-3xl">
                      {opt.emoji}
                    </div>

                    <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                      <span className="text-base font-medium text-black">
                        {opt.label}
                      </span>
                      <span className="text-xs text-gray-500">Cliquez</span>
                    </div>

                    {ageRange === opt.id ? (
                      <span className="absolute right-3 top-3 bg-red-200 p-1 rounded-full text-2xl text-purple-600" role="img" aria-label="Pouce levé">
                        👍
                      </span>
                    ) : null}
                  </label>
                ))}
              </div>
              {errors.ageRange && (
                <p className="mt-1 text-xs text-red-600">{errors.ageRange}</p>
              )}
              {errors.role && (
                <p className="mt-1 text-xs text-red-600">{errors.role}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-base font-medium">
                N° de téléphone
              </label>
              <input
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                inputMode="tel"
                className={`w-full rounded-lg border px-4 py-3 text-lg ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                placeholder="06 12 34 56 78"
                aria-label="Numéro de téléphone"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-base font-medium">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-lg border px-4 py-3 text-lg ${errors.password ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Votre mot de passe"
                  aria-label="Mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-white/0 px-2 py-1 text-sm font-medium text-red-600"
                >
                  {showPassword ? "Cacher🙈" : "Voir👀"}
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-16 rounded ${passwordStrength() >= 4 ? "bg-green-500" : passwordStrength() >= 2 ? "bg-yellow-400" : "bg-red-400"}`}
                  />
                  <span className="text-black">{strengthLabel()}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-black">Min 8 caractères</span>

                  <div className="group relative">
                    <button
                      type="button"
                      aria-expanded={showPwHelp}
                      aria-controls="pw-help"
                      onClick={() => setShowPwHelp((s) => !s)}
                      className="ml-1 rounded-full bg-gray-100 p-1 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
                      title="Aide mot de passe"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.5a1 1 0 10-1.5 0 1.25 1.25 0 001.5 0zM9 9h2v5H9V9z" />
                      </svg>
                    </button>

                    <div
                      id="pw-help"
                      role="tooltip"
                      className={`absolute bottom-full right-0 z-10 mb-2 w-64 rounded border bg-white p-3 text-sm text-gray-800 shadow-lg ${showPwHelp ? "block" : "hidden"} md:group-hover:block md:group-focus:block`}
                    >
                      <strong className="mb-1 block font-medium">
                        Mot de passe idéal
                      </strong>
                      <ul className="list-disc pl-4 text-xs">
                        <li>8+ caractères (12+ recommandé)</li>
                        <li>
                          Mélange majuscules, minuscules, chiffres et symboles
                        </li>
                        <li>Éviter noms ou dates personnelles</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl border-b-8 border-red-800 bg-red-600 px-6 py-3 text-lg font-semibold text-white shadow duration-75 hover:scale-105 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Enregistrement..." : "S’inscrire"}
              </button>
            </div>

            {success && (
              <div
                className="mt-3 rounded border border-green-200 bg-green-50 p-3 text-black"
                role="status"
                aria-live="polite"
              >
                <strong>Inscription réussie ✅</strong>
                <div className="mt-1 text-sm">
                  Merci {firstName || ""}. Rôle : {role || "-"}, Tranche :{" "}
                  {ageRange || "-"}
                </div>
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}
