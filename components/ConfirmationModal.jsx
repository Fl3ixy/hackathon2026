"use client";

import React from "react";

export default function ConfirmationModal({ open, title, description, onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="mx-4 max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="mb-4 text-sm text-gray-700">{description}</p>

        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-md border px-4 py-2">Annuler</button>
          <button onClick={onConfirm} className="rounded-md bg-indigo-600 px-4 py-2 text-white">Confirmer</button>
        </div>
      </div>
    </div>
  );
}
