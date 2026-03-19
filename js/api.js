const API_URL = "https://TU-BACKEND.onrender.com/api/v1/tasks";

export async function getTasks() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function createTask(titulo) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ titulo }),
  });

  return await res.json();
}

export async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}