const service = require('../services/task.service');

const getTasks = (req, res) => {
  res.json(service.obtenerTodas());
};

const createTask = (req, res) => {
  const { titulo } = req.body;

  if (!titulo || typeof titulo !== 'string' || titulo.trim().length < 3) {
    return res.status(400).json({
      error: "El título debe tener al menos 3 caracteres"
    });
  }

  const nueva = service.crearTarea({ titulo });

  res.status(201).json(nueva);
};

const deleteTask = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    service.eliminarTarea(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTasks,
  createTask,
  deleteTask
};