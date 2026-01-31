import React from "react";
import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-pink-50 p-6">
      <div className="w-full max-w-4xl">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-black">Fais ta BA!</h1>
          <p className="text-sm text-gray-700">Connectez-vous à votre compte.</p>
        </header>

        <LoginForm />
      </div>
    </main>
  );
}
