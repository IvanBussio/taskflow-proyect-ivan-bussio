const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

/* CONFIG */
const PORT = process.env.PORT || 3000;

/* MIDDLEWARES */
app.use(cors());
app.use(express.json());

/* LOGGER */
app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    console.log(`${req.method} ${req.url} ${res.statusCode} - ${Date.now() - start}ms`);
  });

  next();
});

/* DATA EN MEMORIA */
let tasks = [];
let id = 1;

/* ROUTES */

// GET
app.get('/api/v1/tasks', (req, res) => {
  res.json(tasks);
});

// POST
app.post('/api/v1/tasks', (req, res) => {
  const { titulo } = req.body;

  if (!titulo || typeof titulo !== "string" || titulo.trim().length < 3) {
    return res.status(400).json({ error: "Título inválido (mínimo 3 caracteres)" });
  }

  const nueva = {
    id: id++,
    titulo: titulo.trim()
  };

  tasks.push(nueva);

  res.status(201).json(nueva);
});

// DELETE
app.delete('/api/v1/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);

  const index = tasks.findIndex(t => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({ error: "No encontrada" });
  }

  tasks.splice(index, 1);

  res.status(204).send();
});

/* ERROR HANDLER GLOBAL */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor" });
});

/* START */
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});