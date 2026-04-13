// URL de la API
const API_URL = "http://localhost:3000/api/v1/tasks";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const sortBtn = document.getElementById("sortBtn");
const themeBtn = document.getElementById("themeBtn");

let tasks = [];

// IA simple para detectar categoría
function detectCategory(text) {
  text = text.toLowerCase();
  if (text.includes("comprar")) return "Compras";
  if (text.includes("gym") || text.includes("entreno")) return "Entreno";
  if (text.includes("estudiar")) return "Estudio";
  return "General";
}

// =====================
// 📡 PETICIONES A LA API
// =====================

// Obtener todas las tareas
async function fetchTasks() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener las tareas");
    tasks = await response.json();
    renderTasks();
  } catch (error) {
    taskList.innerHTML = `<p class="text-red-500">${error.message}</p>`;
  }
}

// Crear una nueva tarea
async function createTask(task) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error al crear la tarea");
  }

  return response.json();
}

// Actualizar una tarea
async function updateTask(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la tarea");
  }

  return response.json();
}

// Eliminar una tarea
async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la tarea");
  }
}

// =====================
// 🎨 RENDERIZADO
// =====================

function renderTasks() {
  const search = searchInput.value.toLowerCase();
  taskList.innerHTML = "";

  tasks
    .filter((t) => t.titulo.toLowerCase().includes(search))
    .forEach((task) => {
      const div = document.createElement("div");

      div.className = `
        flex items-center justify-between px-4 py-3 rounded-xl transition
        ${
          task.completada
            ? "opacity-50 line-through"
            : "hover:bg-gray-200 dark:hover:bg-gray-700"
        }
      `;

      div.innerHTML = `
        <div class="flex items-center gap-3">
          <button class="checkBtn w-6 h-6 flex items-center justify-center rounded-full border 
          ${
            task.completada
              ? "bg-gray-400 border-gray-400"
              : "border-gray-400"
          }">
            ${task.completada ? "✓" : ""}
          </button>

          <span class="text-gray-800 dark:text-white text-base md:text-lg">
            ${task.titulo}
          </span>

          <span class="text-xs px-2 py-1 rounded bg-blue-200 text-blue-800">
            ${task.categoria}
          </span>
        </div>

        <div class="flex gap-2">
          <button class="editBtn">✏️</button>
          <button class="deleteBtn text-red-500">✕</button>
        </div>
      `;

      // Marcar como completada
      div.querySelector(".checkBtn").onclick = async () => {
        await updateTask(task.id, {
          completada: !task.completada,
        });
        fetchTasks();
      };

      // Eliminar tarea
      div.querySelector(".deleteBtn").onclick = async () => {
        await deleteTask(task.id);
        fetchTasks();
      };

      // Editar tarea
      div.querySelector(".editBtn").onclick = async () => {
        const nuevo = prompt("Editar tarea:", task.titulo);
        if (nuevo) {
          await updateTask(task.id, { titulo: nuevo });
          fetchTasks();
        }
      };

      taskList.appendChild(div);
    });
}

// =====================
// ➕ CREAR TAREA
// =====================

async function addTask() {
  if (!taskInput.value.trim()) return;

  try {
    await createTask({
      titulo: taskInput.value,
      categoria: detectCategory(taskInput.value),
      prioridad: "Media",
    });

    taskInput.value = "";
    fetchTasks();
  } catch (error) {
    alert(error.message);
  }
}

// =====================
// 🔧 EVENTOS
// =====================

addBtn.onclick = addTask;

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

searchInput.oninput = renderTasks;

sortBtn.onclick = () => {
  tasks.sort((a, b) => a.titulo.localeCompare(b.titulo));
  renderTasks();
};

themeBtn.onclick = () => {
  document.documentElement.classList.toggle("dark");
};

// =====================
// 🚀 INICIALIZACIÓN
// =====================

fetchTasks();