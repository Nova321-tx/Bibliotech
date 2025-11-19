import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LibrosPage from "./pages/LibrosPage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 bg-white shadow">
        <nav className="container mx-auto flex gap-4">
          <Link to="/" className="font-bold">Bibliotech</Link>
          <Link to="/libros" className="text-sm text-gray-600">Libros</Link>
        </nav>
      </header>

      <main className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<div>Bienvenido. Usa el menú.</div>} />
          <Route path="/libros" element={<LibrosPage />} />
        </Routes>
      </main>
    </div>
  );
}
