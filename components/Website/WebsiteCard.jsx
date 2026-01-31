"use client"
import React, { useState } from "react";
// Réactivons Image de Next.js qui est mieux optimisé
import Image from "next/image";
import { motion } from "framer-motion";

export function WebsiteCard({ title, description, imageSource }) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Fonction pour déterminer l'URL en fonction du titre
  const getUrlForTitle = (title) => {
    const urlMap = {
      "NextJS": "https://nextjs.org/",
      "TailwindCSS": "https://tailwindcss.com/",
      "React": "https://reactjs.org/",
      "JS": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      "HTML5": "https://developer.mozilla.org/en-US/docs/Web/HTML",
      "CSS3": "https://developer.mozilla.org/en-US/docs/Web/CSS",
      "Figma": "https://www.figma.com/",
      "Photopea": "https://www.photopea.com/"
    };
    
    return urlMap[title] || "#";
  };

  return (
    <motion.a 
      href={getUrlForTitle(title)}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative flex flex-col items-center justify-center gap-2 rounded-none border border-white bg-black p-4 shadow-lg cursor-pointer transition-all duration-300
      ${isDescriptionVisible ? 'sm:h-52 sm:w-40 md:h-64 md:w-48' : 'sm:h-40 sm:w-40 md:h-48 md:w-48'}`}
      onClick={(e) => {
        e.preventDefault(); // Empêcher le comportement par défaut du lien
        setIsDescriptionVisible(!isDescriptionVisible);
        // Si la description est déjà visible, alors ouvrir le lien
        if (isDescriptionVisible) {
          window.open(getUrlForTitle(title), '_blank', 'noopener,noreferrer');
        }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 0 10px 2px rgba(255,255,255,0.3)",
        transition: { duration: 0.3 }
      }}
    >
      {/* Éléments graphiques techniques */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white opacity-40"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white opacity-40"></div>
      
      <motion.div 
        className="mx-auto mb-2 h-12 w-12 opacity-80 flex items-center justify-center"
        whileHover={{ rotate: 5, scale: 1.1 }}
      >
        {imageSource && !imageError ? (
          // Solution 1: Image de Next.js avec configuration appropriée
          <Image
            src={imageSource}
            alt={title || "Image"}
            width={48}
            height={48}
            className="object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          // Affichage d'un placeholder en cas d'erreur
          <div className="w-12 h-12 flex items-center justify-center border border-white text-white opacity-50">
            {title?.charAt(0) || "?"}
          </div>
        )}
      </motion.div>
      
      <h3 className="text-center text-lg font-semibold">
        {title}
      </h3>
      
      <p className="text-sm text-gray-300 lg:block md:hidden sm:hidden">
        {description}
      </p>
      
      {isDescriptionVisible && (
        <p className="text-sm text-gray-300 hidden md:block sm:block animate-[fadeIn_0.3s_ease-in-out]">
          {description}
        </p>
      )}
      
      {/* Indicateur d'état - style LED */}
      <div className="absolute bottom-2 right-2 w-2 h-2 bg-white rounded-full opacity-50"></div>
      
      {/* Indicateur visuel pour montrer que c'est un lien (petit icône d'ouverture) */}
      <div className="absolute top-2 right-2 opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </div>
    </motion.a>
  );
}