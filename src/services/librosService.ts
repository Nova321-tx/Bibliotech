import { supabase } from "../lib/supabaseClient";

export async function obtenerLibros() {
  const { data, error } = await supabase
    .from("libros")
    .select("*")
    .eq("estado", 1)
    .order("id", { ascending: true });

  if (error) {
    console.error("Error al traer libros:", error);
    return [];
  }

  return data;
}
