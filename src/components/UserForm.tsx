import React, { useEffect, useState } from "react";

type Props = {
  onCreate: (payload: any) => void;
  onUpdate: (id: number, payload: any) => void;
  editing: any | null;
  onCancel: () => void;
};

export default function UserForm({ onCreate, editing, onUpdate, onCancel }: Props) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState("estudiante");

  useEffect(() => {
    if (editing) {
      setNombre(editing.nombre);
      setCorreo(editing.correo);
      setRol(editing.rol ?? "estudiante");
    } else {
      setNombre("");
      setCorreo("");
      setRol("estudiante");
    }
  }, [editing]);

  function reset() {
    setNombre("");
    setCorreo("");
    setRol("estudiante");
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre || !correo) return alert("Nombre y correo obligatorios");

    if (editing) {
      onUpdate(editing.id, { nombre, correo, rol });
    } else {
      onCreate({ nombre, correo, rol, estado: 1 });
    }
    reset();
  }

  return (
    <form onSubmit={submit} className="p-4 bg-white rounded shadow">
      <div className="flex gap-2">
        <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" className="p-2 border rounded flex-1" />
        <input value={correo} onChange={e => setCorreo(e.target.value)} placeholder="Correo" className="p-2 border rounded flex-1" />
        <select value={rol} onChange={e => setRol(e.target.value)} className="p-2 border rounded">
          <option value="admin">admin</option>
          <option value="bibliotecario">bibliotecario</option>
          <option value="estudiante">estudiante</option>
        </select>
        <button className="bg-blue-600 text-white px-4 rounded">
          {editing ? "Actualizar" : "Crear"}
        </button>
        {editing && <button type="button" onClick={onCancel} className="ml-2 px-3 border rounded">Cancelar</button>}
      </div>
    </form>
  );
}
