const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const search = document.getElementById("search");
const toggle = document.getElementById("dark-toggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

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

function saveTasks(){

localStorage.setItem("tasks",JSON.stringify(tasks));

}

form.addEventListener("submit",(e)=>{

e.preventDefault();

const taskText=input.value.trim();

if(taskText==="") return;

tasks.push(taskText);

saveTasks();

renderTasks();

input.value="";

});

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

toggle.addEventListener("click",()=>{

document.body.classList.toggle("dark-mode");

});

renderTasks();
