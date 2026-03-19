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
    text:text.toUpperCase(),
    category:catInput.value,
    completed:false
  });

  input.value="";
  catInput.value="";
  save();
}

/* render */
function render(){
  const list=document.getElementById("taskList");
  const dash=document.getElementById("dashboard");

  list.innerHTML="";

  let comp=tasks.filter(t=>t.completed).length;

  dash.innerHTML=`
    <div class="dashboard-card total">TOTAL ${tasks.length}</div>
    <div class="dashboard-card completed">COMPLETADAS ${comp}</div>
    <div class="dashboard-card pending">PENDIENTES ${tasks.length-comp}</div>
  `;

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

function sortTasks(){
  tasks.sort((a,b)=>a.text.localeCompare(b.text));
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
  document.body.classList.toggle("light");

  themeBtn.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";
}

/* modal */
function openInfo(){
  document.getElementById("infoModal").style.display="flex";
}

function closeInfo(e){
  if(e.target.id==="infoModal"){
    document.getElementById("infoModal").style.display="none";
  }
}

/* enter */
input.addEventListener("keypress",(e)=>{
  if(e.key==="Enter") addTask();
});

render();