let tasks = [];
let currentId = 1;

const obtenerTodas = () => tasks;

const crearTarea = ({ titulo, categoria, prioridad }) => {
  const nuevaTarea = {
    id: currentId++,
    titulo,
    categoria: categoria || 'General',
    prioridad: prioridad || 'Media',
    completada: false,
    createdAt: new Date(),
  };

  tasks.push(nuevaTarea);
  return nuevaTarea;
};

const eliminarTarea = (id) => {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new Error('NOT_FOUND');
  }
  tasks.splice(index, 1);
};

const actualizarTarea = (id, data) => {
  const tarea = tasks.find((t) => t.id === id);
  if (!tarea) {
    throw new Error('NOT_FOUND');
  }

  Object.assign(tarea, data);
  return tarea;
};

module.exports = {
  obtenerTodas,
  crearTarea,
  eliminarTarea,
  actualizarTarea,
};