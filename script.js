document.addEventListener("DOMContentLoaded", () => {

let tasks=[];
let filter="all";

const input=document.getElementById("taskInput");
const addBtn=document.getElementById("addTaskBtn");
const list=document.getElementById("taskList");
const search=document.getElementById("searchInput");
const sortBtn=document.getElementById("sortBtn");
const stats=document.getElementById("taskStats");
const progressBar=document.getElementById("progressBar");

/* STORAGE */

function loadTasks(){
const saved=localStorage.getItem("tasks");
if(saved){tasks=JSON.parse(saved);}
}

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

/* RENDER */

function render(){

list.innerHTML="";

let filtered=[...tasks];

if(filter==="pending") filtered=filtered.filter(t=>!t.completed);
if(filter==="done") filtered=filtered.filter(t=>t.completed);

const query=search.value.toLowerCase();

filtered=filtered.filter(t=>t.title.toLowerCase().includes(query));

filtered.forEach((task,index)=>{

const li=document.createElement("li");
li.className="flex justify-between items-center bg-white p-3 rounded shadow task-enter";

const text=document.createElement("span");
text.textContent=task.title;

if(task.completed) text.classList.add("completed");

const actions=document.createElement("div");

const complete=document.createElement("button");
complete.innerHTML='<i class="fa-solid fa-check"></i>';
complete.className="bg-green-500 text-white px-2 py-1 rounded";

complete.onclick=()=>{
task.completed=!task.completed;
saveTasks();
render();
};

const edit=document.createElement("button");
edit.innerHTML='<i class="fa-solid fa-pen"></i>';
edit.className="bg-yellow-400 text-white px-2 py-1 rounded ml-2";

edit.onclick=()=>{
const nuevoTitulo=prompt("Editar tarea:",task.title);
if(nuevoTitulo){
task.title=nuevoTitulo;
saveTasks();
render();
}
};

const del=document.createElement("button");
del.innerHTML='<i class="fa-solid fa-trash"></i>';
del.className="bg-red-500 text-white px-2 py-1 rounded ml-2";

del.onclick=()=>{
tasks.splice(index,1);
saveTasks();
render();
};

actions.appendChild(complete);
actions.appendChild(edit);
actions.appendChild(del);

li.appendChild(text);
li.appendChild(actions);

list.appendChild(li);

});

updateStats();

}

/* STATS */

function updateStats(){

const total=tasks.length;
const done=tasks.filter(t=>t.completed).length;

stats.textContent=`Completadas ${done} de ${total}`;

const percent=total ? (done/total)*100 : 0;
progressBar.style.width=percent+"%";

}

/* ADD */

addBtn.onclick=()=>{

const title=input.value.trim();

if(title==="") return;

tasks.push({
id:Date.now(),
title:title,
completed:false,
createdAt:new Date()
});

input.value="";

saveTasks();
render();

};

/* SORT */

sortBtn.onclick=()=>{
tasks.sort((a,b)=>a.title.localeCompare(b.title));
render();
};

/* FILTER */

document.getElementById("filterAll").onclick=()=>{filter="all";render();}
document.getElementById("filterPending").onclick=()=>{filter="pending";render();}
document.getElementById("filterDone").onclick=()=>{filter="done";render();}

/* SEARCH */

search.addEventListener("input",render);

/* COMPLETE ALL */

document.getElementById("completeAllBtn").onclick=()=>{
tasks.forEach(task=>task.completed=true);
saveTasks();
render();
};

/* CLEAR COMPLETED */

document.getElementById("clearCompletedBtn").onclick=()=>{
tasks=tasks.filter(task=>!task.completed);
saveTasks();
render();
};

/* DARK MODE */

const toggle=document.getElementById("themeToggle");

function loadTheme(){
const saved=localStorage.getItem("theme");
if(saved){
document.body.className=saved;
toggle.textContent=saved==="dark"?"☀️":"🌙";
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