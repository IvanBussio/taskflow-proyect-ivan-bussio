let tasks = [];
let currentFilter = "all";

/* STORAGE */

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function loadTasks(){

const saved = localStorage.getItem("tasks");

if(saved){
tasks = JSON.parse(saved);
}

}

loadTasks();

/* ADD TASK */

function addTask(){

const input = document.getElementById("taskTitle");

const title = input.value.trim();

if(title === "") return;

const newTask = {
id: Date.now(),
title: title,
completed:false
};

tasks.push(newTask);

input.value="";

saveTasks();

renderTasks();

}

/* RENDER */

function renderTasks(){

const list = document.getElementById("taskList");

list.innerHTML="";

let filtered=[...tasks];

if(currentFilter==="completed"){
filtered=filtered.filter(t=>t.completed);
}

if(currentFilter==="pending"){
filtered=filtered.filter(t=>!t.completed);
}

const search=document.getElementById("searchTask").value.toLowerCase();

filtered=filtered.filter(t=>t.title.toLowerCase().includes(search));

filtered.forEach((task)=>{

const div=document.createElement("div");

div.className="flex justify-between items-center p-3 rounded-lg bg-white/60 shadow";

const text=document.createElement("span");

text.textContent=task.title;

if(task.completed){
text.classList.add("line-through","text-red-500");
}

const actions=document.createElement("div");

/* COMPLETE */

const completeBtn=document.createElement("button");

completeBtn.textContent=task.completed?"↩":"✔";

completeBtn.className="bg-green-500 text-white px-2 py-1 rounded";

completeBtn.onclick=()=>{

const target=tasks.find(t=>t.id===task.id);

target.completed=!target.completed;

saveTasks();

renderTasks();

};

/* EDIT */

const editBtn=document.createElement("button");

editBtn.textContent="✏️";

editBtn.className="bg-yellow-400 text-white px-2 py-1 rounded ml-2";

editBtn.onclick=()=>{

const newText=prompt("Editar tarea:",task.title);

if(newText){

const target=tasks.find(t=>t.id===task.id);

target.title=newText;

saveTasks();

renderTasks();

}

};

/* DELETE */

const deleteBtn=document.createElement("button");

deleteBtn.textContent="🗑";

deleteBtn.className="bg-red-500 text-white px-2 py-1 rounded ml-2";

deleteBtn.onclick=()=>{

tasks=tasks.filter(t=>t.id!==task.id);

saveTasks();

renderTasks();

};

actions.appendChild(completeBtn);
actions.appendChild(editBtn);
actions.appendChild(deleteBtn);

div.appendChild(text);
div.appendChild(actions);

list.appendChild(div);

});

}

/* SEARCH */

document
.getElementById("searchTask")
.addEventListener("input",renderTasks);

/* FILTER */

function filterTasks(type){

currentFilter=type;

renderTasks();

}

/* SORT */

function sortTasks(){

tasks.sort((a,b)=>a.title.localeCompare(b.title));

saveTasks();

renderTasks();

}

/* THEME */

const toggle=document.getElementById("themeToggle");

toggle.onclick=()=>{

const body=document.body;

if(body.classList.contains("light")){

body.classList.remove("light");
body.classList.add("dark");

toggle.textContent="☀️";

}else{

body.classList.remove("dark");
body.classList.add("light");

toggle.textContent="🌙";

}

};

renderTasks();