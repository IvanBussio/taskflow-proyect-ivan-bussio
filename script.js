document.addEventListener("DOMContentLoaded", () => {

let tasks = [];
let currentFilter = "all";

const taskInput = document.getElementById("taskTitle");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchTask");
const addButton = document.getElementById("addTaskBtn");

/* STORAGE */

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){
const saved = localStorage.getItem("tasks");
if(saved){
tasks = JSON.parse(saved);
}
}

/* ADD TASK */

function addTask(){

const title = taskInput.value.trim();

if(title === "") return;

const newTask = {
id: Date.now(),
title: title,
completed: false
};

tasks.push(newTask);

taskInput.value = "";

saveTasks();
renderTasks();
}

/* BOTÓN */

addButton.addEventListener("click", addTask);

/* RENDER */

function renderTasks(){

taskList.innerHTML = "";

let filtered = [...tasks];

if(currentFilter === "completed"){
filtered = filtered.filter(t => t.completed);
}

if(currentFilter === "pending"){
filtered = filtered.filter(t => !t.completed);
}

const search = searchInput.value.toLowerCase();

filtered = filtered.filter(t =>
t.title.toLowerCase().includes(search)
);

filtered.forEach(task => {

const div = document.createElement("div");

div.className =
"flex justify-between items-center p-3 rounded-lg bg-white/60 shadow";

const text = document.createElement("span");
text.textContent = task.title;

if(task.completed){
text.classList.add("line-through","text-red-500");
}

const actions = document.createElement("div");

/* COMPLETE */

const completeBtn = document.createElement("button");

completeBtn.textContent = task.completed ? "↩" : "✔";
completeBtn.className = "bg-green-500 text-white px-2 py-1 rounded";

completeBtn.onclick = () => {

const target = tasks.find(t => t.id === task.id);
target.completed = !target.completed;

saveTasks();
renderTasks();
};

/* EDIT */

const editBtn = document.createElement("button");

editBtn.textContent = "✏️";
editBtn.className = "bg-yellow-400 text-white px-2 py-1 rounded ml-2";

editBtn.onclick = () => {

const newText = prompt("Editar tarea:", task.title);

if(newText){

const target = tasks.find(t => t.id === task.id);
target.title = newText;

saveTasks();
renderTasks();
}
};

/* DELETE */

const deleteBtn = document.createElement("button");

deleteBtn.textContent = "🗑";
deleteBtn.className = "bg-red-500 text-white px-2 py-1 rounded ml-2";

deleteBtn.onclick = () => {

tasks = tasks.filter(t => t.id !== task.id);

saveTasks();
renderTasks();
};

actions.appendChild(completeBtn);
actions.appendChild(editBtn);
actions.appendChild(deleteBtn);

div.appendChild(text);
div.appendChild(actions);

taskList.appendChild(div);

});
}

/* SEARCH */

searchInput.addEventListener("input", renderTasks);

/* FILTER */

window.filterTasks = function(type){
currentFilter = type;
renderTasks();
};

/* SORT */

window.sortTasks = function(){
tasks.sort((a,b)=>a.title.localeCompare(b.title));
saveTasks();
renderTasks();
};

/* INIT */

loadTasks();
renderTasks();

});