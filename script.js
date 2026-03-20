const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const darkModeBtn = document.getElementById("darkModeBtn");
const sortBtn = document.getElementById("sortBtn");
const clearBtn = document.getElementById("clearBtn");

// 🌙 MODO OSCURO
darkModeBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");

  const isDark = document.documentElement.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}

// ➕ AGREGAR TAREA
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const li = document.createElement("li");
  li.className = "flex justify-between items-center bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-lg";

  li.innerHTML = `
    <span class="task-text cursor-pointer select-none">${text}</span>
    <div class="flex gap-2">
      <button class="edit text-blue-500">✏️</button>
      <button class="delete text-red-500">✖</button>
    </div>
  `;

  // 🔥 evitar focus (clave)
  li.addEventListener("mousedown", (e) => {
    e.preventDefault();
  });

  // ✅ completar tarea (SIN verde)
  li.querySelector(".task-text").addEventListener("click", () => {
    li.classList.toggle("line-through");
    li.classList.toggle("opacity-50");
  });

  // ❌ eliminar
  li.querySelector(".delete").addEventListener("click", () => {
    li.remove();
  });

  // ✏️ editar
  li.querySelector(".edit").addEventListener("click", () => {
    const currentText = li.querySelector(".task-text").textContent;
    const newText = prompt("Editar tarea:", currentText);
    if (newText) {
      li.querySelector(".task-text").textContent = newText;
    }
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

// 🔤 ordenar
sortBtn.addEventListener("click", () => {
  const tasks = Array.from(taskList.children);

  tasks.sort((a, b) =>
    a.innerText.localeCompare(b.innerText)
  );

  taskList.innerHTML = "";
  tasks.forEach(t => taskList.appendChild(t));
});

// 🧹 eliminar completadas
clearBtn.addEventListener("click", () => {
  const tasks = Array.from(taskList.children);

  tasks.forEach(t => {
    if (t.classList.contains("line-through")) {
      t.remove();
    }
  });
});