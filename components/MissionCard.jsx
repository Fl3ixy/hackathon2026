"use client";

import React from "react";

export default function MissionCard({ mission, status, onStart, onComplete, index = 0 }) {
  const isIdle = status === "idle";
  const inProgress = status === "in_progress";
  const done = status === "done";
  const reversed = index % 2 === 1;
  const sizeClass = index % 3 === 0 ? 'md:h-56' : index % 3 === 1 ? 'md:h-44' : 'md:h-48';
  const offsetClass = reversed ? 'md:-translate-y-6' : (index % 3 === 0 ? 'md:translate-y-4' : '');

  return (
    <article className={`break-inside-avoid relative ${sizeClass} ${offsetClass} flex flex-col md:flex-row ${reversed ? 'md:flex-row-reverse' : ''} gap-3 rounded-xl border p-4 transition-shadow overflow-hidden ${done ? 'bg-green-50 border-green-200 shadow-sm' : 'bg-white shadow-md hover:shadow-lg'}`} aria-labelledby={`m-${mission.id}`}>
      <div className={`absolute top-0 ${reversed ? 'left-0' : 'right-0'} w-14 h-14 -translate-y-3 ${reversed ? '-translate-x-3' : 'translate-x-3'} transform rounded-bl-md`} style={{ background: index % 2 ? 'linear-gradient(135deg,#7c3aed,#06b6d4)' : 'linear-gradient(135deg,#ef4444,#f97316)', boxShadow: '0 6px 16px rgba(0,0,0,0.08)' }} aria-hidden="true" />

      <div className="flex-shrink-0 flex flex-col items-center justify-center w-20 p-2">
        <div className="text-3xl">{mission.emoji}</div>
        <div className="mt-2 text-sm font-semibold text-indigo-600">+{mission.points} pts</div>
        <div className={`mt-2 rounded px-2 py-1 text-xs ${done ? 'bg-green-100 text-green-800' : inProgress ? 'bg-yellow-100 text-yellow-800' : 'bg-indigo-50 text-indigo-700'}`}>{done ? 'Terminée' : inProgress ? 'En cours' : 'Disponible'}</div>
      </div>

      <div className="flex-1 px-1">
        <h3 id={`m-${mission.id}`} className="text-lg font-semibold text-black">{mission.title}</h3>
        <p className="text-sm text-gray-600">{mission.subtitle}</p>
        <p className="mt-2 text-sm text-gray-700">{mission.description}</p>
      </div>

      <div className="mt-2 flex md:mt-0 md:flex-col items-start gap-2">
        {isIdle && (
          <button onClick={() => onStart(mission.id)} className="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300">J&apos;y vais !</button>
        )}

        {inProgress && (
          <>
            <button onClick={() => onComplete(mission.id)} className="rounded-md bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300">Mission terminée</button>
            <button onClick={() => onStart(mission.id, true)} className="rounded-md border px-3 py-2 text-sm">Annuler</button>
          </>
        )}

        {done && (
          <div className="rounded-md border px-3 py-2 text-sm">Terminée</div>
        )}
      </div>
    </article>
  );
}
