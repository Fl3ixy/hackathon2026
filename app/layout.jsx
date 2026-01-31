import "./styles/globals.css";
import Header from "../components/GlobalComponents/Header";
import Footer from "../components/GlobalComponents/Footer";

export const metadata = {
  title: "Fais ta BA !",
  icons: {
    icon: "/icones/heart.png",
    apple: "/icones/heart.png",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 senior-root text-black">
        {/* decorative background blob */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-30">
          <svg className="w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0%" stopColor="#eef2ff" />
                <stop offset="100%" stopColor="#fff1f2" />
              </linearGradient>
            </defs>
            <rect width="100%" height="60%" fill="url(#g1)" />
            <ellipse cx="10%" cy="80%" rx="30%" ry="20%" fill="#ede9fe" />
            <ellipse cx="85%" cy="10%" rx="18%" ry="10%" fill="#fff1f2" />
          </svg>
        </div>

        <Header />
        <main className="py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
