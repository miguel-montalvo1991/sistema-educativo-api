# 🎓 Sistema Educativo — API REST

Sistema de gestión académica desarrollado con Node.js, Express y SQLite. Permite administrar estudiantes, profesores, cursos, inscripciones, notas y usuarios mediante una API REST completa con autenticación por middleware.

---

## 👤 Desarrollador

| Nombre | Rol |
|---|---|
| Luis Miguel Montalvo Álvarez | Full Stack Developer |

---

## 🌐 URLs del proyecto

| Servicio | URL |
|---|---|
| Backend (Render) | *Pendiente de despliegue* |

> ⚠️ El backend está en el plan gratuito de Render. La primera petición puede tardar hasta 60 segundos mientras el servidor despierta (cold start).

---

## 📁 Estructura del proyecto

```
sistema-educativo-api/
│
├── index.js                          # Punto de entrada del servidor
├── database.db                       # Base de datos SQLite (se genera automáticamente)
├── package.json                      # Dependencias y scripts del proyecto
├── .env                              # Variables de entorno (no subir a GitHub)
├── .gitignore                        # Archivos excluidos del repositorio
│
├── db/
│   └── db.js                         # Conexión a SQLite y creación de tablas
│
├── middlewares/
│   └── auth.js                       # Middleware de autenticación por header
│
├── models/                           # Capa de acceso a datos (consultas SQL)
│   ├── estudiantesModel.js
│   ├── profesoresModel.js
│   ├── cursosModel.js
│   ├── inscripcionesModel.js
│   ├── notasModel.js
│   └── usuariosModel.js
│
├── controllers/                      # Lógica de negocio y validaciones
│   ├── estudiantesController.js
│   ├── profesoresController.js
│   ├── cursosController.js
│   ├── inscripcionesController.js
│   ├── notasController.js
│   └── usuariosController.js
│
└── routes/                           # Definición de rutas por recurso
    ├── estudiantesRutas.js
    ├── profesoresRutas.js
    ├── cursosRutas.js
    ├── inscripcionesRutas.js
    ├── notasRutas.js
    └── usuariosRutas.js
```

---

## ⚙️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| Node.js | Entorno de ejecución del backend |
| Express | Framework para la API REST |
| SQLite3 | Base de datos local en archivo .db |
| CORS | Comunicación entre frontend y backend |
| dotenv | Manejo de variables de entorno |
| nodemon | Reinicio automático en desarrollo |
| Render | Despliegue del backend en producción |

---

## 🚀 Cómo ejecutar el proyecto en local

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/sistema-educativo-api.git
cd sistema-educativo-api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear el archivo de variables de entorno

Crear un archivo `.env` en la raíz del proyecto con este contenido:

```
PORT=3000
API_PASSWORD=academia2026
```

### 4. Iniciar el servidor en modo desarrollo

```bash
npm run dev
```

### 5. Iniciar el servidor en modo producción

```bash
npm start
```

Si todo está bien, verás esto en la terminal:

```
Base de datos SQLite conectada correctamente
Tabla usuarios lista
Tabla profesores lista
Tabla materias lista
Tabla cursos lista
Tabla estudiantes lista
Tabla inscripciones lista
Tabla notas lista
Servidor corriendo en puerto 3000
```

---

## 🔐 Autenticación

Todas las rutas de la API están protegidas por un middleware de autenticación. Se debe enviar el siguiente header en **cada petición**:

```
password: academia2026
```

Si no se envía el header:

```json
{
  "success": false,
  "message": "Acceso denegado — debes enviar el header password"
}
```

Si la contraseña es incorrecta:

```json
{
  "success": false,
  "message": "Contraseña incorrecta"
}
```

---

## 📌 Endpoints disponibles

Todos los módulos siguen el mismo patrón REST. La URL base es `/api`.

---

### 👨‍🎓 Estudiantes — `/api/estudiantes`

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/estudiantes | Retorna todos los estudiantes |
| GET | /api/estudiantes/:id | Busca un estudiante por ID |
| POST | /api/estudiantes | Crea un nuevo estudiante |
| PUT | /api/estudiantes/:id | Actualiza un estudiante |
| DELETE | /api/estudiantes/:id | Elimina un estudiante |

