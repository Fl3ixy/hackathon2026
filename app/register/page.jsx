import React from "react";
import RegisterForm from "../../components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-black">Fais ta BA!</h1>
          <p className="text-sm text-gray-600">Remplissez le formulaire pour créer votre compte.</p>
        </header>

        <RegisterForm />
      </div>
    </main>
  );
}
