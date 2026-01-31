"use client";

import React, { useRef, useState, useEffect } from "react";

export default function HomePage() {
  const listRef = useRef(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const savedPoints = Number(localStorage.getItem('missions_points') || 0);
    setPoints(savedPoints);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 p-6">

    </main>
  );
}
