document.addEventListener("DOMContentLoaded", () => {

let tasks = [];
let filter = "all";

const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addTaskBtn");
const list = document.getElementById("taskList");
const search = document.getElementById("searchInput");
const sortBtn = document.getElementById("sortBtn");
const stats = document.getElementById("taskStats");

/* STORAGE */

function loadTasks(){
const saved = localStorage.getItem("tasks");
if(saved){ tasks = JSON.parse(saved); }
}

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* RENDER */

function render(){

list.innerHTML = "";

let filtered = [...tasks];

if(filter === "pending") filtered = filtered.filter(t => !t.completed);
if(filter === "done") filtered = filtered.filter(t => t.completed);

const query = search.value.toLowerCase();

filtered = filtered.filter(t => t.title.toLowerCase().includes(query));

filtered.forEach((task,index)=>{

const li = document.createElement("li");

li.className =
"flex justify-between items-center bg-white/90 dark:bg-gray-700 p-3 rounded shadow";

const text = document.createElement("span");

text.textContent = task.title;

if(task.completed) text.classList.add("completed");

const actions = document.createElement("div");

const complete = document.createElement("button");
complete.textContent = "✔";
complete.className="bg-green-500 text-white px-2 py-1 rounded";

complete.onclick = () => {
task.completed=!task.completed;
saveTasks();
render();
};

const del = document.createElement("button");
del.textContent="🗑";
del.className="bg-red-500 text-white px-2 py-1 rounded ml-2";

del.onclick = () => {
tasks.splice(index,1);
saveTasks();
render();
};

actions.appendChild(complete);
actions.appendChild(del);

li.appendChild(text);
li.appendChild(actions);

list.appendChild(li);

});

updateStats();

}

/* STATS */

function updateStats(){

const total = tasks.length;
const done = tasks.filter(t=>t.completed).length;

stats.textContent = `Completadas ${done} de ${total}`;

}

/* ADD */

addBtn.addEventListener("click",()=>{

const title = input.value.trim();

if(title==="") return;

tasks.push({title,completed:false});

input.value="";

saveTasks();
render();

});

/* SORT */

sortBtn.addEventListener("click",()=>{
tasks.sort((a,b)=>a.title.localeCompare(b.title));
render();
});

/* FILTERS */

document.getElementById("filterAll").onclick=()=>{filter="all";render();}
document.getElementById("filterPending").onclick=()=>{filter="pending";render();}
document.getElementById("filterDone").onclick=()=>{filter="done";render();}

/* SEARCH */

search.addEventListener("input",render);

/* DARK MODE */

const toggle = document.getElementById("themeToggle");

function loadTheme(){
const saved = localStorage.getItem("theme");
if(saved){
document.body.className = saved;
toggle.textContent = saved==="dark"?"☀️":"🌙";
}
}

toggle.onclick=()=>{

if(document.body.classList.contains("light")){
document.body.classList.replace("light","dark");
toggle.textContent="☀️";
localStorage.setItem("theme","dark");
}else{
document.body.classList.replace("dark","light");
toggle.textContent="🌙";
localStorage.setItem("theme","light");
}

};

/* INIT */

loadTasks();
loadTheme();
render();

});