**Ejemplo body POST/PUT:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@correo.com",
  "documento": "1234567890",
  "telefono": "3001234567",
  "fecha_nac": "2000-05-15"
}
```

**Filtros disponibles (query params):**
```
GET /api/estudiantes?nombre=juan
GET /api/estudiantes?email=correo.com
GET /api/estudiantes?documento=123
```

---

### 👨‍🏫 Profesores — `/api/profesores`

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/profesores | Retorna todos los profesores |
| GET | /api/profesores/:id | Busca un profesor por ID |
| POST | /api/profesores | Crea un nuevo profesor |
| PUT | /api/profesores/:id | Actualiza un profesor |
| DELETE | /api/profesores/:id | Elimina un profesor |

**Ejemplo body POST/PUT:**
```json
{
  "nombre": "Carlos Ruiz",
  "email": "carlos@correo.com",
  "especialidad": "Matemáticas",
  "telefono": "3109876543"
}
```

---

### 📚 Cursos — `/api/cursos`

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/cursos | Retorna todos los cursos con nombre del profesor |
| GET | /api/cursos/:id | Busca un curso por ID |
| POST | /api/cursos | Crea un nuevo curso |
| PUT | /api/cursos/:id | Actualiza un curso |
| DELETE | /api/cursos/:id | Elimina un curso |

**Ejemplo body POST/PUT:**
```json
{
  "nombre": "Álgebra I",
  "profesor_id": 1,
  "horario": "Lunes 8:00am",
  "cupo": 30
}
```

> ⚠️ El `profesor_id` debe existir en la tabla de profesores, de lo contrario retorna 404.

---

### 📝 Inscripciones — `/api/inscripciones`

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/inscripciones | Retorna todas las inscripciones con nombres |
| GET | /api/inscripciones/:id | Busca una inscripción por ID |
| POST | /api/inscripciones | Crea una nueva inscripción |
| PUT | /api/inscripciones/:id | Actualiza una inscripción |
| DELETE | /api/inscripciones/:id | Elimina una inscripción |

**Ejemplo body POST/PUT:**
```json
{
  "estudiante_id": 1,
  "curso_id": 2,
  "fecha": "2025-03-01",
  "estado": "activo"
}
```

Valores permitidos para `estado`: `activo`, `inactivo`, `retirado`

---

### 📊 Notas — `/api/notas`

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/notas | Retorna todas las notas con nombres |
| GET | /api/notas/:id | Busca una nota por ID |
| POST | /api/notas | Registra una nueva nota |
| PUT | /api/notas/:id | Actualiza una nota |
| DELETE | /api/notas/:id | Elimina una nota |

**Ejemplo body POST/PUT:**
```json
{
  "estudiante_id": 1,
  "curso_id": 2,
  "nota": 4.5,
  "periodo": "2025-1"
}
```

> ⚠️ La nota debe estar entre `0.0` y `5.0`.

---

### 👤 Usuarios — `/api/usuarios`

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/usuarios | Retorna todos los usuarios |
| GET | /api/usuarios/:id | Busca un usuario por ID |
| POST | /api/usuarios | Crea un nuevo usuario |
| PUT | /api/usuarios/:id | Actualiza un usuario |
| DELETE | /api/usuarios/:id | Elimina un usuario |

**Ejemplo body POST/PUT:**
```json
{
  "nombre": "Admin",
  "email": "admin@correo.com",
  "password": "segura123",
  "rol": "admin"
}
```

Valores permitidos para `rol`: `admin`, `profesor`, `estudiante`

---

## 🗄️ Base de datos

Las tablas se crean automáticamente al iniciar el servidor. El esquema es el siguiente:

```sql
-- Usuarios del sistema
CREATE TABLE IF NOT EXISTS usuarios (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre   TEXT    NOT NULL,
  email    TEXT    NOT NULL UNIQUE,
  password TEXT    NOT NULL,
  rol      TEXT    NOT NULL DEFAULT 'estudiante'
           CHECK(rol IN ('admin', 'estudiante', 'profesor'))
);

-- Profesores
CREATE TABLE IF NOT EXISTS profesores (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre       TEXT    NOT NULL,
  email        TEXT    NOT NULL UNIQUE,
  especialidad TEXT    NOT NULL,
  telefono     TEXT
);

-- Materias
CREATE TABLE IF NOT EXISTS materias (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre      TEXT    NOT NULL UNIQUE,
  descripcion TEXT,
  creditos    INTEGER NOT NULL DEFAULT 3 CHECK(creditos > 0)
);

