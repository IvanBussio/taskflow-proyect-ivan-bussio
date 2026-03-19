let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let categories = JSON.parse(localStorage.getItem("categories")) || [];

function save(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("categories", JSON.stringify(categories));
}

/* IA SIMULADA */
function suggestCategory(text){
  const base = ["Trabajo","Personal","Compras","Gym","Estudio","Salud"];

  return base.filter(cat =>
    cat.toLowerCase().includes(text.toLowerCase())
  );
}

function renderSuggestions(){
  const input = document.getElementById("categoryInput").value;
  const box = document.getElementById("suggestions");
  box.innerHTML = "";

  if(!input) return;

  const suggestions = suggestCategory(input);

  suggestions.forEach(cat=>{
    const div = document.createElement("div");
    div.innerText = cat;
    div.className = "cursor-pointer text-sm";
    div.onclick = ()=> {
      document.getElementById("categoryInput").value = cat;
      box.innerHTML = "";
    };
    box.appendChild(div);
  });
}

document.getElementById("categoryInput").addEventListener("input", renderSuggestions);

function renderTasks(){
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {

    const div = document.createElement("div");
    div.className = "task";

    div.innerHTML = `
      <div>
        <span>${task.text}</span>
        <div class="chip">${task.category}</div>
      </div>
      <button onclick="deleteTask(${index})">❌</button>
    `;

    list.appendChild(div);
  });

  document.getElementById("taskCount").innerText =
    tasks.length + " tareas";

  document.getElementById("progressBar").style.width =
    tasks.length > 0 ? "100%" : "0%";
}

function addTask(){
  const text = document.getElementById("taskInput").value;
  const category = document.getElementById("categoryInput").value;

  if(!text.trim()) return;

  tasks.push({ text, category });

  if(category && !categories.includes(category)){
    categories.push(category);
  }

  document.getElementById("taskInput").value = "";
  document.getElementById("categoryInput").value = "";

  save();
  renderTasks();
}

function deleteTask(index){
  tasks.splice(index,1);
  save();
  renderTasks();
}

function sortTasks(){
  tasks.sort((a,b)=> a.text.localeCompare(b.text));
  save();
  renderTasks();
}

function toggleTheme(){
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

function openWelcome(){
  document.getElementById("welcomeModal").classList.remove("hidden");
}

function closeWelcome(){
  document.getElementById("welcomeModal").classList.add("hidden");
}

if(!localStorage.getItem("visited")){
  openWelcome();
  localStorage.setItem("visited",true);
}

renderTasks();