"use client";

import React, { useRef, useState, useEffect } from "react";
import HomeHero from "../../components/HomeHero";
import MissionList from "../../components/MissionList";

export default function HomePage() {
  const listRef = useRef(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const savedPoints = Number(localStorage.getItem('missions_points') || 0);
    setPoints(savedPoints);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 p-6">
      <div className="mx-auto max-w-4xl">
        <HomeHero points={points} onExplore={() => listRef.current?.scrollIntoView({ behavior: 'smooth' })} />

        <div ref={listRef} className="mt-6">
          <MissionList onPointsChange={(p)=>setPoints(p)} />
        </div>
      </div>
    </main>
  );
}
