<!DOCTYPE html>
<html lang="es">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>TaskFlow Pro</title>

<style>

body{
margin:0;
font-family:Arial, Helvetica, sans-serif;
min-height:100vh;
color:white;
text-align:center;
transition:0.4s;

/* fondo aurora */

background:
radial-gradient(circle at 20% 20%, #4f46e5, transparent 40%),
radial-gradient(circle at 80% 30%, #06b6d4, transparent 40%),
radial-gradient(circle at 40% 80%, #9333ea, transparent 40%),
#020617;
}

body.light{
background:#f4f6fb;
color:#222;
}

h1{
margin-top:40px;
font-size:40px;
}

.subtitle{
opacity:0.8;
margin-bottom:30px;
}

/* toggle */

.toggle{
margin:20px auto;
width:60px;
height:35px;
border-radius:20px;
background:#111;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
font-size:18px;
}

/* stats */

.stats{
display:flex;
justify-content:center;
gap:20px;
margin-bottom:20px;
flex-wrap:wrap;
}

.card{
background:rgba(255,255,255,0.2);
padding:20px;
border-radius:12px;
width:140px;
}

body.light .card{
background:white;
box-shadow:0 5px 15px rgba(0,0,0,0.1);
}

/* progress */

.progress-container{
width:70%;
height:10px;
background:rgba(255,255,255,0.3);
margin:20px auto;
border-radius:10px;
overflow:hidden;
}

body.light .progress-container{
background:#ddd;
}

.progress-bar{
height:100%;
width:0%;
background:#4dabf7;
transition:0.3s;
}

/* input */

.input-area{
margin:25px;
}

input{
padding:10px;
border:none;
border-radius:8px;
width:200px;
}

button{
padding:10px 16px;
border:none;
border-radius:8px;
background:#4dabf7;
color:white;
cursor:pointer;
}

/* board */

.board{
display:flex;
justify-content:center;
gap:30px;
flex-wrap:wrap;
padding-bottom:50px;
}

.column{
background:rgba(255,255,255,0.15);
padding:20px;
border-radius:15px;
width:250px;
min-height:300px;
}

body.light .column{
background:white;
box-shadow:0 5px 15px rgba(0,0,0,0.1);
}

.task{
background:white;
color:black;
padding:10px;
border-radius:8px;
margin-top:10px;
cursor:pointer;
transition:0.2s;
}

/* efecto hover */

.task:hover{
transform:scale(1.05);
}

</style>
</head>

<body>

<h1>TaskFlow Pro</h1>
<p class="subtitle">Organiza tu trabajo con un tablero Kanban moderno</p>

<div class="toggle" onclick="toggleMode()" id="modeBtn">
🌙
</div>

<div class="stats">

<div class="card">
<p>Total Tasks</p>
<h2 id="totalTasks">0</h2>
</div>

<div class="card">
<p>Completed</p>
<h2 id="completedTasks">0</h2>
</div>

<div class="card">
<p>In Progress</p>
<h2 id="progressTasks">0</h2>
</div>

</div>

<div class="progress-container">
<div class="progress-bar" id="progressBar"></div>
</div>

<p id="progressText">0% Completed</p>

<div class="input-area">
<input id="taskInput" placeholder="Nueva tarea">
<button onclick="addTask()">Añadir</button>
</div>

<div class="board">

<div class="column">
<h3>📌 TO DO</h3>
<div id="todo"></div>
</div>

<div class="column">
<h3>⚙️ IN PROGRESS</h3>
<div id="progress"></div>
</div>

<div class="column">
<h3>✅ DONE</h3>
<div id="done"></div>
</div>

</div>

<script>

function toggleMode(){

const body=document.body
const btn=document.getElementById("modeBtn")

body.classList.toggle("light")

if(body.classList.contains("light")){
btn.innerHTML="☀️"
}else{
btn.innerHTML="🌙"
}

}

function addTask(){

const input=document.getElementById("taskInput")
const text=input.value

if(text==="") return

const task=document.createElement("div")
task.className="task"
task.innerText=text

task.onclick=function(){

if(task.parentElement.id==="todo"){

document.getElementById("progress").appendChild(task)

}else if(task.parentElement.id==="progress"){

document.getElementById("done").appendChild(task)

}

updateStats()

}

document.getElementById("todo").appendChild(task)

input.value=""

updateStats()

}

function updateStats(){

const todo=document.querySelectorAll("#todo .task").length
const progress=document.querySelectorAll("#progress .task").length
const done=document.querySelectorAll("#done .task").length

const total=todo+progress+done

document.getElementById("totalTasks").innerText=total
document.getElementById("completedTasks").innerText=done
document.getElementById("progressTasks").innerText=progress

let percent=0

if(total>0){
percent=Math.round((done/total)*100)
}

document.getElementById("progressBar").style.width=percent+"%"
document.getElementById("progressText").innerText=percent+"% Completed"

}

</script>

</body>
</html>
