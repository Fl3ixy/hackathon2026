"use client";

import Link from "next/link";
import { useState } from "react";

import { m, LazyMotion, domAnimation } from "framer-motion";
import Image from "next/image";

export default function Header() {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const linkList = [
    { name: "Accueil", link: "/" },
    { name: "Qui sommes nous ?", link: "/about" },
    { name: "Activités", link: "/task" },
    { name: "Compte", link: "/register" },
    { name: "Contacts", link: "/contact" },
  ];

  const Logo = ({ className }) => (
    <li
      className={`z-20 text-black sm:flex sm:w-full sm:items-center sm:justify-between md:flex md:w-full md:items-center md:justify-between ${className}`}
    >
      <div className="flex items-center gap-5">
        <Image src="/icones/heart.png" alt="Logo coeur - Fait ta BA" width={40} height={40} />
        <div>
          <p className="uppercase font-extrabold">Fais ta BA !</p>
          <p className="text-base text-gray-600">Votre action compte.</p>
        </div>
      </div>
      <button
        onClick={() => setToggleSidebar(!toggleSidebar)}
        className="hidden rounded-lg border-0 bg-transparent text-black transition-all duration-200 ease-out focus:border-4 sm:flex md:flex"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full max-w-[40px] text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </li>
  );

  return (
    <LazyMotion features={domAnimation}>
      <header className="z-30 flex justify-center">
        <div className="w-full max-w-6xl px-4">
          <div className="rounded-2xl bg-white p-4 shadow-lg flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image src="/icones/heart.png" alt="Logo coeur - Fait ta BA" width={56} height={56} />
              <div>
                <p className="uppercase font-extrabold text-lg">Fais ta BA !</p>
                <p className="text-sm text-gray-600">Votre action compte.</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-3">
              {linkList.map((link) => (
                <Link key={link.name} href={link.link} className="rounded-full px-4 py-2 text-black hover:bg-indigo-50 shadow-sm">{link.name}</Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/register" className="hidden md:inline-block rounded-full bg-indigo-600 px-4 py-2 text-white">Se connecter</Link>
              <button onClick={() => setToggleSidebar(!toggleSidebar)} className="md:hidden rounded-full p-3 bg-indigo-50">☰</button>
            </div>
          </div>
        </div>
      </header>
    </LazyMotion>
  );
}
