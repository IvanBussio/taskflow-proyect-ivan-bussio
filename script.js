let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const input = document.getElementById("input");
const catInput = document.getElementById("categoryInput");

/* IA automática en tiempo real */
input.addEventListener("input", () => {
  const text = input.value.toLowerCase();

  if(text.includes("gym")) catInput.value = "Gym";
  else if(text.includes("compr")) catInput.value = "Compras";
  else if(text.includes("estudi")) catInput.value = "Estudio";
  else if(text.includes("trab")) catInput.value = "Trabajo";
  else catInput.value = "Personal";
});

/* añadir */
function addTask(){
  let text = input.value.trim();
  if(!text) return;

  let cat = catInput.value || "Personal";

  tasks.push({
    id:Date.now(),
    text,
    category:cat,
    completed:false
  });

  input.value="";
  catInput.value="";
  save();
}

/* render */
function render(){

  const list = document.getElementById("taskList");
  list.innerHTML="";

  tasks.forEach(t=>{

    const div = document.createElement("div");
    div.className="task";

    div.innerHTML=`
      <span onclick="toggle(${t.id})" class="${t.completed?'completed':''}">
        ${t.text}
      </span>

      <div class="flex gap-2 items-center">

        <div class="chip cat-${t.category}">
          ${t.category}
        </div>

        <button onclick="edit(${t.id})">✏️</button>
        <button onclick="remove(${t.id})">❌</button>

      </div>
    `;

    list.appendChild(div);

  });

  renderStats();
}

/* stats */
function renderStats(){

  const stats = {};
  const container = document.getElementById("stats");
  container.innerHTML="";

  tasks.forEach(t=>{
    stats[t.category]=(stats[t.category]||0)+1;
  });

  for(let cat in stats){

    const div=document.createElement("div");
    div.className=`stat cat-${cat}`;
    div.innerHTML=`${cat}: ${stats[cat]}`;

    container.appendChild(div);
  }
}

/* acciones */
function toggle(id){
  tasks = tasks.map(t=> t.id===id ? {...t,completed:!t.completed}:t);
  save();
}

function remove(id){
  tasks = tasks.filter(t=>t.id!==id);
  save();
}

function edit(id){
  let t = tasks.find(t=>t.id===id);
  let nuevo = prompt("Editar tarea", t.text);
  if(nuevo) t.text=nuevo;
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

/* tema */
function toggleTheme(){
  document.body.classList.toggle("dark");
}

/* modales */
function openInfo(){
  document.getElementById("infoModal").classList.remove("hidden");
}

function closeInfo(e){
  if(e.target.id==="infoModal"){
    e.currentTarget.classList.add("hidden");
  }
}

/* enter */
input.addEventListener("keypress",(e)=>{
  if(e.key==="Enter") addTask();
});

render();