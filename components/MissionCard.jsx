"use client";

import React from "react";
import Image from "next/image";

export default function MissionCard({ mission, status, onStart, onComplete, onSelect, index = 0, variant = 0 }) {
  const isIdle = status === "idle";
  const inProgress = status === "in_progress";
  const done = status === "done";
  const reversed = index % 2 === 1;
  const sizeClass = index % 3 === 0 ? 'md:h-56' : index % 3 === 1 ? 'md:h-44' : 'md:h-48';
  const offsetClass = reversed ? 'md:-translate-y-6' : (index % 3 === 0 ? 'md:translate-y-4' : '');

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onSelect && onSelect(mission)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect && onSelect(mission); }}
      className={`break-inside-avoid relative ${sizeClass} ${offsetClass} flex flex-col md:flex-row ${reversed ? 'md:flex-row-reverse' : ''} gap-3 rounded-xl border p-4 transition-shadow overflow-hidden cursor-pointer ${done ? 'bg-green-50 border-green-200 shadow-sm' : 'bg-white shadow-md hover:shadow-lg'}`}
      aria-labelledby={`m-${mission.id}`}
    >
      {/* blurred background image */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl" aria-hidden="true">
        <Image src={(mission.images && mission.images[0]) || '/img/Team.svg'} alt="" fill className="object-cover filter blur-xl opacity-25 scale-110" />
        {/* subtle overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/6 pointer-events-none"></div>
      </div>

      <div className="w-full p-2 text-left">
        <div className="text-xl md:text-2xl font-extrabold text-red-700 leading-tightx">{mission.title}</div>
        <div className="text-sm font-semibold text-red-600 mt-1">+{mission.points} pts</div>
      </div>

      <div className="flex-1 px-1">
        <h3 id={`m-${mission.id}`} className="sr-only text-lg font-semibold text-black">{mission.title}</h3>
        <p className="text-sm text-gray-600">{mission.subtitle}</p>
        <p className="mt-2 text-sm text-gray-700">{mission.description}</p>
      </div>

      <div className="mt-2 flex flex-row flex-wrap items-center gap-2 w-full">
        {isIdle && (
          <button onClick={() => onStart(mission.id)} className="rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 min-w-[90px]">J&apos;y vais !</button>
        )}

        {inProgress && (
          <>
            <button onClick={() => onComplete(mission.id)} className="rounded-md bg-green-600 px-2 py-1 text-xs font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 min-w-[90px]">Mission terminée</button>
            <button onClick={() => onStart(mission.id, true)} className="rounded-md border px-2 py-1 text-xs font-semibold min-w-[70px]">Annuler</button>
          </>
        )}

        {done && (
          <div className="rounded-md border px-2 py-1 text-xs font-semibold min-w-[90px] text-center">Terminée</div>
        )}
      </div>
    </article>
  );
}
