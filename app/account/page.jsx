"use client";

import React, { useRef, useState, useEffect } from "react";
import { FaUserCircle, FaPhone, FaEnvelope, FaLock, FaCamera, FaUserEdit, FaTrash } from "react-icons/fa";
import Image from "next/image";

export default function AccountPage() {
  const listRef = useRef(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const savedPoints = Number(localStorage.getItem('missions_points') || 0);
    setPoints(savedPoints);
  }, []);



  // Photo de profil (base64 ou url locale)
  const [profilePic, setProfilePic] = useState(() => typeof window !== 'undefined' ? (localStorage.getItem('profilePic') || '') : '');
  const fileInputRef = useRef();
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfilePic(ev.target.result);
        localStorage.setItem('profilePic', ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleProfilePicClick = () => fileInputRef.current && fileInputRef.current.click();

  // Champs modifiables (mock, pas de backend)
  const [firstName, setFirstName] = useState(() => localStorage.getItem('userFirstName') || 'Jean');
  const [lastName, setLastName] = useState(() => localStorage.getItem('userLastName') || 'Dupont');
  const [phone, setPhone] = useState(() => localStorage.getItem('userPhone') || '');
  const [email, setEmail] = useState(() => localStorage.getItem('userEmail') || '');
  // Placeholder values for phone and email
  const defaultPhone = typeof window !== 'undefined' ? (localStorage.getItem('userPhone') || 'Votre numéro de téléphone') : 'Votre numéro de téléphone';
  const defaultEmail = typeof window !== 'undefined' ? (localStorage.getItem('userEmail') || 'Votre adresse email') : 'Votre adresse email';
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Validation simple
  const validateEmail = (mail) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail);
  const validatePhone = (num) => /^\d{10}$/.test(num.replace(/\D/g, ''));

  const handleSave = (e) => {
    e.preventDefault();
    setError('');
    if (!firstName.trim() || !lastName.trim()) {
      setError('Merci de renseigner votre nom et prénom.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Email invalide.');
      return;
    }
    if (!validatePhone(phone)) {
      setError('Numéro de téléphone invalide (10 chiffres).');
      return;
    }
    localStorage.setItem('userFirstName', firstName);
    localStorage.setItem('userLastName', lastName);
    localStorage.setItem('userPhone', phone);
    localStorage.setItem('userEmail', email);
    setPassword('');
    setFeedback('Modifications enregistrées !');
    setTimeout(() => setFeedback(''), 2500);
  };

  const handleDelete = () => {
    localStorage.removeItem('userFirstName');
    localStorage.removeItem('userLastName');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('profilePic');
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setProfilePic('');
    setFeedback('Compte supprimé.');
    setConfirmDelete(false);
    setTimeout(() => setFeedback(''), 2500);
  };

  return (
    <main className="min-h-screen bg-transparent flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-start gap-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-2 sm:p-4 md:p-8 mt-2 sm:mt-4 border border-white/40">
        {/* Profil */}
        <div className="flex flex-col items-center gap-2 min-w-[120px] w-full md:w-auto mb-4 md:mb-0">
          <div className="relative group cursor-pointer" onClick={handleProfilePicClick}>
            {profilePic ? (
              <img src={profilePic} alt="Profil" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-red-200 shadow-lg transition-all duration-300" />
            ) : (
              <span className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-5xl sm:text-6xl border-4 border-red-200 shadow-lg transition-all duration-300">
                <FaUserCircle />
              </span>
            )}
            <span className="absolute bottom-2 right-2 bg-red-600 text-white rounded-full p-2 shadow-lg border-2 border-white text-lg group-hover:scale-110 transition-transform"><FaCamera /></span>
            <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleProfilePicChange} />
          </div>
          <div className="mt-2 text-center text-gray-700 font-semibold text-base">Photo de profil</div>
          <div className="mt-2 text-center text-gray-800 font-bold text-base sm:text-lg flex items-center gap-2"><FaUserEdit className="text-red-400" /> {firstName} {lastName}</div>
        </div>
        {/* Formulaire */}
        <form className="flex-1 flex flex-col gap-3 w-full" onSubmit={handleSave}>
          {/* Prénom */}
          <div className="flex flex-col gap-1 w-full">
            <label className="font-bold text-gray-700 flex items-center gap-2 text-sm sm:text-base"><FaUserEdit /> Prénom</label>
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="rounded-lg border px-3 py-2 sm:px-4 sm:py-2 bg-white text-gray-900 shadow focus:ring-2 focus:ring-red-400 outline-none text-sm sm:text-base" required />
          </div>
          {/* Nom */}
          <div className="flex flex-col gap-1 w-full">
            <label className="font-bold text-gray-700 flex items-center gap-2 text-sm sm:text-base"><FaUserEdit /> Nom</label>
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="rounded-lg border px-3 py-2 sm:px-4 sm:py-2 bg-white text-gray-900 shadow focus:ring-2 focus:ring-red-400 outline-none text-sm sm:text-base" required />
          </div>
          {/* Téléphone */}
          <div className="flex flex-col gap-1 w-full">
            <label className="font-bold text-gray-700 flex items-center gap-2 text-sm sm:text-base"><FaPhone /> Téléphone</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="rounded-lg border px-3 py-2 sm:px-4 sm:py-2 bg-white text-gray-900 shadow focus:ring-2 focus:ring-red-400 outline-none placeholder-gray-400 text-sm sm:text-base" required placeholder={defaultPhone} />
          </div>
          {/* Email */}
          <div className="flex flex-col gap-1 w-full">
            <label className="font-bold text-gray-700 flex items-center gap-2 text-sm sm:text-base"><FaEnvelope /> Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="rounded-lg border px-3 py-2 sm:px-4 sm:py-2 bg-white text-gray-900 shadow focus:ring-2 focus:ring-red-400 outline-none placeholder-gray-400 text-sm sm:text-base" required placeholder={defaultEmail} />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="font-bold text-gray-700 flex items-center gap-2 text-sm sm:text-base"><FaLock /> Nouveau mot de passe</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="rounded-lg border px-3 py-2 sm:px-4 sm:py-2 bg-white text-gray-900 shadow focus:ring-2 focus:ring-red-400 outline-none text-sm sm:text-base" placeholder="••••••••" />
          </div>
          {error && <div className="text-red-600 font-semibold text-xs sm:text-sm mt-1">{error}</div>}
          {feedback && <div className="text-green-600 font-semibold text-xs sm:text-sm mt-1">{feedback}</div>}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 mt-2 w-full">
            <button type="submit" className="rounded-full bg-red-600 text-white font-bold px-4 py-2 sm:px-6 sm:py-3 shadow hover:bg-red-700 transition w-full sm:w-auto">Enregistrer</button>
            <button type="button" onClick={() => setConfirmDelete(true)} className="rounded-full bg-red-100 text-red-700 font-bold px-3 py-1.5 sm:px-4 sm:py-2 shadow hover:bg-red-200 transition flex items-center gap-2 w-full sm:w-auto text-sm sm:text-base"><FaTrash className="text-base sm:text-lg" /> Supprimer le compte</button>
          </div>
        </form>
      </div>
      {/* Modal de confirmation suppression */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl p-4 sm:p-8 flex flex-col items-center gap-4 max-w-xs w-full mx-2">
            <div className="text-lg sm:text-xl font-bold text-red-700 mb-2">Supprimer le compte ?</div>
            <div className="text-gray-700 text-center mb-2 text-sm sm:text-base">Cette action est irréversible.<br/>Voulez-vous vraiment supprimer votre compte ?</div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 w-full">
              <button onClick={handleDelete} className="rounded-full bg-red-600 text-white font-bold px-4 py-2 shadow hover:bg-red-700 transition w-full sm:w-auto">Oui, supprimer</button>
              <button onClick={() => setConfirmDelete(false)} className="rounded-full bg-gray-200 text-gray-700 font-bold px-4 py-2 shadow hover:bg-gray-300 transition w-full sm:w-auto">Annuler</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
