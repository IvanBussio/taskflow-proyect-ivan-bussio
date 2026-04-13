# 🚀 TaskFlow

TaskFlow es una aplicación de gestión de tareas que combina un **frontend interactivo** con un **backend RESTful** desarrollado con Node.js y Express. Permite crear, editar, completar y eliminar tareas con categorías inteligentes.

## 🧠 Características

- ✅ Gestión completa de tareas (CRUD)
- 🧩 Arquitectura por capas (Routes, Controllers, Services)
- 🌐 API RESTful con Express
- 🔐 Variables de entorno con dotenv
- ⚙️ Manejo global de errores
- 🎨 Interfaz moderna con TailwindCSS
- 🤖 Categorización automática de tareas
- 🔄 Comunicación frontend-backend mediante Fetch API

## 📁 Estructura del Proyecto
taskflow-project/
├── docs/
│   └── backend-api.md
├── js/
│   └── app.js
├── server/
│   ├── src/
│   │   ├── config/env.js
│   │   ├── controllers/task.controller.js
│   │   ├── routes/task.routes.js
│   │   ├── services/task.service.js
│   │   └── index.js
│   ├── package.json
│   └── .env
├── index.html
├── style.css
├── tailwind.config.js
└── README.md