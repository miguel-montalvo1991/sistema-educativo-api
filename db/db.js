// Importamos el módulo sqlite3 para poder trabajar con la base de datos
// El .verbose() nos muestra mensajes más detallados cuando hay errores
const sqlite3 = require('sqlite3').verbose();

// Importamos path para construir rutas de archivos de forma segura
// sin importar en qué sistema operativo estemos
const path = require('path');

// Creamos la conexión a la base de datos
// Si el archivo database.db no existe, SQLite lo crea automáticamente
// __dirname apunta a la carpeta donde está este archivo (db/)
// con '../' subimos un nivel para que el archivo quede en la raíz del proyecto
const db = new sqlite3.Database(path.join(__dirname, '../database.db'), (err) => {
    if (err) {
    // Si hubo un error al conectar, lo mostramos en consola
    console.error('Error al conectar la base de datos:', err.message);
        } else {
    // Si todo salió bien, confirmamos la conexión
    console.log('Base de datos SQLite conectada correctamente');
    }
});

// Activamos las llaves foráneas (FOREIGN KEY)
// SQLite las trae desactivadas por defecto, hay que activarlas manualmente
// sin esto, las relaciones entre tablas no se respetan
db.run('PRAGMA foreign_keys = ON');

// db.serialize() garantiza que los CREATE TABLE se ejecuten uno por uno
// en orden, no al mismo tiempo — esto evita errores de sincronización
db.serialize(() => {

  // ── TABLA 1: usuarios ──────────────────────────────────────────────
  // Guarda los usuarios del sistema con su rol de acceso
db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,  -- ID único que se genera solo
        nombre    TEXT    NOT NULL,                   -- Nombre obligatorio
        email     TEXT    NOT NULL UNIQUE,            -- Email único, no se puede repetir
        password  TEXT    NOT NULL,                   -- Contraseña obligatoria
        rol       TEXT    NOT NULL DEFAULT 'estudiante' 
                CHECK(rol IN ('admin', 'estudiante', 'profesor')) -- Solo estos 3 valores son válidos
    )
    `, () => console.log('Tabla usuarios lista'));

  // ── TABLA 2: profesores ────────────────────────────────────────────
  // Guarda la información de los profesores del sistema
    db.run(`
    CREATE TABLE IF NOT EXISTS profesores (
        id           INTEGER PRIMARY KEY AUTOINCREMENT, -- ID único
        nombre       TEXT    NOT NULL,                  -- Nombre obligatorio
        email        TEXT    NOT NULL UNIQUE,           -- Email único por profesor
        especialidad TEXT    NOT NULL,                  -- Materia que domina, obligatorio
        telefono     TEXT                               -- Teléfono opcional
    )
    `, () => console.log('Tabla profesores lista'));



  // ── TABLA 3: cursos ────────────────────────────────────────────────
  // Un curso es una materia dictada por un profesor en un horario específico
  // Se relaciona con profesores y materias mediante llaves foráneas
    db.run(`
    CREATE TABLE IF NOT EXISTS cursos (
        id          INTEGER PRIMARY KEY AUTOINCREMENT, -- ID único
        nombre      TEXT    NOT NULL,                  -- Nombre del curso obligatorio
        profesor_id INTEGER NOT NULL,                  -- FK — qué profesor dicta este curso
        materia_id  INTEGER NOT NULL,                  -- FK — qué materia es este curso
        horario     TEXT,                              -- Horario opcional (ej: "Lunes 8am")
        cupo        INTEGER NOT NULL DEFAULT 30 
                    CHECK(cupo > 0),                   -- El cupo debe ser mayor a 0
        FOREIGN KEY (profesor_id) REFERENCES profesores(id), -- profesor_id debe existir en profesores
        FOREIGN KEY (materia_id)  REFERENCES materias(id)    -- materia_id debe existir en materias
    )
    `, () => console.log('Tabla cursos lista'));

  // ── TABLA 4: estudiantes ───────────────────────────────────────────
  // Guarda la información personal de cada estudiante
    db.run(`
    CREATE TABLE IF NOT EXISTS estudiantes (
        id         INTEGER PRIMARY KEY AUTOINCREMENT, -- ID único
        nombre     TEXT    NOT NULL,                  -- Nombre obligatorio
        email      TEXT    NOT NULL UNIQUE,           -- Email único por estudiante
        documento  TEXT    NOT NULL UNIQUE,           -- Documento de identidad único
        telefono   TEXT,                              -- Teléfono opcional
        fecha_nac  TEXT                               -- Fecha de nacimiento opcional
    )
    `, () => console.log('Tabla estudiantes lista'));

  // ── TABLA 5: inscripciones ─────────────────────────────────────────
  // Relaciona un estudiante con un curso — aquí se registra quién está en qué curso
  // Depende de las tablas estudiantes y cursos mediante llaves foráneas
    db.run(`
    CREATE TABLE IF NOT EXISTS inscripciones (
        id            INTEGER PRIMARY KEY AUTOINCREMENT, -- ID único
        estudiante_id INTEGER NOT NULL,                  -- FK — qué estudiante se inscribió
        curso_id      INTEGER NOT NULL,                  -- FK — en qué curso se inscribió
        fecha         TEXT    NOT NULL,                  -- Fecha de inscripción obligatoria
        estado        TEXT    NOT NULL DEFAULT 'activo' 
                    CHECK(estado IN ('activo', 'inactivo', 'retirado')), -- Solo estos estados
        FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id), -- debe existir en estudiantes
        FOREIGN KEY (curso_id)      REFERENCES cursos(id)       -- debe existir en cursos
    )
    `, () => console.log('Tabla inscripciones lista'));

  // ── TABLA 7: notas ─────────────────────────────────────────────────
  // Guarda las notas de un estudiante en un curso específico
  // Depende de las tablas estudiantes y cursos
    db.run(`
    CREATE TABLE IF NOT EXISTS notas (
        id            INTEGER PRIMARY KEY AUTOINCREMENT, -- ID único
        estudiante_id INTEGER NOT NULL,                  -- FK — a qué estudiante pertenece la nota
        curso_id      INTEGER NOT NULL,                  -- FK — de qué curso es la nota
        nota          REAL    NOT NULL 
                    CHECK(nota >= 0 AND nota <= 5),    -- La nota debe estar entre 0.0 y 5.0
        periodo       TEXT    NOT NULL,                  -- Período académico (ej: "2025-1")
        FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id), -- debe existir en estudiantes
        FOREIGN KEY (curso_id)      REFERENCES cursos(id)       -- debe existir en cursos
    )
    `, () => console.log('Tabla notas lista'));

});

// Exportamos la conexión para poder usarla en los demás archivos del proyecto
module.exports = db;