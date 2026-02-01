import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-10 py-6 px-2 bg-white rounded-t-3xl shadow-2xl w-full">
      <div className="flex flex-col items-center gap-3">
        {/* Navigation modernisée */}
        <nav className="flex gap-6 mb-2">
          <Link href="/Presentation" className="text-base font-semibold text-gray-700 hover:text-red-600 transition-colors">Accueil</Link>
          <Link href="/Activites" className="text-base font-semibold text-gray-700 hover:text-red-600 transition-colors">Activités</Link>
          <Link href="/Annexes" className="text-base font-semibold text-gray-700 hover:text-red-600 transition-colors">Contacts</Link>
        </nav>

        {/* Bouton d'accueil stylisé */}
        <Link href="/" className="my-2">
          <button className="h-12 w-12 rounded-full border-4 border-red-500 bg-white text-red-600 text-2xl font-bold shadow hover:bg-red-50 transition-all flex items-center justify-center">
            <span aria-label="Accueil" title="Accueil"></span>
          </button>
        </Link>

        {/* Copyright modernisé */}
        <div className="w-full text-center border-t border-gray-100 pt-3 mt-2">
          <p className="text-xs text-gray-400">HACKATHON 2026 — JBL TEAM</p>
          <Link href="https://www.digital-reemploi.fr/" target="_blank" className="text-xs text-gray-400 hover:text-red-600 transition-colors">DIGITAL FACTORY</Link>
          <span className="text-xs text-gray-300 ml-2">V2.3</span>
        </div>
      </div>
    </footer>
  );
}
