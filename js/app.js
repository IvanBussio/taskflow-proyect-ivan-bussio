const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const search = document.getElementById("search");
const toggle = document.getElementById("dark-toggle");
const themeSelector = document.getElementById("theme-selector");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* RENDER TASKS */

function renderTasks(){

list.innerHTML="";

tasks.forEach((task,index)=>{

const li=document.createElement("li");

li.textContent=task;

const deleteBtn=document.createElement("button");

deleteBtn.textContent="Eliminar";

deleteBtn.addEventListener("click",()=>{

tasks.splice(index,1);

saveTasks();

renderTasks();

});

li.appendChild(deleteBtn);

list.appendChild(li);

});

document.getElementById("task-count").textContent=tasks.length;

}

/* SAVE TASKS */

function saveTasks(){

localStorage.setItem("tasks",JSON.stringify(tasks));

}

/* ADD TASK */

form.addEventListener("submit",(e)=>{

e.preventDefault();

const taskText=input.value.trim();

if(taskText==="") return;

tasks.push(taskText);

saveTasks();

renderTasks();

input.value="";

});

/* SEARCH TASK */

search.addEventListener("keyup",()=>{

const text=search.value.toLowerCase();

const items=document.querySelectorAll("#task-list li");

items.forEach(item=>{

const content=item.textContent.toLowerCase();

if(content.includes(text)){

item.style.display="flex";

}else{

item.style.display="none";

}

});

});

/* DARK MODE */

toggle.addEventListener("click",()=>{

document.body.classList.toggle("dark-mode");

});

/* THEME SELECTOR */

const savedTheme=localStorage.getItem("themeColor");

if(savedTheme){

document.documentElement.style.setProperty("--primary",savedTheme);
document.documentElement.style.setProperty("--primary-light",savedTheme);

if(themeSelector) themeSelector.value=savedTheme;

}

themeSelector.addEventListener("change",(e)=>{

const color=e.target.value;

document.documentElement.style.setProperty("--primary",color);
document.documentElement.style.setProperty("--primary-light",color);

localStorage.setItem("themeColor",color);

});

/* INIT */

renderTasks();
