import { useState, useEffect } from "react";

export default function Categorias() {
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);

  // 🔧 Normalizar (NO rompe datos antiguos)
  const normalizarCategorias = (cats) => {
    return cats.map((cat) => {
      if (typeof cat === "string") {
        return { nombre: cat };
      }
      return cat;
    });
  };

  // 🔧 Obtener nombre seguro
  const getNombre = (cat) =>
    typeof cat === "object" ? cat.nombre : cat;

  // 📦 Cargar desde localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("categorias")) || [];
    setCategorias(normalizarCategorias(data));
  }, []);

  // 💾 Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("categorias", JSON.stringify(categorias));
  }, [categorias]);

  // ➕ Agregar categoría
  const agregarCategoria = () => {
    const nombre = nuevaCategoria.trim();
    if (!nombre) return;

    // evitar duplicados
    if (categorias.some((c) => getNombre(c) === nombre)) return;

    setCategorias((prev) => [...prev, { nombre }]);
    setNuevaCategoria("");
  };

  // ⌨️ Enter para agregar
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      agregarCategoria();
    }
  };

  // 🟠 Seleccionar categoría
  const seleccionarCategoria = (e) => {
    const value = e.target.value;
    if (!value) return;

    if (!categoriasSeleccionadas.includes(value)) {
      setCategoriasSeleccionadas((prev) => [...prev, value]);
    }
  };

  // ❌ Eliminar categoría seleccionada
  const eliminarSeleccionada = (cat) => {
    setCategoriasSeleccionadas((prev) =>
      prev.filter((c) => c !== cat)
    );
  };

  // 🧹 Borrar todo
  const borrarTodo = () => {
    setCategoriasSeleccionadas([]);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-3">Nueva tarea</h2>

      {/* Input categoría */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Nueva categoría..."
          value={nuevaCategoria}
          onChange={(e) => setNuevaCategoria(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-2 border rounded-lg"
        />
        <button
          onClick={agregarCategoria}
          className="bg-green-500 text-white px-4 rounded-lg"
        >
          +
        </button>
      </div>

      {/* Select */}
      <select
        onChange={seleccionarCategoria}
        className="w-full p-2 border rounded-lg mb-3"
      >
        <option value="">Seleccionar categoría</option>
        {categorias.map((cat, i) => (
          <option key={i} value={getNombre(cat)}>
            {getNombre(cat)}
          </option>
        ))}
      </select>

      {/* Chips */}
      <div className="flex flex-wrap gap-2 mb-3">
        {categoriasSeleccionadas.map((cat, i) => (
          <div
            key={i}
            className="bg-orange-500 text-white px-3 py-1 rounded-lg flex items-center gap-2"
          >
            {cat}
            <button onClick={() => eliminarSeleccionada(cat)}>✕</button>
          </div>
        ))}
      </div>

      {/* Botones */}
      <div className="flex gap-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Añadir
        </button>
        <button
          onClick={borrarTodo}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Borrar todo
        </button>
      </div>
    </div>
  );
}