const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const sortBtn = document.getElementById("sortBtn");
const themeBtn = document.getElementById("themeBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 💾 Guardar
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 🎨 Render
function renderTasks() {
  const search = searchInput.value.toLowerCase();
  taskList.innerHTML = "";

  tasks
    .filter(t => t.text.toLowerCase().includes(search))
    .forEach(task => {
      const div = document.createElement("div");

      div.className = `
        flex items-center justify-between px-4 py-2 rounded-xl transition
        ${task.completed ? "opacity-50 line-through" : "hover:bg-gray-200 dark:hover:bg-gray-700"}
      `;

      div.innerHTML = `
        <div class="flex items-center gap-3">
          
          <button class="checkBtn w-6 h-6 flex items-center justify-center rounded-full border 
          ${task.completed ? "bg-gray-400 border-gray-400" : "border-gray-400"}">
            ${task.completed ? "✓" : ""}
          </button>

          <span class="text-gray-800 dark:text-white">${task.text}</span>
        </div>

        <div class="flex items-center gap-2">

          <button class="px-3 py-1 text-sm rounded-full bg-orange-200 text-orange-800">
            Compras
          </button>

          <button class="editBtn w-8 h-8 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
            ✏️
          </button>

          <button class="deleteBtn w-8 h-8 flex items-center justify-center rounded-lg bg-red-500 text-white">
            ✕
          </button>

        </div>
      `;

      // ✔️ Toggle
      div.querySelector(".checkBtn").onclick = () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
      };

      // ❌ Delete
      div.querySelector(".deleteBtn").onclick = () => {
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        renderTasks();
      };

      // ✏️ Edit
      div.querySelector(".editBtn").onclick = () => {
        const nuevo = prompt("Editar tarea:", task.text);
        if (nuevo) {
          task.text = nuevo;
          saveTasks();
          renderTasks();
        }
      };

      taskList.appendChild(div);
    });
}

// ➕ Añadir
function addTask() {
  if (!taskInput.value.trim()) return;

  tasks.push({
    id: Date.now(),
    text: taskInput.value,
    completed: false
  });

  taskInput.value = "";
  saveTasks();
  renderTasks();
}

// 🔤 Ordenar
sortBtn.onclick = () => {
  tasks.sort((a, b) => a.text.localeCompare(b.text));
  saveTasks();
  renderTasks();
};

// 🔍 Buscar
searchInput.oninput = renderTasks;

// 🌙 Dark mode
themeBtn.onclick = () => {
  document.documentElement.classList.toggle("dark");
};

// ➕ Botón
addBtn.onclick = addTask;

// ⌨️ Enter
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

// 🚀 Init
renderTasks();