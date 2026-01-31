import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-16 border border-black py-8 font-medium text-black bg-white">
      <div className="mx-auto max-w-6xl">
        {/* Navigation links - avec style technique */}
        <div className="mb-2 flex flex-wrap justify-center gap-5">
          <Link href={"/Presentation"}>
            <h2 className="text-center text-base transition-colors hover:text-gray-400">
              {"Accueil"}
            </h2>
          </Link>
          <Link href={"/Activites"}>
            <h2 className="text-center text-base transition-colors hover:text-gray-400 sm:mx-3">
              {"TOS"}
            </h2>
          </Link>
          <Link href={"/Annexes"}>
            <h2 className="text-center text-base transition-colors hover:text-gray-400">
              {"[Contacts]"}
            </h2>
          </Link>
        </div>

        {/* Copyright section - style technique */}
        <div className="flex w-full items-center justify-center border-t border-white border-opacity-10 pt-2">
          <p className="text-center text-sm text-gray-400">
            {"HACKATHON 2026 - JBL TEAM - "}
          </p>
          <Link
            className="text-center text-sm text-gray-400 transition-colors hover:text-gray-400"
            target="blank"
            href={"https://www.digital-reemploi.fr/"}
          >
            {"- DIGITAL FACTORY"}
          </Link>
          <p className="text-center text-sm text-gray-400">{"V2.3"}</p>
        </div>

        {/* Button section */}
        <div className="my-6 flex w-auto items-center justify-center">
          <Link href={"/"}>
            <button className="relative h-10 w-10 rounded-full border-4 border-red-500 bg-white text-lg duration-200 ease-out hover:-translate-y-2  sm:h-14 sm:w-14 md:mb-12 md:h-20 md:w-20">
            </button>
          </Link>
        </div>
      </div>
    </footer>
  );
}
