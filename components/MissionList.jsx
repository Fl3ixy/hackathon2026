"use client";

import React, { useEffect, useState } from "react";
import MissionCard from "./MissionCard";
import ConfirmationModal from "./ConfirmationModal";
import "../styles/confetti.css";

const DEFAULT_MISSIONS = [
  { id: "m1", title: "Balade au parc", subtitle: "Promenade conviviale", description: "Une balade de 30 min au parc avec des amis.", emoji: "🚶", points: 10 },
  { id: "m2", title: "Soirée cinéma", subtitle: "Film local", description: "Aller au cinéma du quartier pour une séance.", emoji: "🎬", points: 15 },
  { id: "m3", title: "Café-rencontre", subtitle: "Rencontre associative", description: "Participer à un moment convivial autour d'un café.", emoji: "☕", points: 8 },
  { id: "m4", title: "Atelier lecture", subtitle: "Club lecture", description: "Lire ensemble et partager ses impressions.", emoji: "📚", points: 12 },
];

export default function MissionList({ onPointsChange, onListInfo }) {
  const [missions] = useState(DEFAULT_MISSIONS);
  const [statusMap, setStatusMap] = useState({}); // id -> 'idle' | 'in_progress' | 'done'
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    // load saved state
    try {
      const saved = JSON.parse(localStorage.getItem("missions_status") || "{}");
      const savedPoints = Number(localStorage.getItem("missions_points") || 0);
      setStatusMap(saved);
      setPoints(savedPoints);
    } catch (e) {
      // ignore
    }
    // remonte le nombre total de missions au parent si demandé
    if (typeof onListInfo === "function") {
      onListInfo({ total: missions.length });
    }
  }, [missions.length, onListInfo]);

  useEffect(() => {
    localStorage.setItem("missions_status", JSON.stringify(statusMap));
    localStorage.setItem("missions_points", String(points));
    if (typeof onPointsChange === 'function') onPointsChange(points);
  }, [statusMap, points, onPointsChange]);

  // computed counts for the vertical info rail
  const total = missions.length;
  const available = missions.filter((m) => (statusMap[m.id] || "idle") === "idle").length;
  const inProgressCount = missions.filter((m) => (statusMap[m.id] || "idle") === "in_progress").length;
  const doneCount = missions.filter((m) => (statusMap[m.id] || "idle") === "done").length;

  useEffect(() => {
    if (typeof onListInfo === "function") {
      onListInfo({ total, available, inProgress: inProgressCount, done: doneCount });
    }
  }, [total, available, inProgressCount, doneCount, onListInfo]);

  const startMission = (id, cancel = false) => {
    setStatusMap((s) => ({ ...s, [id]: cancel ? "idle" : "in_progress" }));
    if (!cancel) {
      setMessage("Mission enregistrée ✅");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const confirmStart = (id) => setConfirm({ open: true, id });
  const handleCancelStart = () => setConfirm({ open: false, id: null });
  const handleConfirmStart = () => {
    if (!confirm.id) return;
    startMission(confirm.id, false);
    setConfirm({ open: false, id: null });
  };

  const completeMission = (id) => {
    const mission = missions.find((m) => m.id === id);
    if (!mission) return;
    setStatusMap((s) => ({ ...s, [id]: "done" }));
    setPoints((p) => p + mission.points);
    setConfetti(true);
    setMessage(`Mission terminée — +${mission.points} pts 🎉`);
    setTimeout(() => setMessage(""), 3500);
    // turn off confetti after animation
    setTimeout(() => setConfetti(false), 2200);
  };

  return (
    <section>
      <div className="mb-4 flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Missions</h2>
          <p className="text-sm text-gray-600">Choisis une mission et gagne des points en la terminant.</p>
        </div>

        <div className="flex items-center gap-3">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher..." className="rounded-full px-4 py-2 shadow-sm w-64 md:w-72" />
          <button onClick={() => { setStatusMap({}); setPoints(0); localStorage.removeItem('missions_status'); localStorage.removeItem('missions_points'); setMessage('Données réinitialisées'); setTimeout(()=>setMessage(''),2000); }} className="rounded-md border px-3 py-2 text-sm">Réinitialiser</button>
          <div className="text-sm">Total points : <strong>{points}</strong></div>
        </div>
      </div>

      {message && <div className="mb-4 rounded border bg-indigo-50 p-3 text-sm text-indigo-700">{message}</div>}

      <div className="md:flex md:items-start md:gap-6">
        {/* Vertical info rail (hidden on small screens) - sticky and slightly rotated for a lively look */}
        <aside className="hidden md:flex md:flex-col w-44 gap-4 sticky top-24 transform md:-translate-y-6">
          <div className="rounded-lg bg-white p-4 shadow-sm text-sm rotate-1">
            <div className="font-semibold text-indigo-600">Infos</div>
            <div className="mt-3 text-xs text-gray-600">Total
              <div className="mt-1 text-lg font-bold text-black">{total}</div>
            </div>
            <div className="mt-3 text-xs text-gray-600">Disponibles
              <div className="mt-1 text-lg font-bold text-black">{available}</div>
            </div>
            <div className="mt-3 text-xs text-gray-600">En cours
              <div className="mt-1 text-lg font-bold text-black">{inProgressCount}</div>
            </div>
            <div className="mt-3 text-xs text-gray-600">Terminées
              <div className="mt-1 text-lg font-bold text-black">{doneCount}</div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm text-sm -rotate-1">
            <div className="font-semibold text-indigo-600">Actions rapides</div>
            <div className="mt-3 flex flex-col gap-2">
              <button onClick={() => { setQuery(''); }} className="rounded-md border px-3 py-2 text-sm text-left">Effacer recherche</button>
              <button onClick={() => { setStatusMap({}); setPoints(0); localStorage.removeItem('missions_status'); localStorage.removeItem('missions_points'); setMessage('Données réinitialisées'); setTimeout(()=>setMessage(''),2000); }} className="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white">Réinitialiser tout</button>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          {/* Masonry-style using CSS columns to avoid strict rows */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {missions.filter(m => m.title.toLowerCase().includes(query.toLowerCase()) || m.subtitle.toLowerCase().includes(query.toLowerCase())).map((m, idx) => (
              <div key={m.id} className="break-inside-avoid mb-4">
                <MissionCard
                  index={idx}
                  mission={m}
                  status={statusMap[m.id] || "idle"}
                  onStart={(id, cancel) => { if (cancel) startMission(id, cancel); else confirmStart(id); }}
                  onComplete={completeMission}
                />
              </div>
            ))}
          </div>
        </div>
      </div> 

      <ConfirmationModal open={confirm.open} title={"Confirmer la mission"} description={"Voulez-vous enregistrer cette mission ?"} onCancel={handleCancelStart} onConfirm={handleConfirmStart} />

      {/* simple confetti using emojis (accessible) */}
      {confetti && (
        <div className="confetti" aria-hidden="true">
          <div className="confetti-grid" role="status" aria-hidden="true">
            {['🎉','✨','🎊','👏','🥳','🌟'].map((c,i)=>(<div key={i} className="confetti-piece" style={{fontSize: '24px'}}>{c}</div>))}
          </div>
        </div>
      )}
    </section>
  );
}
