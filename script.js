import { getTasks, createTask, deleteTask } from "./js/api.js";

let tasks = [];

/* CARGAR TAREAS */
async function loadTasks() {
  try {
    tasks = await getTasks();
    renderTasks();
  } catch (error) {
    console.error("Error cargando tareas", error);
  }
}

/* RENDER */
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task";

    div.innerHTML = `
      <span>${task.titulo}</span>
      <button onclick="removeTask(${task.id})">❌</button>
    `;

    list.appendChild(div);
  });
}

/* AÑADIR */
window.addTask = async function () {
  const input = document.getElementById("taskInput");

  if (!input.value.trim()) return;

  try {
    await createTask(input.value);
    input.value = "";
    loadTasks();
  } catch (error) {
    console.error("Error creando tarea", error);
  }
};

/* BORRAR */
window.removeTask = async function (id) {
  try {
    await deleteTask(id);
    loadTasks();
  } catch (error) {
    console.error("Error eliminando tarea", error);
  }
};

/* INIT */
loadTasks();