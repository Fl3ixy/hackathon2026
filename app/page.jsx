"use client";

import React, { useRef, useState, useEffect } from "react";

import HomeHero from "../components/HomeHero";
import MissionList from "../components/MissionList";

export default function HomePage() {
  const listRef = useRef(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const savedPoints = Number(localStorage.getItem("missions_points") || 0);
    setPoints(savedPoints);
  }, []);

  const [totalMissions, setTotalMissions] = useState(0);
  const [completed, setCompleted] = useState(0);

  // compute completed missions from saved status whenever points change or on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('missions_status') || '{}');
      const done = Object.values(saved).filter((v) => v === 'done').length;
      setCompleted(done);
    } catch (e) {
      setCompleted(0);
    }
  }, [points]);

  const handleExplore = () => {
    if (listRef.current) listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 p-6">
      <div className="mx-auto max-w-6xl">
        <HomeHero points={points} onExplore={handleExplore} />

        {/* Main layout with sidebar */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* Features */}
            <section className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-lg bg-white p-6 shadow">
                <div className="mb-3 text-2xl">🤝</div>
                <h3 className="mb-2 font-semibold text-black">Entraide Locale</h3>
                <p className="text-sm text-gray-600">Créez des liens avec votre voisinage et aidez ceux qui en ont besoin.</p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow">
                <div className="mb-3 text-2xl">📍</div>
                <h3 className="mb-2 font-semibold text-black">Missions Simples</h3>
                <p className="text-sm text-gray-600">Balades, courses, petits services — choisissez une mission près de chez vous.</p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow">
                <div className="mb-3 text-2xl">🏆</div>
                <h3 className="mb-2 font-semibold text-black">Récompenses</h3>
                <p className="text-sm text-gray-600">Gagnez des points et des badges pour vos bonnes actions.</p>
              </div>
            </section>

            {/* Actions */}
            <section className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-lg font-semibold text-black">Je souhaite...</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <div className="mb-3 text-3xl">💜</div>
                  <h3 className="mb-2 font-semibold text-black">Devenir Bénévole</h3>
                  <p className="mb-4 text-sm text-gray-600">Aidez des personnes âgées dans votre quartier et gagnez des récompenses pour vos actions.</p>
                  <a href="/task" className="text-indigo-600 font-semibold">Commencer à aider →</a>
                </div>

                <div>
                  <div className="mb-3 text-3xl">🧑‍🤝‍🧑</div>
                  <h3 className="mb-2 font-semibold text-black">Recevoir de l'aide</h3>
                  <p className="mb-4 text-sm text-gray-600">Publiez vos besoins et connectez‑vous avec des bénévoles prêts à aider.</p>
                  <a href="/contact" className="text-indigo-600 font-semibold">Trouver de l'aide →</a>
                </div>
              </div>
            </section>

            {/* Missions list */}
            <section ref={listRef} className="rounded-lg bg-white p-6 shadow">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-black">Missions Disponibles</h2>
                  <p className="text-sm text-gray-600">Choisis une mission et gagne des points.</p>
                </div>
                <div className="flex items-center gap-3">
                  <a className="text-sm text-indigo-600 font-semibold" href="#help">Besoin d'aide ?</a>
                </div>
              </div>

              <MissionList onPointsChange={(p) => setPoints(p)} onListInfo={({ total }) => setTotalMissions(total)} />
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow text-center">
              <div className="text-sm text-gray-500">Vos points</div>
              <div className="mt-2 flex items-center justify-center gap-3">
                <div className="rounded-full bg-indigo-50 p-3 text-indigo-600 text-2xl">🏅</div>
                <div>
                  <div className="text-lg font-bold text-black">{points}</div>
                  <div className="text-sm text-gray-600">points accumulés</div>
                </div>
              </div>
              <a href="/rewards" className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Voir récompenses</a>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <div className="text-sm text-gray-500">Missions complétées</div>
              <div className="mt-2 text-2xl font-bold text-black">{completed}</div>
              <div className="mt-3">
                <div className="h-2 w-full rounded bg-indigo-100">
                  <div className="h-2 rounded bg-indigo-600" style={{ width: `${totalMissions ? Math.round((completed / totalMissions) * 100) : 0}%` }} />
                </div>
                <div className="mt-2 text-xs text-gray-500">{totalMissions ? `${Math.round((completed / totalMissions) * 100)}%` : '—'} complété</div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-4 text-center shadow">
              <button onClick={() => (window.location.href = '/task')} className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Poster une activité</button>
              <button onClick={() => (window.location.href = '/register')} className="mt-3 w-full rounded-md border border-indigo-200 px-4 py-2 text-indigo-600">Devenir bénévole</button>
            </div>
          </aside>
        </div>

        {/* Footer CTA */}
        <section id="help" className="my-12 rounded-lg bg-white p-6 text-center shadow">
          <h3 className="mb-2 text-xl font-semibold text-black">Besoin d'un coup de main ?</h3>
          <p className="mb-4 text-sm text-gray-600">Contactez notre équipe ou commencez une discussion avec un bénévole.</p>
          <a href="/contact" className="inline-block rounded-lg bg-indigo-600 px-6 py-3 text-white shadow hover:bg-indigo-700">Contacter</a>
        </section>
      </div>
    </main>
  );
}
