const taskService = require('../services/task.service');

const obtenerTodas = (req, res, next) => {
  try {
    const tareas = taskService.obtenerTodas();
    res.status(200).json(tareas);
  } catch (error) {
    next(error);
  }
};

const crearTarea = (req, res, next) => {
  try {
    const { titulo, categoria, prioridad } = req.body;

    if (!titulo || titulo.trim().length < 3) {
      return res.status(400).json({
        error: 'El título es obligatorio y debe tener al menos 3 caracteres.',
      });
    }

    const nuevaTarea = taskService.crearTarea({
      titulo: titulo.trim(),
      categoria,
      prioridad,
    });

    res.status(201).json(nuevaTarea);
  } catch (error) {
    next(error);
  }
};

const eliminarTarea = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    taskService.eliminarTarea(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const actualizarTarea = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const tareaActualizada = taskService.actualizarTarea(id, req.body);
    res.status(200).json(tareaActualizada);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  obtenerTodas,
  crearTarea,
  eliminarTarea,
  actualizarTarea,
};