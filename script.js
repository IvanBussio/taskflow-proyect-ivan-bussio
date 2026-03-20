const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const darkModeBtn = document.getElementById("darkModeBtn");
const sortBtn = document.getElementById("sortBtn");
const clearBtn = document.getElementById("clearBtn");

// =======================
// 🌙 MODO OSCURO
// =======================
function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");

  const isDark = document.documentElement.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

darkModeBtn.addEventListener("click", toggleDarkMode);

// cargar preferencia
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}

// =======================
// ➕ AGREGAR TAREA
// =======================
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const li = document.createElement("li");
  li.className = "flex justify-between items-center bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-lg";

  li.innerHTML = `
    <span class="task-text cursor-pointer">${text}</span>
    <button class="delete text-red-500">X</button>
  `;

  // completar tarea
  li.querySelector(".task-text").addEventListener("click", () => {
    li.classList.toggle("line-through");
    li.classList.toggle("opacity-50");
  });

  // eliminar tarea
  li.querySelector(".delete").addEventListener("click", () => {
    li.remove();
  });

  taskList.appendChild(li);
  taskInput.value = "";
}

// botón +
addBtn.addEventListener("click", addTask);

// ENTER
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// =======================
// 🔤 ORDENAR
// =======================
sortBtn.addEventListener("click", () => {
  const tasks = Array.from(taskList.children);

  tasks.sort((a, b) => {
    return a.innerText.localeCompare(b.innerText);
  });

  taskList.innerHTML = "";
  tasks.forEach(task => taskList.appendChild(task));
});

// =======================
// 🧹 ELIMINAR COMPLETADAS
// =======================
clearBtn.addEventListener("click", () => {
  const tasks = Array.from(taskList.children);

  tasks.forEach(task => {
    if (task.classList.contains("line-through")) {
      task.remove();
    }
  });
});