// js/api.js
const API_URL = 'http://localhost:3000/api/v1/tasks';

// Obtener todas las tareas
export const getTasks = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error al obtener las tareas');
  }
  return response.json();
};

// Crear una nueva tarea
export const createTask = async (task) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al crear la tarea');
  }

  return response.json();
};

// Actualizar una tarea
export const updateTask = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar la tarea');
  }

  return response.json();
};

// Eliminar una tarea
export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar la tarea');
  }
};