# 🎓 Sistema Educativo — API REST

Sistema de gestión académica desarrollado con Node.js, Express y SQLite. Permite administrar estudiantes, profesores, materias, cursos, inscripciones, notas y usuarios mediante una API REST completa con autenticación por middleware.

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
| Repositorio | https://github.com/miguel-montalvo1991/sistema-educativo-api |

> ⚠️ El backend estará en el plan gratuito de Render. La primera petición puede tardar hasta 60 segundos mientras el servidor despierta (cold start).

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
│   ├── materiasModel.js
│   ├── cursosModel.js
│   ├── inscripcionesModel.js
│   ├── notasModel.js
│   └── usuariosModel.js
│
├── controllers/                      # Lógica de negocio y validaciones
│   ├── estudiantesController.js
│   ├── profesoresController.js
│   ├── materiasController.js
│   ├── cursosController.js
│   ├── inscripcionesController.js
│   ├── notasController.js
│   └── usuariosController.js
│
└── routes/                           # Definición de rutas por recurso
    ├── estudiantesRutas.js
    ├── profesoresRutas.js
    ├── materiasRutas.js
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
| Express v5 | Framework para la API REST |
| SQLite3 | Base de datos local en archivo .db |
| CORS | Comunicación entre frontend y backend |
| dotenv | Manejo de variables de entorno |
| nodemon | Reinicio automático en desarrollo |
| Render | Despliegue del backend en producción |

---

## 🚀 Cómo ejecutar el proyecto en local

### 1. Clonar el repositorio

```bash
git clone https://github.com/miguel-montalvo1991/sistema-educativo-api.git
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

**Body POST/PUT:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@correo.com",
  "documento": "1234567890",
  "telefono": "3001234567",
  "fecha_nac": "2000-05-15"
}
```

**Filtros disponibles:**
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

**Body POST/PUT:**
```json
{
  "nombre": "Carlos Ruiz",
  "email": "carlos@correo.com",
  "especialidad": "Matemáticas",
  "telefono": "3109876543"
}
```

---

### 📖 Materias — `/api/materias`

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/materias | Retorna todas las materias |
| GET | /api/materias/:id | Busca una materia por ID |
| POST | /api/materias | Crea una nueva materia |
| PUT | /api/materias/:id | Actualiza una materia |
| DELETE | /api/materias/:id | Elimina una materia |

**Body POST/PUT:**
```json
{
  "nombre": "Álgebra",
  "descripcion": "Fundamentos de álgebra lineal",
  "creditos": 3
}
```

> ⚠️ El nombre de la materia debe ser único. Los créditos deben ser mayores a 0, por defecto son 3.

---

### 📚 Cursos — `/api/cursos`

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/cursos | Retorna todos los cursos con nombre del profesor y materia |
| GET | /api/cursos/:id | Busca un curso por ID |
| POST | /api/cursos | Crea un nuevo curso |
| PUT | /api/cursos/:id | Actualiza un curso |
| DELETE | /api/cursos/:id | Elimina un curso |

**Body POST/PUT:**
```json
{
  "nombre": "Álgebra I",
  "profesor_id": 1,
  "materia_id": 1,
  "horario": "Lunes 8:00am",
  "cupo": 30
}
```

> ⚠️ El `profesor_id` y el `materia_id` deben existir previamente, de lo contrario retorna 404.

---

### 📝 Inscripciones — `/api/inscripciones`

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/inscripciones | Retorna todas las inscripciones con nombres |
| GET | /api/inscripciones/:id | Busca una inscripción por ID |
| POST | /api/inscripciones | Crea una nueva inscripción |
| PUT | /api/inscripciones/:id | Actualiza una inscripción |
| DELETE | /api/inscripciones/:id | Elimina una inscripción |

