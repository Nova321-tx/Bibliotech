import React from "react";

export default function UserRow({ user, onEdit, onDelete }: any) {
  return (
    <tr className="border-t">
      <td className="p-2">{user.id}</td>
      <td className="p-2">{user.nombre}</td>
      <td className="p-2">{user.correo}</td>
      <td className="p-2">{user.rol}</td>
      <td className="p-2">
        <button onClick={onEdit} className="mr-2 px-2 py-1 border rounded">Editar</button>
        <button onClick={onDelete} className="px-2 py-1 border rounded">Eliminar</button>
      </td>
    </tr>
  );
}
