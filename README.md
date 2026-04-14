# 🚀 TaskFlow

TaskFlow es una aplicación web de gestión de tareas que combina un **frontend interactivo** con un **backend RESTful** desarrollado con **Node.js y Express**. Permite crear, editar, completar y eliminar tareas de forma eficiente, ofreciendo una experiencia de usuario moderna y organizada.

---

## 🌐 Aplicación Desplegada

- **Frontend (Vercel):**  
  👉 https://taskflow-proyect-ivan-bussio.vercel.app/

- **Backend (Desarrollo Local):**  
  👉 http://localhost:3000/api/v1/tasks

---

## 🧠 Características

- ✅ Gestión completa de tareas (CRUD)
- 🔍 Búsqueda y filtrado de tareas
- 🏷️ Categorización automática
- 🌐 Persistencia de datos mediante API REST
- 🏗️ Arquitectura backend por capas
- 🔐 Variables de entorno con dotenv
- 🛡️ Manejo global de errores
- 🎨 Interfaz moderna con Tailwind CSS

---

## 🛠️ Tecnologías Utilizadas

### 🌐 Frontend
**Lenguajes**
- HTML5
- CSS3
- JavaScript (ES6+)

**Frameworks y Librerías**
- Tailwind CSS – Framework de estilos utilitarios.
- Fetch API – API nativa del navegador para realizar peticiones HTTP.

### 🖥️ Backend
**Entorno de ejecución**
- Node.js

**Framework**
- Express.js – Framework minimalista para la creación de APIs RESTful.

**Librerías**
- cors – Permite el acceso a la API desde distintos orígenes.
- dotenv – Gestión de variables de entorno.
- nodemon – Recarga automática del servidor en desarrollo.

---

## 🔄 Formato de Intercambio de Datos

La comunicación entre el frontend y el backend se realiza utilizando **JSON (JavaScript Object Notation)**, un formato ligero y ampliamente utilizado para el intercambio de datos en aplicaciones web.

### 📌 Ejemplo de respuesta de la API

```json
{
  "id": 1,
  "titulo": "Estudiar Node.js",
  "categoria": "Estudio",
  "prioridad": "Alta",
  "completada": false,
  "createdAt": "2026-04-13T15:30:25.751Z"
}