

"use client";
import React, { useEffect, useState, useRef } from "react";

import Image from "next/image";
import MissionCard from "./MissionCard";
import ConfirmationModal from "./ConfirmationModal";
import "../styles/confetti.css";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";

const DEFAULT_MISSIONS = [
  {
    id: "m1",
    title: "Balade au parc",
    subtitle: "Promenade conviviale",
    description: "Une balade de 30 min au parc avec des amis.",
    details: "Retrouvons-nous au kiosque central pour une promenade conviviale, accessible et adaptée aux capacités de chacun. Apportez des chaussures confortables et une bouteille d'eau.",
    points: 10,
    images: ["/img/ForestRunning.png"]
  },
  {
    id: "m2",
    title: "Soirée cinéma",
    subtitle: "Film local",
    description: "Aller au cinéma du quartier pour une séance.",
    details: "Projection suivie d'un petit échange autour d'un café. Les places sont limitées, inscrivez-vous rapidement.",
    points: 15,
    images: ["/img/Cinema.png"]
  },
  {
    id: "m3",
    title: "Café-rencontre",
    subtitle: "Rencontre associative",
    description: "Participer à un moment convivial autour d'un café.",
    details: "Moment d'échange intergénérationnel, tout le monde est bienvenu pour partager histoires et sourires.",
    points: 8,
    images: ["/img/coffee.png"]
  },
  {
    id: "m4",
    title: "Atelier lecture",
    subtitle: "Club lecture",
    description: "Lire ensemble et partager ses impressions.",
    details: "Apportez votre livre préféré ou venez pour (re)découvrir des lectures choisies par le groupe.",
    points: 12,
    images: ["/img/book.png"]
  },
];

