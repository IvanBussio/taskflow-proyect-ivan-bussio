document.addEventListener("DOMContentLoaded",()=>{

let tasks=[];
let filter="all";

const input=document.getElementById("taskInput");
const addBtn=document.getElementById("addTaskBtn");
const list=document.getElementById("taskList");
const search=document.getElementById("searchInput");
const stats=document.getElementById("taskStats");
const progress=document.getElementById("progressBar");

function loadTasks(){
const saved=localStorage.getItem("tasks");
if(saved) tasks=JSON.parse(saved);
}

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function render(){

list.innerHTML="";

let filtered=[...tasks];

if(filter==="pending") filtered=filtered.filter(t=>!t.completed);
if(filter==="done") filtered=filtered.filter(t=>t.completed);

const q=search.value.toLowerCase();

filtered=filtered.filter(t=>t.title.toLowerCase().includes(q));

filtered.forEach((task,index)=>{

const li=document.createElement("li");
li.className="flex justify-between items-center bg-slate-100/70 p-3 rounded task-enter";

const text=document.createElement("span");
text.textContent=task.title;

if(task.completed) text.classList.add("completed");

const actions=document.createElement("div");

const complete=document.createElement("button");
complete.innerHTML='<i class="fa-solid fa-check"></i>';
complete.className="px-2 py-1";

complete.onclick=()=>{
task.completed=!task.completed;
saveTasks();
render();
};

const edit=document.createElement("button");
edit.innerHTML='<i class="fa-solid fa-pen"></i>';
edit.className="px-2 py-1";

edit.onclick=()=>{
const nuevo=prompt("Editar tarea:",task.title);
if(nuevo){
task.title=nuevo;
saveTasks();
render();
}
};

const del=document.createElement("button");
del.innerHTML='<i class="fa-solid fa-trash"></i>';
del.className="px-2 py-1";

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

function updateStats(){

const total=tasks.length;
const done=tasks.filter(t=>t.completed).length;

stats.textContent=`Completadas ${done} de ${total}`;

const percent=total?(done/total)*100:0;

progress.style.width=percent+"%";

}

addBtn.onclick=()=>{

const title=input.value.trim();

if(title==="") return;

tasks.push({
id:Date.now(),
title:title,
completed:false
});

input.value="";

saveTasks();
render();

};

document.getElementById("completeAllBtn").onclick=()=>{
tasks.forEach(t=>t.completed=true);
saveTasks();
render();
};

document.getElementById("clearCompletedBtn").onclick=()=>{
tasks=tasks.filter(t=>!t.completed);
saveTasks();
render();
};

search.addEventListener("input",render);

document.getElementById("filterAll").onclick=()=>{filter="all";render()}
document.getElementById("filterPending").onclick=()=>{filter="pending";render()}
document.getElementById("filterDone").onclick=()=>{filter="done";render()}

document.getElementById("sortBtn").onclick=()=>{
tasks.sort((a,b)=>a.title.localeCompare(b.title));
render();
};

loadTasks();
render();

});