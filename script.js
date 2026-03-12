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

/* render */

function renderTasks(){

list.innerHTML = "";

tasks.forEach((task,index)=>{

const li = document.createElement("li");

li.className =
"flex justify-between items-center bg-white/80 p-3 rounded-lg shadow";

const text = document.createElement("span");

text.textContent = task.title;

if(task.completed){
text.classList.add("line-through","text-red-500");
}

/* botones */

const actions = document.createElement("div");

/* completar */

const completeBtn = document.createElement("button");

completeBtn.textContent = "✔";

completeBtn.className =
"bg-green-500 text-white px-2 py-1 rounded";

completeBtn.onclick = ()=>{

task.completed = !task.completed;

saveTasks();
renderTasks();

};

/* eliminar */

const deleteBtn = document.createElement("button");

deleteBtn.textContent = "🗑";

deleteBtn.className =
"bg-red-500 text-white px-2 py-1 rounded ml-2";

deleteBtn.onclick = ()=>{

tasks.splice(index,1);

saveTasks();
renderTasks();

};

actions.appendChild(completeBtn);
actions.appendChild(deleteBtn);

li.appendChild(text);
li.appendChild(actions);

list.appendChild(li);

});

}

/* añadir tarea */

button.addEventListener("click",()=>{

const title = input.value.trim();

if(title === "") return;

tasks.push({
title:title,
completed:false
});

input.value = "";

saveTasks();
renderTasks();

});

/* iniciar */

loadTasks();
renderTasks();