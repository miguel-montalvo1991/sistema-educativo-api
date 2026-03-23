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
    console.error('Error al conectar la base de datos:', err.message);
  } else {
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

  // ── TABLA 1: usuarios ──────────────────────────────────────────────────
  // Guarda los usuarios del sistema con su rol de acceso
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id       INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre   TEXT    NOT NULL,
      email    TEXT    NOT NULL UNIQUE,
      password TEXT    NOT NULL,
      rol      TEXT    NOT NULL DEFAULT 'estudiante'
               CHECK(rol IN ('admin', 'estudiante', 'profesor'))
    )
  `, () => console.log('Tabla usuarios lista'));

  // ── TABLA 2: profesores ────────────────────────────────────────────────
  // Guarda la información de los profesores del sistema
  db.run(`
    CREATE TABLE IF NOT EXISTS profesores (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre       TEXT    NOT NULL,
      email        TEXT    NOT NULL UNIQUE,
      especialidad TEXT    NOT NULL,
      telefono     TEXT
    )
  `, () => console.log('Tabla profesores lista'));

  // ── TABLA 3: materias ──────────────────────────────────────────────────
  // Guarda las materias disponibles en el sistema
  // Esta tabla debe crearse ANTES que cursos porque cursos depende de ella
  db.run(`
    CREATE TABLE IF NOT EXISTS materias (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre      TEXT    NOT NULL UNIQUE,
      descripcion TEXT,
      creditos    INTEGER NOT NULL DEFAULT 3 CHECK(creditos > 0)
    )
  `, () => console.log('Tabla materias lista'));

  // ── TABLA 4: cursos ────────────────────────────────────────────────────
  // Un curso es una materia dictada por un profesor en un horario específico
  // Depende de profesores y materias mediante llaves foráneas
  db.run(`
    CREATE TABLE IF NOT EXISTS cursos (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre      TEXT    NOT NULL,
      profesor_id INTEGER NOT NULL,
      materia_id  INTEGER NOT NULL,
      horario     TEXT,
      cupo        INTEGER NOT NULL DEFAULT 30 CHECK(cupo > 0),
      FOREIGN KEY (profesor_id) REFERENCES profesores(id),
      FOREIGN KEY (materia_id)  REFERENCES materias(id)
    )
  `, () => console.log('Tabla cursos lista'));

  // ── TABLA 5: estudiantes ───────────────────────────────────────────────
  // Guarda la información personal de cada estudiante
  db.run(`
    CREATE TABLE IF NOT EXISTS estudiantes (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre    TEXT    NOT NULL,
      email     TEXT    NOT NULL UNIQUE,
      documento TEXT    NOT NULL UNIQUE,
      telefono  TEXT,
      fecha_nac TEXT
    )
  `, () => console.log('Tabla estudiantes lista'));

  // ── TABLA 6: inscripciones ─────────────────────────────────────────────
  // Relaciona un estudiante con un curso
  // Depende de las tablas estudiantes y cursos
  db.run(`
    CREATE TABLE IF NOT EXISTS inscripciones (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      estudiante_id INTEGER NOT NULL,
      curso_id      INTEGER NOT NULL,
      fecha         TEXT    NOT NULL,
      estado        TEXT    NOT NULL DEFAULT 'activo'
                    CHECK(estado IN ('activo', 'inactivo', 'retirado')),
      FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id),
      FOREIGN KEY (curso_id)      REFERENCES cursos(id)
    )
  `, () => console.log('Tabla inscripciones lista'));

  // ── TABLA 7: notas ─────────────────────────────────────────────────────
  // Guarda las notas de un estudiante en un curso específico
  db.run(`
    CREATE TABLE IF NOT EXISTS notas (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      estudiante_id INTEGER NOT NULL,
      curso_id      INTEGER NOT NULL,
      nota          REAL    NOT NULL CHECK(nota >= 0 AND nota <= 5),
      periodo       TEXT    NOT NULL,
      FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id),
      FOREIGN KEY (curso_id)      REFERENCES cursos(id)
    )
  `, () => console.log('Tabla notas lista'));

});

// Exportamos la conexión para poder usarla en los demás archivos del proyecto
module.exports = db;