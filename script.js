document.addEventListener("DOMContentLoaded", () => {

let tasks = [];

const input = document.getElementById("taskInput");
const button = document.getElementById("addTaskBtn");
const list = document.getElementById("taskList");

/* cargar tareas */

function loadTasks(){
const saved = localStorage.getItem("tasks");
if(saved){
tasks = JSON.parse(saved);
}
}

/* guardar */

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* renderizar */

function render(){

list.innerHTML = "";

tasks.forEach((task,index)=>{

const li = document.createElement("li");

li.className =
"flex justify-between items-center bg-white/80 p-3 rounded shadow";

const text = document.createElement("span");

text.textContent = task.title;

if(task.completed){
text.classList.add("line-through","text-red-500");
}

/* completar */

const complete = document.createElement("button");

complete.textContent = "✔";

complete.className =
"bg-green-500 text-white px-2 py-1 rounded";

complete.onclick = () => {

task.completed = !task.completed;

saveTasks();
render();

};

/* eliminar */

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

/* añadir tarea */

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

/* iniciar */

loadTasks();
render();

});