export default function MissionList({ onPointsChange, onListInfo }) {
  // ...existing code...
  // selected mission (for detail frame) and panel state
  const [selected, setSelected] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(0);
  const closeBtnRef = useRef(null);

  const [missions] = useState(DEFAULT_MISSIONS);
  const [statusMap, setStatusMap] = useState({}); // id -> 'idle' | 'in_progress' | 'done'
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const [confetti, setConfetti] = useState(false);
  // (déjà déclarés plus haut, on retire ces doublons)

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

  const handleSelect = (m) => {
    setSelected(m);
    setSelectedImg(0);
    setPanelOpen(true);
  };
  const closePanel = () => {
    setPanelOpen(false);
    setTimeout(() => setSelected(null), 300);
  };

  useEffect(() => {
    if (panelOpen && closeBtnRef.current) closeBtnRef.current.focus();
  }, [panelOpen]);

  useEffect(() => {
    if (!panelOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') closePanel();
      if (e.key === 'ArrowLeft') setSelectedImg((i) => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setSelectedImg((i) => Math.min((selected?.images?.length || 1) - 1, i + 1));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [panelOpen, selected]);

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
          <div className="text-sm">Total points : <strong>{points}</strong></div>
        </div>
      </div>


      {message && <div className="mb-4 rounded border bg-red-50 p-3 text-sm text-red-700">{message}</div>}


      <div className="md:flex md:items-start md:gap-6">
        {/* Vertical info rail (hidden on small screens) - sticky and slightly rotated for a lively look */}
        <aside className="hidden md:flex md:flex-col w-44 gap-4 sticky top-24 transform md:-translate-y-6">
          <div className="rounded-lg bg-white p-4 shadow-sm text-sm rotate-1">
            <div className="font-semibold text-red-600">Infos</div>
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
            <div className="font-semibold text-red-600">Actions rapides</div>
            <div className="mt-3 flex flex-col gap-2">
              <button onClick={() => { setQuery(''); }} className="rounded-md border px-3 py-2 text-sm text-left">Effacer recherche</button>
              <button onClick={() => { setStatusMap({}); setPoints(0); localStorage.removeItem('missions_status'); localStorage.removeItem('missions_points'); setMessage('Données réinitialisées'); setTimeout(()=>setMessage(''),2000); }} className="rounded-md bg-red-600 px-3 py-2 text-sm text-white">Réinitialiser tout</button>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          {/* Horizontal grid with varied tile sizes (left-to-right flow) */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 auto-rows-fr">
            {missions.filter(m => m.title.toLowerCase().includes(query.toLowerCase()) || m.subtitle.toLowerCase().includes(query.toLowerCase())).map((m, idx) => {
              const v = idx % 6;
              // different span patterns for varied layout
              const spanClass = v === 0 ? 'md:col-span-3 md:row-span-2' : v === 1 ? 'md:col-span-2 md:row-span-1' : v === 2 ? 'md:col-span-1 md:row-span-1' : v === 3 ? 'md:col-span-2 md:row-span-2' : v === 4 ? 'md:col-span-3 md:row-span-1' : 'md:col-span-2 md:row-span-1';
              const rot = '';

              return (
                <div key={m.id} className={`relative transform ${spanClass} transition hover:scale-105`}>
                  <MissionCard
                    index={idx}
                    variant={v}
                    mission={m}
                    status={statusMap[m.id] || "idle"}
                    onStart={(id, cancel) => { if (cancel) startMission(id, cancel); else confirmStart(id); }}
                    onComplete={completeMission}
                    onSelect={() => handleSelect(m)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail panel (compact frame) */}
        {selected && (
          <>
            <div className={`fixed inset-0 z-30 bg-black bg-opacity-30 ${panelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity`} onClick={closePanel} aria-hidden="true" />

            <aside className={`fixed left-0 right-0 top-0 bottom-0 z-40 w-full max-w-full bg-gradient-to-b from-white via-indigo-50 to-pink-50 p-0 sm:p-6 flex items-center justify-center`} style={{maxWidth:'100vw', minWidth:0}} role="dialog" aria-modal="true" aria-labelledby="mission-detail-title">
              <div className="w-full max-w-xs sm:max-w-md bg-white rounded-2xl shadow-xl p-4 sm:p-6 mx-auto flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2 flex-wrap mb-2">
                  <div className="min-w-0">
                    <h3 id="mission-detail-title" className="text-2xl font-extrabold text-red-700 leading-tight break-words">{selected.title}</h3>
                    <p className="text-sm text-gray-500 break-words font-medium">{selected.subtitle}</p>
                  </div>
                  <button ref={closeBtnRef} onClick={closePanel} aria-label="Fermer" className="text-gray-400 bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-300 text-2xl font-bold transition">✕</button>
                </div>
                <div className="mt-2">
                  <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-indigo-100" style={{height:'48vw', maxHeight: '220px', minHeight:'120px', background:'#f8fafc'}}>
                    {selected.images && selected.images.length > 0 ? (
                      <Image
                        src={selected.images[selectedImg]}
                        alt={`${selected.title} image ${selectedImg + 1}`}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                        style={{maxWidth:'100%', minWidth:0, objectFit:'cover'}}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400">Aucune image</div>
                    )}
                  </div>
                </div>
                {selected.images && selected.images.length > 1 && (
                  <div className="mt-2 flex gap-2 overflow-x-auto justify-center">
                    {selected.images.map((src, i) => (
                      <button key={i} onClick={() => setSelectedImg(i)} className={`rounded-full overflow-hidden border-2 w-10 h-10 flex items-center justify-center ${selectedImg === i ? 'ring-2 ring-red-400 border-red-300' : 'border-gray-200'} transition`}>
                        <div className="relative w-full h-full">
                          <Image src={src} alt={`mini ${i + 1}`} fill className="object-cover" style={{objectFit:'cover'}} />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                <div className="mt-4 text-sm text-gray-700 break-words flex flex-col gap-2">
                  <p className="leading-relaxed font-medium">{selected.details || selected.description}</p>
                  <ul className="mt-1 list-inside list-disc text-xs sm:text-sm text-gray-600">
                    <li><span className="font-bold text-gray-800">Lieu:</span> {selected.location || 'Centre-ville'}</li>
                    <li><span className="font-bold text-gray-800">Durée:</span> {selected.duration || '~30 min'}</li>
                    <li><span className="font-bold text-gray-800">Accessible:</span> {selected.accessible ? 'Oui' : 'Oui (adapté)'} </li>
                  </ul>
                  <div className="mt-5 flex gap-2 flex-wrap">
                    <button onClick={() => { confirmStart(selected.id); closePanel(); }} className="rounded-lg bg-red-600 text-white font-bold px-5 py-2 shadow hover:bg-red-700 transition text-base">Je suis intéressé</button>
                    <button onClick={() => { window.location.href = '/contact'; }} className="rounded-lg border-2 border-gray-300 text-gray-700 font-semibold px-5 py-2 bg-white hover:bg-gray-50 transition text-base">Contact</button>
                  </div>
                  <div className="mt-4 text-xs sm:text-sm text-gray-600 text-right">Points pour cette mission: <strong className="text-black">{selected.points}</strong></div>
                </div>
              </div>
            </aside>
          </>
        )}
      </div> 

      <ConfirmationModal open={confirm.open} title={"Confirmer la mission"} description={"Voulez-vous enregistrer cette mission ?"} onCancel={handleCancelStart} onConfirm={handleConfirmStart} />

      {/* Bouton Réinitialiser en bas de page */}
      <div className="w-full flex justify-center mt-8 mb-4">
        <button onClick={() => { setStatusMap({}); setPoints(0); localStorage.removeItem('missions_status'); localStorage.removeItem('missions_points'); setMessage('Données réinitialisées'); setTimeout(()=>setMessage(''),2000); }} className="rounded-md border px-4 py-2 text-base bg-white shadow hover:bg-gray-50 transition">Réinitialiser</button>
      </div>
    </section>
  );
}
