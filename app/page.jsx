"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function HomePage() {
  // Pop-up inscription événement
  const [showModal, setShowModal] = useState(false);
  const [modalEvent, setModalEvent] = useState(null);

  const handleInscriptionClick = (eventName) => {
    setModalEvent(eventName);
    setShowModal(true);
  };

  const handleConfirmInscription = () => {
    setShowModal(false);
    setTimeout(
        () => {}, // Confirmation sans alert popup
        200
    );
  };

  const handleCancelInscription = () => {
    setShowModal(false);
  };
  const listRef = useRef(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const savedPoints = Number(localStorage.getItem("missions_points") || 0);
    setPoints(savedPoints);
  }, []);

  // Récupération des infos utilisateur
  const [profilePic, setProfilePic] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("profilePic") || ""
      : "",
  );
  const [firstName, setFirstName] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("userFirstName") || "Jean Pierre"
      : "Jean Pierre",
  );

  // Message dynamique selon l'heure
  const [greeting, setGreeting] = useState("Bonjour");
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 18) setGreeting("Bonsoir");
    else if (hour >= 12) setGreeting("Bon après-midi");
    else setGreeting("Bonjour");
  }, []);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-pink-50 p-4">
        <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-2xl border border-white/40 bg-white/80 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
          {/* Photo de profil ou icône */}
          <div className="group relative cursor-pointer">
            {profilePic ? (
              <Image
                src={profilePic}
                alt="Photo de profil"
                width={96}
                height={96}
                className="h-24 w-24 rounded-full border-4 border-red-200 object-cover shadow-lg transition-all duration-300"
              />
            ) : (
              <span
                className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-red-200 bg-gray-200 text-6xl text-gray-400 shadow-lg transition-all duration-300"
                aria-label="Icône utilisateur"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-16 w-16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118A7.5 7.5 0 0112 15.75a7.5 7.5 0 017.5 4.368M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            )}
          </div>
          {/* Message de bienvenue */}
          <div className="text-center">
            <h1 className="mb-2 text-2xl font-bold text-gray-800 sm:text-3xl">
              {greeting}, {firstName}&nbsp;!
            </h1>
            <p className="text-base text-gray-600 sm:text-lg">
              Bienvenue sur votre espace personnel.
              <br />
              Retrouvez ici vos missions, vos points et toutes vos actions
              solidaires&nbsp;!
            </p>
          </div>
          {/* Points */}
          <div className="mt-2 flex flex-col items-center gap-1">
            <span className="text-sm text-gray-500">Points cumulés</span>
            <span className="text-3xl font-extrabold text-red-500 drop-shadow">
              {points}
            </span>
          </div>
          {/* Navigation principale */}
          <nav className="mt-4 flex w-full flex-col gap-2">
            <a
              href="/account"
              className="w-full rounded-lg bg-indigo-100 px-4 py-2 text-center font-semibold text-indigo-700 transition hover:bg-indigo-200"
            >
              Mon compte
            </a>
            <a
              href="/task"
              className="w-full rounded-lg bg-pink-100 px-4 py-2 text-center font-semibold text-pink-700 transition hover:bg-pink-200"
            >
              Mes missions
            </a>
            <a
              href="/about"
              className="w-full rounded-lg bg-yellow-100 px-4 py-2 text-center font-semibold text-yellow-700 transition hover:bg-yellow-200"
            >
              À propos
            </a>
            <a
              href="/contact"
              className="w-full rounded-lg bg-green-100 px-4 py-2 text-center font-semibold text-green-700 transition hover:bg-green-200"
            >
              Contact
            </a>
          </nav>
          {/* Actus & sorties */}
          <div className="mt-6 w-full">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-800">
              <svg
                className="h-6 w-6 text-indigo-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Actualités & sorties à venir
            </h2>
            <ul className="flex flex-col gap-3">
              {/* Atelier numérique */}
              <li
                className="group flex flex-col items-start gap-3 rounded-xl border-l-4 border-indigo-400 bg-white/95 p-4 text-gray-700 shadow-sm transition hover:shadow-lg sm:flex-row sm:items-center"
                tabIndex={0}
                aria-label="Atelier numérique à la médiathèque le 5 février"
              >
                <div className="flex w-full items-center gap-3">
                  <span className="flex min-w-[48px] flex-col items-center">
                    <svg
                      className="mb-1 h-6 w-6 text-indigo-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-base font-bold text-indigo-600">
                      05/02
                    </span>
                  </span>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-bold text-gray-800">
                        Atelier numérique
                      </span>
                    </div>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="ml-2 overflow-visible rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-semibold text-indigo-700">
                        Atelier
                      </span>
                    </div>
                    <div className="mb-2 text-sm text-gray-500">10h-12h</div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="rounded bg-indigo-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-indigo-600"
                        onClick={() =>
                          handleInscriptionClick(
                            "Atelier numérique à la médiathèque",
                          )
                        }
                      >
                        S&apos;inscrire
                      </button>
                      <button className="rounded bg-gray-100 px-3 py-1 text-xs font-semibold text-indigo-700 transition hover:bg-gray-200">
                        En savoir plus
                      </button>
                    </div>
                  </div>
                </div>
              </li>
              {/* Sortie cinéma */}
              <li
                className="group flex flex-col items-start gap-3 rounded-xl border-l-4 border-pink-400 bg-white/95 p-4 text-gray-700 shadow-sm transition hover:shadow-lg sm:flex-row sm:items-center"
                tabIndex={0}
                aria-label="Sortie cinéma intergénérationnelle le 10 février"
              >
                <div className="flex w-full items-center gap-3">
                  <span className="flex min-w-[48px] flex-col items-center">
                    <svg
                      className="mb-1 h-6 w-6 text-pink-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14m-6 0l-4.553 2.276A2 2 0 012 14.382V9.618a2 2 0 012.447-1.894L9 10m6 4V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v8m6 0a6 6 0 01-12 0"
                      />
                    </svg>
                    <span className="text-base font-bold text-pink-600">
                      10/02
                    </span>
                  </span>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-bold text-gray-800">
                        Sortie cinéma
                      </span>
                    </div>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="ml-2 overflow-visible rounded-full bg-pink-100 px-3 py-0.5 text-xs font-semibold text-pink-700">
                        Sortie
                      </span>
                    </div>
                    <div className="mb-2 text-sm text-gray-500">14h</div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="rounded bg-pink-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-pink-600"
                        onClick={() =>
                          handleInscriptionClick(
                            "Sortie cinéma intergénérationnelle",
                          )
                        }
                      >
                        S&apos;inscrire
                      </button>
                      <button className="rounded bg-gray-100 px-3 py-1 text-xs font-semibold text-pink-700 transition hover:bg-gray-200">
                        En savoir plus
                      </button>
                    </div>
                  </div>
                </div>
              </li>
              {/* Café-rencontre */}
              <li
                className="group flex flex-col items-start gap-3 rounded-xl border-l-4 border-green-400 bg-white/95 p-4 text-gray-700 shadow-sm transition hover:shadow-lg sm:flex-row sm:items-center"
                tabIndex={0}
                aria-label="Café-rencontre solidaire le 15 février"
              >
                <div className="flex w-full items-center gap-3">
                  <span className="flex min-w-[48px] flex-col items-center">
                    <svg
                      className="mb-1 h-6 w-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 17l4 4 4-4m-4-5v9"
                      />
                    </svg>
                    <span className="text-base font-bold text-green-600">
                      15/02
                    </span>
                  </span>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-bold text-gray-800">
                        Café-rencontre
                      </span>{" "}
                    </div>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="ml-2 overflow-visible rounded-full bg-green-100 px-3 py-0.5 text-xs font-semibold text-green-700">
                        Rencontre
                      </span>
                    </div>
                    <div className="mb-2 text-sm text-gray-500">16h</div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="rounded bg-green-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-green-600"
                        onClick={() =>
                          handleInscriptionClick("Café-rencontre solidaire")
                        }
                      >
                        S&apos;inscrire
                      </button>
                      <button className="rounded bg-gray-100 px-3 py-1 text-xs font-semibold text-green-700 transition hover:bg-gray-200">
                        En savoir plus
                      </button>
                    </div>
                  </div>
                </div>
              </li>
              {/* Conférence */}
              <li
                className="group flex flex-col items-start gap-3 rounded-xl border-l-4 border-yellow-400 bg-white/95 p-4 text-gray-700 shadow-sm transition hover:shadow-lg sm:flex-row sm:items-center"
                tabIndex={0}
                aria-label="Conférence Bien vivre chez soi le 20 février"
              >
                <div className="flex w-full items-center gap-3">
                  <span className="flex min-w-[48px] flex-col items-center">
                    <svg
                      className="mb-1 h-6 w-6 text-yellow-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 10v6m8-8a8 8 0 11-16 0 8 8 0 0116 0z"
                      />
                    </svg>
                    <span className="text-base font-bold text-yellow-600">
                      20/02
                    </span>
                  </span>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-bold text-gray-800">
                        Bien vivre chez soi
                      </span>
                    </div>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="ml-2 overflow-visible rounded-full bg-yellow-100 px-3 py-0.5 text-xs font-semibold text-yellow-700">
                        Conférence
                      </span>
                    </div>
                    <div className="mb-2 text-sm text-gray-500">18h</div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="rounded bg-yellow-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-yellow-600"
                        onClick={() =>
                          handleInscriptionClick(
                            "Conférence &quot;Bien vivre chez soi&quot;",
                          )
                        }
                      >
                        S&apos;inscrire
                      </button>
                      <button className="rounded bg-gray-100 px-3 py-1 text-xs font-semibold text-yellow-700 transition hover:bg-gray-200">
                        En savoir plus
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
      {/* Pop-up de confirmation inscription */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          role="dialog"
          aria-modal="true"
        >
          <div className="mx-2 flex w-full max-w-xs flex-col items-center gap-4 rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-2 text-lg font-bold text-red-700">
              Confirmer l&apos;inscription ?
            </div>
            <div className="mt-2 flex w-full flex-row justify-center gap-4">
              <button
                onClick={handleConfirmInscription}
                className="rounded-full bg-red-600 px-5 py-2 font-bold text-white shadow transition hover:bg-red-700"
              >
                Oui, je confirme
              </button>
              <button
                onClick={handleCancelInscription}
                className="rounded-full bg-gray-200 px-5 py-2 font-bold text-gray-700 shadow transition hover:bg-gray-300"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
