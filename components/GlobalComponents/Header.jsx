"use client";

import Link from "next/link";
import { Roboto } from "next/font/google";
import { useState } from "react";

import { motion, LazyMotion, domAnimation } from "framer-motion";
import Image from "next/image";

const inter = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export default function Header() {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const linkList = [
    { name: "Accueil", link: "/" },
    { name: "Qui sommes nous ?", link: "/about" },
    { name: "Activités", link: "/task" },
    { name: "Compte", link: "/account" },
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
      <header className="z-20 flex">
        <nav className="w-full bg-white">
          <ul className="sm:text-md md:text-md flex justify-between p-5 text-4xl text-[1.5rem]">
            <div className="flex w-full flex-row justify-between gap-10 sm:flex-col sm:gap-5 md:flex-col md:gap-5 ">
              {/* MOBILE / TABLETTE */}
              <Logo className={`hidden sm:flex md:flex`} />
              <motion.div
                className="hidden sm:flex sm:flex-col sm:items-start sm:gap-5 md:flex md:flex-col md:items-start md:gap-5 "
                transition={{ duration: 0.5 }}
                style={{ overflow: "hidden" }}
                initial={{ height: 0, opacity: 1 }}
                animate={
                  toggleSidebar
                    ? {
                        transition: { type: "tween" },
                        height: "auto",
                      }
                    : { height: 0, opacity: 1 }
                }
                exit={{ height: 0, opacity: 1 }}
              >
                {linkList.map((link) => (
                  <li key={link.name} className="sm:w-full md:w-full">
                    <Link href={link.link} className="text-black">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </motion.div>

              {/* PC */}
              <div className="z-20 flex w-full items-center justify-between gap-20 sm:hidden md:hidden">
                <div className="flex w-full items-center gap-5">
                  <Logo className={`flex w-auto min-w-[250px] sm:hidden`} />
                  <div className="flex items-center justify-around">
                    {linkList.map((link) =>
                      link.link !== "/Updates" ? (
                        <Link
                          key={link.name}
                          href={link.link}
                          className="mx-5 text-black duration-200 ease-out hover:-translate-y-2 font-medium"
                        >
                          {link.name}
                        </Link>
                      ) : (
                        ""
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </nav>
      </header>
    </LazyMotion>
  );
}
