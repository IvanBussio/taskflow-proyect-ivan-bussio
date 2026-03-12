function addTask() {

const input = document.getElementById("taskInput");
const taskText = input.value;

if(taskText === "") return;

const list = document.getElementById("taskList");

const li = document.createElement("li");

li.className = "bg-gray-800 p-3 rounded-lg flex justify-between";

li.innerHTML = `
<span>${taskText}</span>
<button onclick="this.parentElement.remove()" class="text-red-400">✕</button>
`;

list.appendChild(li);

input.value = "";

}
// ===== AI improvements: search, filter and sort =====

// Buscar tareas
const searchInput = document.getElementById("searchTask");

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const filtered = tasks.filter(task =>
      task.text.toLowerCase().includes(query)
    );
    renderFilteredTasks(filtered);
  });
}

// Filtros
const filterAll = document.getElementById("filter-all");
const filterCompleted = document.getElementById("filter-completed");
const filterPending = document.getElementById("filter-pending");

if (filterAll) {
  filterAll.addEventListener("click", () => renderTasks());
}

if (filterCompleted) {
  filterCompleted.addEventListener("click", () => {
    const filtered = tasks.filter(task => task.completed);
    renderFilteredTasks(filtered);
  });
}

if (filterPending) {
  filterPending.addEventListener("click", () => {
    const filtered = tasks.filter(task => !task.completed);
    renderFilteredTasks(filtered);
  });
}

// Ordenar tareas
const sortBtn = document.getElementById("sortTasks");

if (sortBtn) {
  sortBtn.addEventListener("click", () => {
    tasks.sort((a, b) => a.text.localeCompare(b.text));
    renderTasks();
  });
}

// Renderizar lista filtrada
function renderFilteredTasks(taskList) {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  taskList.forEach(task => {
    createTaskElement(task);
  });
}