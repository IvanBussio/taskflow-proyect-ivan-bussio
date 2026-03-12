document.addEventListener("DOMContentLoaded", () => {

let tasks = [];

const input = document.getElementById("taskInput");
const button = document.getElementById("addTaskBtn");
const list = document.getElementById("taskList");

/* ======================
   STORAGE TAREAS
====================== */

function loadTasks(){
const saved = localStorage.getItem("tasks");
if(saved){
tasks = JSON.parse(saved);
}
}

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* ======================
   RENDER
====================== */

function render(){

list.innerHTML = "";

tasks.forEach((task,index)=>{

const li = document.createElement("li");

li.className =
"flex justify-between items-center bg-white/90 p-3 rounded shadow hover:shadow-lg transition";

const text = document.createElement("span");

text.textContent = task.title;

if(task.completed){
text.classList.add("completed");
}

/* BOTÓN COMPLETAR */

const complete = document.createElement("button");

complete.textContent = "✔";

complete.className =
"bg-green-500 text-white px-2 py-1 rounded";

complete.onclick = () => {

task.completed = !task.completed;

saveTasks();
render();

};

/* BOTÓN ELIMINAR */

const del = document.createElement("button");

del.textContent = "🗑";

del.className =
"bg-red-500 text-white px-2 py-1 rounded ml-2";

del.onclick = () => {

tasks.splice(index,1);

saveTasks();
render();

};

const actions = document.createElement("div");

actions.appendChild(complete);
actions.appendChild(del);

li.appendChild(text);
li.appendChild(actions);

list.appendChild(li);

});

}

/* ======================
   AÑADIR TAREA
====================== */

button.addEventListener("click", () => {

const title = input.value.trim();

if(title === "") return;

tasks.push({
title:title,
completed:false
});

input.value = "";

saveTasks();
render();

});

/* ======================
   MODO OSCURO / CLARO
====================== */

const toggle = document.getElementById("themeToggle");

function loadTheme(){

const savedTheme = localStorage.getItem("theme");

if(savedTheme){
document.body.className = savedTheme;
toggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
}

}

toggle.addEventListener("click", () => {

if(document.body.classList.contains("light")){

document.body.classList.remove("light");
document.body.classList.add("dark");

toggle.textContent = "☀️";

localStorage.setItem("theme","dark");

}else{

document.body.classList.remove("dark");
document.body.classList.add("light");

toggle.textContent = "🌙";

localStorage.setItem("theme","light");

}

});

/* ======================
   INIT
====================== */

loadTasks();
loadTheme();
render();

});