-- Cursos (relaciona profesor y materia)
CREATE TABLE IF NOT EXISTS cursos (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre      TEXT    NOT NULL,
  profesor_id INTEGER NOT NULL,
  materia_id  INTEGER NOT NULL,
  horario     TEXT,
  cupo        INTEGER NOT NULL DEFAULT 30 CHECK(cupo > 0),
  FOREIGN KEY (profesor_id) REFERENCES profesores(id),
  FOREIGN KEY (materia_id)  REFERENCES materias(id)
);

-- Estudiantes
CREATE TABLE IF NOT EXISTS estudiantes (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre    TEXT    NOT NULL,
  email     TEXT    NOT NULL UNIQUE,
  documento TEXT    NOT NULL UNIQUE,
  telefono  TEXT,
  fecha_nac TEXT
);

-- Inscripciones (estudiante en curso)
CREATE TABLE IF NOT EXISTS inscripciones (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  estudiante_id INTEGER NOT NULL,
  curso_id      INTEGER NOT NULL,
  fecha         TEXT    NOT NULL,
  estado        TEXT    NOT NULL DEFAULT 'activo'
                CHECK(estado IN ('activo', 'inactivo', 'retirado')),
  FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id),
  FOREIGN KEY (curso_id)      REFERENCES cursos(id)
);

-- Notas
CREATE TABLE IF NOT EXISTS notas (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  estudiante_id INTEGER NOT NULL,
  curso_id      INTEGER NOT NULL,
  nota          REAL    NOT NULL CHECK(nota >= 0 AND nota <= 5),
  periodo       TEXT    NOT NULL,
  FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id),
  FOREIGN KEY (curso_id)      REFERENCES cursos(id)
);
```

---

## 📊 Diagrama Entidad–Relación

```
usuarios
    
profesores ──────1──────< cursos >──────1────── materias
                              │
                              │
estudiantes ─────1──────< inscripciones
      │
      └──────1──────< notas >──────1────── cursos
```

**Relaciones:**
- Un **profesor** puede dictar muchos **cursos** (1:N)
- Una **materia** puede tener muchos **cursos** (1:N)
- Un **estudiante** puede tener muchas **inscripciones** (1:N)
- Un **curso** puede tener muchas **inscripciones** (1:N)
- Un **estudiante** puede tener muchas **notas** (1:N)
- Un **curso** puede tener muchas **notas** (1:N)

---

## 🏗️ Arquitectura del proyecto

El proyecto aplica separación en **3 capas** por módulo:

```
Rutas  →  Controladores  →  Modelos  →  Base de datos
```

- **Rutas:** definen las URLs y delegan al controlador correspondiente
- **Controladores:** contienen las validaciones y la lógica de negocio
- **Modelos:** se encargan únicamente de las consultas SQL

Esta arquitectura hace el código más organizado, fácil de mantener y de escalar.

---

## ✅ Validaciones implementadas

- Campos obligatorios en todos los POST y PUT
- Formato de email con expresión regular
- Unicidad de email y documento antes de insertar
- Verificación de existencia de FK antes de crear registros dependientes
- Rango de nota entre 0.0 y 5.0
- Valores permitidos para campos con CHECK (rol, estado, metodoPago)
- Respuesta 404 cuando no existe el registro solicitado
- Respuesta 400 para datos inválidos
- Respuesta 401/403 para autenticación fallida

---

## 🧪 Pruebas con Postman

Para probar los endpoints incluir siempre el header de autenticación:

```
Key:   password
Value: academia2026
```

**Ejemplo — crear un estudiante:**
- Método: `POST`
- URL: `http://localhost:3000/api/estudiantes`
- Header: `password: academia2026`
- Body (JSON):
```json
{
  "nombre": "Luis Montalvo",
  "email": "luis@correo.com",
  "documento": "1234567890",
  "telefono": "3001234567"
}
```

---

## 💭 Reflexión del desarrollador

Durante el desarrollo de este proyecto aprendí a estructurar un backend en capas (rutas, controladores y modelos), a conectar Node.js con SQLite activando las llaves foráneas con `PRAGMA foreign_keys = ON`, y a proteger los endpoints con un middleware de autenticación. También apliqué validaciones robustas en cada endpoint y entendí la importancia de separar la configuración del código usando variables de entorno con dotenv. Fue un proceso de mucho aprendizaje donde cada error me enseñó algo nuevo.

---