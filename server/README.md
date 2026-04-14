# 🔌 TaskFlow Backend API

Este módulo corresponde al backend de la aplicación **TaskFlow**, desarrollado con **Node.js** y **Express.js**, siguiendo una arquitectura por capas que facilita la escalabilidad, el mantenimiento y la separación de responsabilidades.

---

## 🛠️ Tecnologías

### Entorno de ejecución
- **Node.js**

### Framework
- **Express.js** – Framework minimalista para la creación de APIs RESTful.

### Librerías
- **cors** – Permite el acceso a la API desde distintos orígenes.
- **dotenv** – Gestión de variables de entorno.
- **nodemon** – Recarga automática del servidor en desarrollo.

### Formato de datos
- **JSON (JavaScript Object Notation)** – Utilizado para el intercambio de datos entre el cliente y el servidor.

---

## 🏗️ Arquitectura del Backend

La aplicación sigue una **arquitectura por capas**, permitiendo una clara separación de responsabilidades: 
server/
└── src/
├── config/        # Configuración de variables de entorno
│   └── env.js
├── controllers/   # Gestión de las peticiones HTTP
│   └── task.controller.js
├── routes/        # Definición de endpoints
│   └── task.routes.js
├── services/      # Lógica de negocio
│   └── task.service.js
└── index.js       # Punto de entrada del servidor
### 📌 Descripción de las capas

| Capa | Descripción |
|------|-------------|
| **Routes** | Define las rutas y las asocia con los controladores. |
| **Controllers** | Gestiona las solicitudes (`req`) y respuestas (`res`). |
| **Services** | Contiene la lógica de negocio y la manipulación de datos. |
| **Config** | Maneja las variables de entorno mediante `dotenv`. |

---

## 🚀 Instalación y Ejecución

### 1️⃣ Instalar dependencias
```bash
cd server
npm install