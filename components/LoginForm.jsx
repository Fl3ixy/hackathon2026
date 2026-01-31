"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Info } from "lucide-react";

export default function LoginForm() {
  const [identifier, setIdentifier] = useState(""); // email or phone
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const helpRef = useRef(null);

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(t);
    }
  }, [success]);

  // close help on outside click
  useEffect(() => {
    if (!showHelp) return;
    function onDocClick(e) {
      if (helpRef.current && !helpRef.current.contains(e.target))
        setShowHelp(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [showHelp]);

  const validate = () => {
    const e = {};
    if (!identifier.trim()) e.identifier = "Email ou téléphone requis";
    if (password.length < 8) e.password = "Mot de passe min 8 caractères";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSuccess(true);
    setPassword("");
  };

  return (
    <div className="mx-auto w-full max-w-4xl rounded-lg bg-white/90 p-6 text-black shadow-lg backdrop-blur">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <aside className="flex flex-col justify-center p-4">
          <h2 className="mb-2 text-2xl font-bold">Bienvenue</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-2xl">🔐</span>
              <div>
                <strong>Sécurisé</strong>
                <div className="text-gray-600">
                  Connexion sécurisée, rapide et Simplifié.
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">💬</span>
              <div>
                <strong>Support</strong>
                <div className="text-gray-600">
                  Assistance téléphonique si besoin.{" "}
                  <a
                    href="tel:+33123456789"
                    className="font-semibold text-red-600 duration-75 text-base underline"
                  >
                    01 23 45 67 89
                  </a>{" "}
                </div>
              </div>
            </li>
          </ul>

          <div className="mt-6 text-sm text-gray-700">
            Pas encore inscrit ?{" "}
            <a href="/register" className="font-semibold text-red-600 duration-75 text-base underline">
              Créer un compte
            </a>
          </div>
        </aside>

        <section className="rounded-lg bg-white p-4 shadow-inner">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-base font-medium">
                N° de téléphone
              </label>
              <input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className={`w-full rounded-lg border px-4 py-3 text-lg ${errors.identifier ? "border-red-500" : "border-gray-300"}`}
                placeholder="01 02 03 04 05"
                aria-label="Téléphone"
              />
              {errors.identifier && (
                <p className="mt-1 text-xs text-red-600">{errors.identifier}</p>
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
                    className={`h-2 w-16 rounded ${password.length >= 12 ? "bg-green-500" : password.length >= 8 ? "bg-yellow-400" : "bg-red-400"}`}
                  />
                  <span className="text-black">
                    {password.length === 0
                      ? ""
                      : password.length >= 12
                        ? "Fort"
                        : password.length >= 8
                          ? "Moyen"
                          : "Faible"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-black">Min 8 caractères</span>

                  <div className="relative" ref={helpRef}>
                    <button
                      type="button"
                      aria-expanded={showHelp}
                      aria-controls="pw-help"
                      onClick={() => setShowHelp((s) => !s)}
                      title="Aide mot de passe"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.5a1 1 0 10-1.5 0 1.25 1.25 0 001.5 0zM9 9h2v5H9V9z" />
                      </svg>
                    </button>

                    <div id="pw-help" role="tooltip" className={`absolute bottom-full right-0 mb-2 w-64 rounded border bg-white p-3 text-sm text-gray-800 shadow-lg ${showHelp ? "block" : "hidden"}`}>
                      <strong className="mb-1 block font-medium">
                        Idée mot de passe
                      </strong>
                      <ul className="list-disc pl-4 text-xs">
                        <li>8+ caractères (12+ recommandé)</li>
                        <li>Mélange lettres, chiffres et symboles</li>
                        <li>Ne pas utiliser de dates personnelles</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg border-b-8 border-red-800 bg-red-600 px-6 py-3 text-lg font-semibold text-white shadow disabled:opacity-60"
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </div>

            {success && (
              <div
                className="mt-3 rounded border border-green-200 bg-green-50 p-3 text-black"
                role="status"
                aria-live="polite"
              >
                <strong>Connexion réussie ✅</strong>
                <div className="mt-1 text-sm">Bienvenue !</div>
              </div>
            )}

            <div className="mt-3 text-sm text-gray-600">
              <a href="/forgot" className="text-red-600">
                Mot de passe oublié ?
              </a>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
