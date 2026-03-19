let tasks = [];
let idCounter = 1;

const obtenerTodas = () => tasks;

const crearTarea = (data) => {
  const nueva = {
    id: idCounter++,
    titulo: data.titulo,
    completada: false
  };

  tasks.push(nueva);
  return nueva;
};

const eliminarTarea = (id) => {
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    throw new Error('NOT_FOUND');
  }

  tasks.splice(index, 1);
};

module.exports = {
  obtenerTodas,
  crearTarea,
  eliminarTarea
};