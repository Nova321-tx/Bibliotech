import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

// Definir el tipo Libro
interface Libro {
  id: number;
  titulo: string;
  autor: string;
  anio: number;
}

export default function LibrosCRUD() {
  // Estado con tipo correcto
  const [libros, setLibros] = useState<Libro[]>([]);
  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    anio: ""
  });
  const [editId, setEditId] = useState<number | null>(null);

  // Leer libros
  const fetchLibros = async () => {
    const { data, error } = await supabase.from("libros").select("*");

    if (error) {
      console.error(error);
      return;
    }

    setLibros(data as Libro[]);
  };

  useEffect(() => {
    fetchLibros();
  }, []);

  // Manejar inputs del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Crear libro
  const createLibro = async () => {
    if (!form.titulo || !form.autor || !form.anio) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const { error } = await supabase.from("libros").insert({
      titulo: form.titulo,
      autor: form.autor,
      anio: Number(form.anio)
    });

    if (error) {
      console.error(error);
      return;
    }

    setForm({ titulo: "", autor: "", anio: "" });
    fetchLibros();
  };

  // Cargar datos para editar
  const loadForEdit = (libro: Libro) => {
    setEditId(libro.id);
    setForm({
      titulo: libro.titulo,
      autor: libro.autor,
      anio: String(libro.anio)
    });
  };

  // Actualizar registro
  const updateLibro = async () => {
    if (editId === null) return;

    const { error } = await supabase
      .from("libros")
      .update({
        titulo: form.titulo,
        autor: form.autor,
        anio: Number(form.anio)
      })
      .eq("id", editId);

    if (error) {
      console.error(error);
      return;
    }

    setEditId(null);
    setForm({ titulo: "", autor: "", anio: "" });
    fetchLibros();
  };

  // Eliminar libro
  const deleteLibro = async (id: number) => {
    const { error } = await supabase.from("libros").delete().eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    fetchLibros();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestión de Libros</h1>

      {/* FORMULARIO */}
      <div className="grid gap-3 mb-6">
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          className="border p-2"
          value={form.titulo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="autor"
          placeholder="Autor"
          className="border p-2"
          value={form.autor}
          onChange={handleChange}
        />
        <input
          type="number"
          name="anio"
          placeholder="Año"
          className="border p-2"
          value={form.anio}
          onChange={handleChange}
        />

        {editId ? (
          <button
            className="bg-blue-600 text-white p-2 rounded"
            onClick={updateLibro}
          >
            Actualizar Libro
          </button>
        ) : (
          <button
            className="bg-green-600 text-white p-2 rounded"
            onClick={createLibro}
          >
            Crear Libro
          </button>
        )}
      </div>

      {/* LISTA DE LIBROS */}
      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Título</th>
            <th className="border p-2">Autor</th>
            <th className="border p-2">Año</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {libros.map((libro) => (
            <tr key={libro.id}>
              <td className="border p-2">{libro.id}</td>
              <td className="border p-2">{libro.titulo}</td>
              <td className="border p-2">{libro.autor}</td>
              <td className="border p-2">{libro.anio}</td>
              <td className="border p-2">
                <button
                  className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => loadForEdit(libro)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => deleteLibro(libro.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
