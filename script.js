let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let categories = JSON.parse(localStorage.getItem("categories")) || [
  { name: "General", color: "#34d399" }
];

const taskList = document.getElementById("taskList");
const stats = document.getElementById("stats");
const progressBar = document.getElementById("progressBar");

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getRandomColor(){
  const colors=["#60a5fa","#f472b6","#facc15","#34d399","#fb923c","#a78bfa"];
  return colors[Math.floor(Math.random()*colors.length)];
}

function addCategory(){
  const input=document.getElementById("newCategory");
  const value=input.value.trim();

  if(!value)return;

  if(!categories.find(c=>c.name===value)){
    categories.push({name:value,color:getRandomColor()});
    localStorage.setItem("categories",JSON.stringify(categories));
    renderCategories();
  }

  input.value="";
}

function deleteCategory(name){
  categories=categories.filter(c=>c.name!==name);

  tasks.forEach(t=>{
    if(t.category===name)t.category="General";
  });

  localStorage.setItem("categories",JSON.stringify(categories));
  saveTasks();

  renderCategories();
  renderTasks();
}

function renderCategories(){
  const select=document.getElementById("category");
  const filter=document.getElementById("categoryFilter");
  const list=document.getElementById("categoryList");

  select.innerHTML="";
  filter.innerHTML='<option value="all">Todas</option>';
  list.innerHTML="";

  categories.forEach(cat=>{
    const opt=document.createElement("option");
    opt.value=cat.name;
    opt.textContent=cat.name;
    select.appendChild(opt);

    const opt2=document.createElement("option");
    opt2.value=cat.name;
    opt2.textContent=cat.name;
    filter.appendChild(opt2);

    const chip=document.createElement("div");
    chip.className="px-3 py-1 rounded text-sm flex gap-2";
    chip.style.background=cat.color;
    chip.innerHTML=`${cat.name} ${cat.name!=="General"?`<button onclick="deleteCategory('${cat.name}')">✖</button>`:""}`;

    list.appendChild(chip);
  });
}

function addTask(){
  const input=document.getElementById("taskInput");
  const category=document.getElementById("category").value;

  if(input.value.trim()==="")return;

  tasks.push({text:input.value,done:false,category});

  input.value="";
  saveTasks();
  renderTasks();
}

function toggleTask(i){
  tasks[i].done=!tasks[i].done;
  saveTasks();
  renderTasks();
}

function deleteTask(i){
  tasks.splice(i,1);
  saveTasks();
  renderTasks();
}

function completeAll(){
  tasks.forEach(t=>t.done=true);
  saveTasks();
  renderTasks();
}

function deleteCompleted(){
  tasks=tasks.filter(t=>!t.done);
  saveTasks();
  renderTasks();
}

function renderTasks(){
  taskList.innerHTML="";

  const search=document.getElementById("search").value.toLowerCase();
  const catFilter=document.getElementById("categoryFilter").value;

  let filtered=tasks.filter(t=>{
    if(catFilter==="all")return true;
    return t.category===catFilter;
  });

  filtered=filtered.filter(t=>t.text.toLowerCase().includes(search));

  filtered.forEach((task,i)=>{
    const div=document.createElement("div");
    div.className="task";
    div.style.animation="fadeIn .3s ease";

    const cat=categories.find(c=>c.name===task.category);

    div.innerHTML=`
      <div>
        <span style="${task.done?'text-decoration:line-through;opacity:.6':''}">
          ${task.text}
        </span>

        <div class="flex items-center gap-2 mt-1">
          <div style="width:10px;height:10px;border-radius:50%;background:${cat?.color}"></div>
          <p class="text-xs opacity-70">${task.category}</p>
        </div>
      </div>

      <div class="flex gap-2">
        <button onclick="toggleTask(${i})">✔</button>
        <button onclick="deleteTask(${i})">🗑</button>
      </div>
    `;

    taskList.appendChild(div);
  });

  updateStats();
}

function updateStats(){
  const total=tasks.length;
  const done=tasks.filter(t=>t.done).length;

  stats.innerText=`${done} de ${total} completadas`;
  progressBar.style.width=total?(done/total)*100+"%":"0%";
}

document.getElementById("search").addEventListener("input",renderTasks);
document.getElementById("categoryFilter").addEventListener("change",renderTasks);

document.getElementById("themeToggle").onclick=()=>{
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
};

renderCategories();
renderTasks();

function openWelcome(){
  document.getElementById("welcomeModal").classList.remove("hidden");
}

function closeWelcome(){
  document.getElementById("welcomeModal").classList.add("hidden");
}