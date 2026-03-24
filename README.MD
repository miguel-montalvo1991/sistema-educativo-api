# 📚 Sistema Educativo API

API REST desarrollada con Node.js y Express para la gestión de un sistema educativo.

---

## 🚀 Características

* Gestión de cursos
* Gestión de profesores
* Gestión de estudiantes
* Gestión de materias
* Inscripciones a cursos
* Registro de notas
* Gestión de usuarios

---

## 🧱 Arquitectura

El proyecto sigue una arquitectura por capas:

* **Controllers** → Manejan las peticiones HTTP
* **Services** → Contienen la lógica de negocio
* **Models** → Acceso a base de datos
* **Middlewares** → Manejo de errores y validaciones

---

## 📁 Estructura del proyecto

```
├── controllers/
├── services/
├── models/
├── routes/
├── middlewares/
├── utils/
├── app.js
└── package.json
```

---

## ⚙️ Instalación

```bash
git clone https://github.com/miguel-montalvo1991/sistema-educativo-api.git
cd sistema-educativo-api
npm install
```

---

## ▶️ Ejecución

```bash
npm run dev
```

o

```bash
node app.js
```

---

## 🌐 Endpoints principales

### 📌 Cursos

* GET /api/cursos
* GET /api/cursos/:id
* POST /api/cursos
* PUT /api/cursos/:id
* DELETE /api/cursos/:id

### 📌 Profesores

* GET /api/profesores
* GET /api/profesores/:id
* POST /api/profesores
* PUT /api/profesores/:id
* DELETE /api/profesores/:id

### 📌 Estudiantes

* GET /api/estudiantes
* GET /api/estudiantes/:id
* POST /api/estudiantes
* PUT /api/estudiantes/:id
* DELETE /api/estudiantes/:id

### 📌 Materias

* GET /api/materias
* GET /api/materias/:id
* POST /api/materias
* PUT /api/materias/:id
* DELETE /api/materias/:id

### 📌 Inscripciones

* GET /api/inscripciones
* POST /api/inscripciones

### 📌 Notas

* GET /api/notas
* POST /api/notas

### 📌 Usuarios

* GET /api/usuarios
* GET /api/usuarios/:id
* POST /api/usuarios
* PUT /api/usuarios/:id
* DELETE /api/usuarios/:id

---

## ❌ Manejo de errores

La API usa un middleware global para manejar errores:

```json
{
  "success": false,
  "message": "Descripción del error"
}
```

---

## 🛠 Tecnologías

* Node.js
* Express
* JavaScript
* nodemon 

---

## 👨‍💻 Autor

Miguel Montalvo
Proyecto académico - SENA