**Body POST/PUT:**
```json
{
  "estudiante_id": 1,
  "curso_id": 1,
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

**Body POST/PUT:**
```json
{
  "estudiante_id": 1,
  "curso_id": 1,
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

**Body POST/PUT:**
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

## 🧪 Pruebas con Postman

Incluir siempre el header de autenticación en cada petición:

```
Key:   password
Value: academia2026
```

El orden correcto para crear datos desde cero es el siguiente, ya que hay dependencias entre tablas:

**Paso 1 — Crear una materia:**
- Método: `POST`
- URL: `http://localhost:3000/api/materias`
- Header: `password: academia2026`
- Body:
```json
{
  "nombre": "Álgebra",
  "descripcion": "Fundamentos de álgebra",
  "creditos": 3
}
```

**Paso 2 — Crear un profesor:**
- Método: `POST`
- URL: `http://localhost:3000/api/profesores`
- Header: `password: academia2026`
- Body:
```json
{
  "nombre": "Carlos Ruiz",
  "email": "carlos@correo.com",
  "especialidad": "Matemáticas",
  "telefono": "3109876543"
}
```

**Paso 3 — Crear un curso:**
- Método: `POST`
- URL: `http://localhost:3000/api/cursos`
- Header: `password: academia2026`
- Body:
```json
{
  "nombre": "Álgebra I",
  "profesor_id": 1,
  "materia_id": 1,
  "horario": "Lunes 8:00am",
  "cupo": 30
}
```

**Paso 4 — Crear un estudiante:**
- Método: `POST`
- URL: `http://localhost:3000/api/estudiantes`
- Header: `password: academia2026`
- Body:
```json
{
  "nombre": "Luis Montalvo",
  "email": "luis@correo.com",
  "documento": "1234567890",
  "telefono": "3001234567"
}
```

**Paso 5 — Crear una inscripción:**
- Método: `POST`
- URL: `http://localhost:3000/api/inscripciones`
- Header: `password: academia2026`
- Body:
```json
{
  "estudiante_id": 1,
  "curso_id": 1,
  "fecha": "2025-03-01",
  "estado": "activo"
}
```

**Paso 6 — Registrar una nota:**
- Método: `POST`
- URL: `http://localhost:3000/api/notas`
- Header: `password: academia2026`
- Body:
```json
{
  "estudiante_id": 1,
  "curso_id": 1,
  "nota": 4.5,
  "periodo": "2025-1"
}
```

---

## 🗄️ Base de datos

Las tablas se crean automáticamente al iniciar el servidor en este orden:

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

-- Materias (debe crearse antes que cursos)
CREATE TABLE IF NOT EXISTS materias (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre      TEXT    NOT NULL UNIQUE,
  descripcion TEXT,
  creditos    INTEGER NOT NULL DEFAULT 3 CHECK(creditos > 0)
);

-- Cursos (depende de profesores y materias)
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

-- Inscripciones (depende de estudiantes y cursos)
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

-- Notas (depende de estudiantes y cursos)
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
usuarios (tabla independiente — gestión de acceso)

profesores ──1────< cursos >────1── materias
                      │
              1       │       1
              │       │       │
          inscripciones    notas
              │               │
              1               1
              │               │
          estudiantes ────────┘
```

**Relaciones:**
- Un **profesor** puede dictar muchos **cursos** (1:N)
- Una **materia** puede tener muchos **cursos** (1:N)
- Un **estudiante** puede tener muchas **inscripciones** (1:N)
- Un **curso** puede tener muchas **inscripciones** (1:N)
- Un **estudiante** puede tener muchas **notas** (1:N)
- Un **curso** puede tener muchas **notas** (1:N)

---

## ☁️ Despliegue en Render

### 1. Crear cuenta en Render
Ir a [https://render.com](https://render.com) y registrarse con la cuenta de GitHub.

### 2. Crear un nuevo Web Service
- Clic en **New** → **Web Service**
- Conectar el repositorio `sistema-educativo-api`
- Configurar así:

| Campo | Valor |
|---|---|
| Name | sistema-educativo-api |
| Runtime | Node |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Instance Type | Free |

### 3. Agregar variables de entorno
En la sección **Environment**, agregar:

| Key | Value |
|---|---|
| PORT | 3000 |
| API_PASSWORD | academia2026 |

### 4. Desplegar
Clic en **Create Web Service**. Render descarga el repositorio, instala dependencias y arranca el servidor. La URL quedará así:

```
https://sistema-educativo-api.onrender.com
```

> ⚠️ En el plan gratuito el servidor se apaga si no recibe peticiones por 15 minutos. La primera petición después de ese tiempo puede tardar hasta 60 segundos.

---

## 🏗️ Arquitectura del proyecto

El proyecto aplica separación en **3 capas** por módulo:

```
Rutas  →  Controladores  →  Modelos  →  Base de datos
```

- **Rutas:** definen las URLs y delegan al controlador correspondiente
- **Controladores:** contienen las validaciones y la lógica de negocio
- **Modelos:** se encargan únicamente de las consultas SQL

---

## ✅ Validaciones implementadas

- Campos obligatorios en todos los POST y PUT
- Formato de email con expresión regular
- Unicidad de email y documento antes de insertar
- Verificación de existencia de FK antes de crear registros dependientes
- Rango de nota entre 0.0 y 5.0
- Créditos de materia deben ser mayores a 0
- Valores permitidos para campos con CHECK (rol, estado)
- Respuesta 404 cuando no existe el registro solicitado
- Respuesta 400 para datos inválidos
- Respuesta 401/403 para autenticación fallida

---

## 💭 Reflexión del desarrollador

Durante el desarrollo de este proyecto aprendí a estructurar un backend en capas separando rutas, controladores y modelos, lo cual hace el código mucho más organizado y fácil de mantener. Conectar Node.js con SQLite y activar las llaves foráneas con `PRAGMA foreign_keys = ON` fue algo nuevo para mí porque SQLite las trae desactivadas por defecto y sin eso las relaciones entre tablas no se respetan.

También entendí la importancia del orden en que se crean las tablas — si una tabla depende de otra mediante una llave foránea, la tabla padre debe existir primero. Eso lo aprendí cuando el módulo de materias faltaba y el servidor fallaba al intentar crear cursos.

Proteger los endpoints con un middleware de autenticación y manejar las variables de entorno con dotenv me enseñó buenas prácticas que se usan en proyectos reales. Cada error que encontré en el camino me obligó a entender mejor cómo funciona todo por dentro.

---