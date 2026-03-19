let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const input = document.getElementById("input");
const catInput = document.getElementById("categoryInput");

/* IA categorías en tiempo real */
input.addEventListener("input", () => {
  const t = input.value.toLowerCase();

  if(t.includes("gym")) catInput.value="Gym";
  else if(t.includes("compr")) catInput.value="Compras";
  else if(t.includes("estudi")) catInput.value="Estudio";
  else if(t.includes("trab")) catInput.value="Trabajo";
  else catInput.value="Personal";
});

/* añadir */
function addTask(){
  const text = input.value.trim();
  if(!text) return;

  tasks.push({
    id:Date.now(),
    text,
    category:catInput.value || "Personal",
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
      <span class="${t.completed?'completed':''}" onclick="toggle(${t.id})">
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

/* toggle check */
function toggle(id){
  tasks = tasks.map(t =>
    t.id === id ? {...t, completed:!t.completed} : t
  );
  save();
}

/* eliminar */
function remove(id){
  tasks = tasks.filter(t=>t.id!==id);
  save();
}

/* editar */
function edit(id){
  const t = tasks.find(t=>t.id===id);
  const nuevo = prompt("Editar tarea", t.text);
  if(nuevo) t.text = nuevo;
  save();
}

/* eliminar todo */
function deleteAll(){
  tasks = [];
  save();
}

/* guardar */
function save(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();
}

/* tema */
function toggleTheme(){
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
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