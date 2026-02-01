"use client";

import Image from "next/image";
import React from "react";

export default function HomeHero({ points, onExplore }) {
  return (
    <section className="relative mb-8 rounded-section bg-white p-6 shadow-2xl overflow-visible">
      <div className="md:flex md:items-center md:gap-6">
        <div className="md:flex-1">
          <h1 className="mb-3 text-4xl font-extrabold">Voici la liste des <span className="text-red-600">ACTIVITES</span></h1>
          <p className="mb-4 text-xl text-gray-700">Des petites missions faciles et conviviales — pensées pour les seniors et leurs voisins.</p>

          <div className="flex flex-wrap items-center gap-4">
            <button onClick={onExplore} className="big-btn bg-red-600 text-white shadow hover:bg-red-700">Découvrir les missions</button>
            <a href="/about" className="big-btn border rounded-full px-4 py-3">En savoir plus</a>
            <div className="rounded-lg border px-4 py-2 text-sm">
              <strong>Points :</strong>
              <div className="mt-1 text-2xl font-bold text-black">{points}</div>
            </div>
          </div>
        </div>

        <div className="hidden md:block md:w-72 md:flex-shrink-0 md:pl-6 -translate-y-6">
          <div className="rounded-xl bg-red-50 p-6 shadow-lg decorative-corner">
            <Image src="/img/Team.svg" alt="People illustration" width={300} height={180} className="rounded-md" />
          </div>
        </div>
      </div>

    </section>
  );
}
