const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/env');
const taskRoutes = require('./routes/task.routes');

const app = express();

// Middleware de logging
const logger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${req.method}] ${req.originalUrl} - ${res.statusCode} (${duration}ms)`
    );
  });
  next();
};

app.use(cors());
app.use(express.json());
app.use(logger);

// Ruta de verificación
app.get('/', (req, res) => {
  res.send('API TaskFlow funcionando 🚀');
});

// Rutas de la API
app.use('/api/v1/tasks', taskRoutes);

// Middleware para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
  if (err.message === 'NOT_FOUND') {
    return res.status(404).json({ error: 'Recurso no encontrado' });
  }

  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});