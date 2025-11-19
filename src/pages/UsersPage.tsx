import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import UserForm from "../components/UserForm";
import UserRow from "../components/UserRow";

type User = {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  creado?: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);

  async function loadUsers() {
    setLoading(true);
    const { data, error } = await supabase
      .from<User>("usuarios")
      .select("*")
      .eq("estado", 1)
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      alert("Error cargando usuarios");
    } else {
      setUsers(data ?? []);
    }
    setLoading(false);
  }

  useEffect(() => { loadUsers(); }, []);

  async function handleCreate(payload: Partial<User>) {
    // backend validation is needed in SQL / Supabase RLS or via Function. Here we do client-side minimal check
    if (!payload.nombre || !payload.correo) {
      alert("Nombre y correo son obligatorios");
      return;
    }
    const { error } = await supabase.from("usuarios").insert([{ ...payload }]);
    if (error) return alert("Error creando: " + error.message);
    await loadUsers();
  }

  async function handleUpdate(id: number, payload: Partial<User>) {
    const { error } = await supabase.from("usuarios").update(payload).eq("id", id);
    if (error) return alert("Error actualizando: " + error.message);
    setEditing(null);
    await loadUsers();
  }

  async function handleDelete(id: number) {
    // logical delete: set estado = 0
    const ok = confirm("Eliminar usuario?");
    if (!ok) return;
    const { error } = await supabase.from("usuarios").update({ estado: 0 }).eq("id", id);
    if (error) return alert("Error eliminando: " + error.message);
    await loadUsers();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
      <UserForm onCreate={handleCreate} editing={editing} onUpdate={handleUpdate} onCancel={() => setEditing(null)} />
      <hr className="my-6" />
      {loading ? <p>Cargando...</p> : (
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Correo</th>
              <th className="p-2">Rol</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <UserRow key={u.id} user={u} onEdit={() => setEditing(u)} onDelete={() => handleDelete(u.id)} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
