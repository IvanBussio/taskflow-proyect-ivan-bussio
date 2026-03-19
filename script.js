/* =========================
   STORAGE
========================= */

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let categories = JSON.parse(localStorage.getItem("categories")) || [];

function save(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("categories", JSON.stringify(categories));
}

/* =========================
   IA CATEGORÍAS
========================= */

function smartCategory(text){
  text = text.toLowerCase();

  if(text.includes("gym") || text.includes("entren")) return "Gym";
  if(text.includes("comprar") || text.includes("super")) return "Compras";
  if(text.includes("estudiar") || text.includes("curso")) return "Estudio";
  if(text.includes("trabajo") || text.includes("proyecto")) return "Trabajo";
  if(text.includes("medico") || text.includes("salud")) return "Salud";

  return null;
}

function suggestCategory(input){
  const base = ["Trabajo","Personal","Compras","Gym","Estudio","Salud"];

  return [...new Set([...categories, ...base])]
    .filter(cat => cat.toLowerCase().includes(input.toLowerCase()));
}

function renderSuggestions(){
  const input = document.getElementById("categoryInput").value;
  const taskText = document.getElementById("taskInput").value;
  const box = document.getElementById("suggestions");

  box.innerHTML = "";

  let suggestions = suggestCategory(input);

  if(!input && taskText){
    const auto = smartCategory(taskText);
    if(auto) suggestions.unshift(auto);
  }

  suggestions.slice(0,5).forEach(cat=>{
    const div = document.createElement("div");
    div.innerText = cat;
    div.className = "cursor-pointer text-sm";
    div.onclick = ()=>{
      document.getElementById("categoryInput").value = cat;
      box.innerHTML="";
    };
    box.appendChild(div);
  });
}

document.getElementById("categoryInput").addEventListener("input", renderSuggestions);
document.getElementById("taskInput").addEventListener("input", renderSuggestions);

/* =========================
   RENDER
========================= */

function renderTasks(){
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, i)=>{
    const div = document.createElement("div");
    div.className = "task";

    if(task.completed){
      div.classList.add("completed");
    }

    div.innerHTML = `
      <div onclick="toggleComplete(${i})" style="cursor:pointer">
        <span>${task.text}</span>
        <div class="chip">${task.category}</div>
      </div>

      <div class="flex gap-2">
        <button onclick="editTask(${i})">✏️</button>
        <button onclick="deleteTask(${i})">❌</button>
      </div>
    `;

    list.appendChild(div);
  });

  renderCategoryStats();
}

/* =========================
   ACCIONES
========================= */

function addTask(){
  const input = document.getElementById("taskInput");
  const catInput = document.getElementById("categoryInput");

  const text = input.value;
  let category = catInput.value;

  if(!text.trim()) return;

  if(!category){
    category = smartCategory(text) || "Personal";
  }

  tasks.push({
    text,
    category,
    completed:false
  });

  if(!categories.includes(category)){
    categories.push(category);
  }

  input.value="";
  catInput.value="";

  save();
  renderTasks();
}

function deleteTask(i){
  tasks.splice(i,1);
  save();
  renderTasks();
}

/* 🔥 eliminar todo */
function deleteAll(){
  if(confirm("Eliminar todas las tareas?")){
    tasks = [];
    save();
    renderTasks();
  }
}

/* tachar */
function toggleComplete(i){
  tasks[i].completed = !tasks[i].completed;
  save();
  renderTasks();
}

/* editar */
function editTask(i){
  const nuevo = prompt("Editar tarea:", tasks[i].text);

  if(nuevo && nuevo.trim()){
    tasks[i].text = nuevo;
    save();
    renderTasks();
  }
}

/* ordenar */
function sortTasks(){
  tasks.sort((a,b)=> a.text.localeCompare(b.text));
  save();
  renderTasks();
}

/* =========================
   ENTER PARA AÑADIR
========================= */

document.getElementById("taskInput").addEventListener("keypress", (e)=>{
  if(e.key === "Enter"){
    addTask();
  }
});

/* =========================
   CONTADOR POR CATEGORÍAS
========================= */

function renderCategoryStats(){
  let stats = {};

  tasks.forEach(t=>{
    stats[t.category] = (stats[t.category] || 0) + 1;
  });

  let container = document.getElementById("categoryStats");

  if(!container){
    container = document.createElement("div");
    container.id = "categoryStats";
    container.className = "mt-4 text-sm";
    document.querySelector(".glass").appendChild(container);
  }

  container.innerHTML = "<strong>Categorías:</strong><br>";

  Object.entries(stats).forEach(([cat,count])=>{
    container.innerHTML += `${cat}: ${count}<br>`;
  });
}

/* =========================
   UI
========================= */

function toggleTheme(){
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

function openInfo(){
  document.getElementById("infoModal").classList.remove("hidden");
}

function closeInfo(e){
  if(!e || e.target.id === "infoModal"){
    document.getElementById("infoModal").classList.add("hidden");
  }
}

/* =========================
   FONDO LÁPIZ CORREGIDO
========================= */

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = [];

for(let i=0;i<60;i++){
  lines.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    length:150+Math.random()*200,
    speed:0.3+Math.random()
  });
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  /* color dinámico */
  const isDark = document.body.classList.contains("dark");

  ctx.strokeStyle = isDark
    ? "rgba(255,255,255,0.05)"
    : "rgba(0,0,0,0.07)";

  ctx.lineWidth = 1;

  lines.forEach(l=>{
    ctx.beginPath();
    ctx.moveTo(l.x,l.y);
    ctx.lineTo(l.x,l.y+l.length);
    ctx.stroke();

    l.y += l.speed;

    if(l.y > canvas.height){
      l.y = -l.length;
      l.x = Math.random()*canvas.width;
    }
  });

  requestAnimationFrame(draw);
}

draw();

/* =========================
   INIT
========================= */

renderTasks();