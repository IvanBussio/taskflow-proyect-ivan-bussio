let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const input = document.getElementById("input");
const catInput = document.getElementById("categoryInput");
const themeBtn = document.getElementById("themeBtn");

/* IA */
input.addEventListener("input",()=>{
  let t = input.value.toLowerCase();

  if(t.includes("gym")) catInput.value="Gym";
  else if(t.includes("compr")) catInput.value="Compras";
  else if(t.includes("estudi")) catInput.value="Estudio";
  else if(t.includes("trab")) catInput.value="Trabajo";
  else catInput.value="Personal";
});

/* añadir */
function addTask(){
  let text = input.value.trim();
  if(!text) return;

  tasks.push({
    id:Date.now(),
    text: text.toUpperCase(),
    category: catInput.value || "Personal",
    completed:false
  });

  input.value="";
  catInput.value="";
  save();
}

/* render */
function render(){
  const list=document.getElementById("taskList");
  list.innerHTML="";

  tasks.forEach(t=>{
    const div=document.createElement("div");
    div.className="task";

    div.innerHTML=`
      <span onclick="toggle(${t.id})" class="${t.completed?'completed':''}">
        ${t.text}
      </span>

      <div>
        <span class="chip cat-${t.category}">${t.category}</span>
        <button onclick="edit(${t.id})">✏️</button>
        <button onclick="remove(${t.id})">❌</button>
      </div>
    `;

    list.appendChild(div);
  });
}

/* ordenar */
function sortTasks(){
  tasks.sort((a,b)=>a.text.localeCompare(b.text));
  save();
}

/* acciones */
function toggle(id){
  tasks = tasks.map(t=>t.id===id?{...t,completed:!t.completed}:t);
  save();
}

function remove(id){
  tasks = tasks.filter(t=>t.id!==id);
  save();
}

function edit(id){
  let t = tasks.find(t=>t.id===id);
  let nuevo = prompt("Editar",t.text);
  if(nuevo) t.text=nuevo.toUpperCase();
  save();
}

function deleteAll(){
  tasks=[];
  save();
}

/* guardar */
function save(){
  localStorage.setItem("tasks",JSON.stringify(tasks));
  render();
}

/* 🌙☀️ tema con icono */
function toggleTheme(){
  if(document.body.classList.contains("dark")){
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    themeBtn.textContent="🌙";
  }else{
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    themeBtn.textContent="☀️";
  }
}

/* modal */
function openInfo(){
  document.getElementById("infoModal").style.display="flex";
}

function closeInfo(e){
  if(e.target.id==="infoModal"){
    e.currentTarget.style.display="none";
  }
}

/* welcome */
if(!localStorage.getItem("welcome")){
  document.getElementById("welcome").style.display="flex";
  localStorage.setItem("welcome",true);
}

function closeWelcome(){
  document.getElementById("welcome").style.display="none";
}

/* enter */
input.addEventListener("keypress",(e)=>{
  if(e.key==="Enter") addTask();
});

render();