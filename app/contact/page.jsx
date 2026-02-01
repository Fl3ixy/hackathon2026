"use client";

import React, { useRef, useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

export default function HomePage() {
  const listRef = useRef(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const savedPoints = Number(localStorage.getItem('missions_points') || 0);
    setPoints(savedPoints);
  }, []);

  return (
    <main className="min-h-screen p-0 flex items-center justify-center">
      <div className="w-full max-w-2xl px-1 sm:px-0 py-6 flex flex-col items-center">
        <div className="w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-3 sm:p-8 mb-4 border border-white/40">
          <h1 className="text-4xl sm:text-5xl font-semibold text-red-600 text-center mb-2 tracking-tight drop-shadow-lg">Contact</h1>
          <p className="text-base sm:text-xl text-gray-700 text-center mb-6 sm:mb-8 font-medium">Besoin d&apos;aide ou d&apos;informations ?<br/>Contactez-nous par le moyen de votre choix :</p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {/* Facebook */}
            <div className="flex flex-col items-center bg-white/90 rounded-2xl shadow p-4 sm:p-6 gap-2 sm:gap-3 border border-gray-100 hover:scale-[1.03] hover:shadow-xl transition-all duration-300">
              <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" className="group outline-none focus:ring-2 focus:ring-blue-400 rounded-full">
                <span className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-4xl shadow-lg transition-transform group-hover:scale-110 group-hover:shadow-2xl duration-300">
                  <FaFacebook />
                </span>
              </a>
              <div className="font-bold text-lg mt-2">Facebook</div>
              <div className="text-xs text-gray-500 mt-1 text-center">Cliquez pour accéder à notre Facebook.</div>
            </div>
            {/* Instagram */}
            <div className="flex flex-col items-center bg-white/90 rounded-2xl shadow p-4 sm:p-6 gap-2 sm:gap-3 border border-gray-100 hover:scale-[1.03] hover:shadow-xl transition-all duration-300">
              <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" className="group outline-none focus:ring-2 focus:ring-pink-400 rounded-full">
                <span className="bg-gradient-to-br from-pink-500 to-yellow-400 text-white rounded-full w-16 h-16 flex items-center justify-center text-4xl shadow-lg transition-transform group-hover:scale-110 group-hover:shadow-2xl duration-300">
                  <FaInstagram />
                </span>
              </a>
              <div className="font-bold text-lg mt-2">Instagram</div>
              <div className="text-xs text-gray-500 mt-1 text-center">Cliquez pour accéder à notre Instagram.</div>
            </div>
            {/* Twitter */}
            <div className="flex flex-col items-center bg-white/90 rounded-2xl shadow p-4 sm:p-6 gap-2 sm:gap-3 border border-gray-100 hover:scale-[1.03] hover:shadow-xl transition-all duration-300">
              <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter" className="group outline-none focus:ring-2 focus:ring-blue-300 rounded-full">
                <span className="bg-blue-400 text-white rounded-full w-16 h-16 flex items-center justify-center text-4xl shadow-lg transition-transform group-hover:scale-110 group-hover:shadow-2xl duration-300">
                  <FaTwitter />
                </span>
              </a>
              <div className="font-bold text-lg mt-2">X</div>
              <div className="text-xs text-gray-500 mt-1 text-center">Cliquez pour accéder à notre X.</div>
            </div>
            {/* Email */}
            <div className="flex flex-col items-center bg-white/90 rounded-2xl shadow p-4 sm:p-6 gap-2 sm:gap-3 border border-gray-100 hover:scale-[1.03] hover:shadow-xl transition-all duration-300">
              <a href="mailto:contact@nomdusite.fr" aria-label="Email" className="group outline-none focus:ring-2 focus:ring-gray-400 rounded-full">
                <span className="bg-gray-400 text-white rounded-full w-16 h-16 flex items-center justify-center text-4xl shadow-lg transition-transform group-hover:scale-110 group-hover:shadow-2xl duration-300">
                  <MdEmail />
                </span>
              </a>
              <div className="font-bold text-lg mt-2">Email</div>
              <div className="text-xs text-gray-500 mt-1 text-center">Cliquez sur le logo pour nous écrire un email.</div>
            </div>
            {/* Téléphone */}
            <div className="flex flex-col items-center bg-white/90 rounded-2xl shadow p-4 sm:p-6 gap-2 sm:gap-3 border border-gray-100 hover:scale-[1.03] hover:shadow-xl transition-all duration-300">
              <a href="tel:+33123456789" aria-label="Téléphone" className="group outline-none focus:ring-2 focus:ring-green-400 rounded-full">
                <span className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-4xl shadow-lg transition-transform group-hover:scale-110 group-hover:shadow-2xl duration-300">
                  <MdPhone />
                </span>
              </a>
              <div className="font-bold text-lg mt-2">Téléphone</div>
              <div className="text-green-700 text-base font-semibold select-all">01 23 45 67 89</div>
              <div className="text-xs text-gray-500 mt-1 text-center">Cliquez sur le logo pour nous appeler.</div>
            </div>
          </div>

          <div className="mt-8 mb-4 sm:mt-10 text-center text-gray-500 text-sm sm:text-base">
            <span className="font-bold text-xl text-red-700">Nous sommes là pour vous accompagner !</span>
          </div>
        </div>
      </div>
    </main>
  );
}
