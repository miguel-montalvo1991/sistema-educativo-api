// Importamos la conexión a la base de datos
const db = require('../db/db');

// ── GET ALL ────────────────────────────────────────────────────────────
// Obtiene todos los profesores, con soporte de filtros dinámicos
const getAll = (filtros, callback) => {

  // Consulta base para traer todos los profesores
  let query = 'SELECT * FROM profesores';

  // Array donde guardamos los valores de los filtros
  const valores = [];

  // Convertimos el objeto filtros en pares [clave, valor] y filtramos vacíos
  const condiciones = Object.entries(filtros)
    .filter(([_, valor]) => valor !== undefined && valor !== '');

  // Si hay filtros los agregamos a la consulta con WHERE y LIKE
  if (condiciones.length > 0) {
    const clausulas = condiciones.map(([campo, valor]) => {
      valores.push(`%${valor}%`); // % permite búsqueda parcial
      return `${campo} LIKE ?`;
    });
    query += ' WHERE ' + clausulas.join(' AND ');
  }

  // Ejecutamos la consulta y devolvemos todas las filas encontradas
  db.all(query, valores, (err, filas) => {
    callback(err, filas);
  });
};

// ── GET BY ID ──────────────────────────────────────────────────────────
// Busca un profesor por su ID
const getById = (id, callback) => {
  db.get('SELECT * FROM profesores WHERE id = ?', [id], (err, fila) => {
    callback(err, fila);
  });
};

// ── CREATE ─────────────────────────────────────────────────────────────
// Crea un nuevo profesor en la base de datos
const create = (datos, callback) => {
  const { nombre, email, especialidad, telefono } = datos;

  db.run(
    `INSERT INTO profesores (nombre, email, especialidad, telefono)
     VALUES (?, ?, ?, ?)`,
    [nombre, email, especialidad, telefono || null],
    function (err) {
      // this.lastID devuelve el ID del registro recién insertado
      callback(err, { id: this.lastID });
    }
  );
};

// ── UPDATE ─────────────────────────────────────────────────────────────
// Actualiza los datos de un profesor existente por su ID
const update = (id, datos, callback) => {
  const { nombre, email, especialidad, telefono } = datos;

  db.run(
    `UPDATE profesores
     SET nombre = ?, email = ?, especialidad = ?, telefono = ?
     WHERE id = ?`,
    [nombre, email, especialidad, telefono || null, id],
    function (err) {
      // this.changes indica cuántas filas fueron modificadas
      callback(err, { changes: this.changes });
    }
  );
};

// ── DELETE ─────────────────────────────────────────────────────────────
// Elimina un profesor por su ID
const remove = (id, callback) => {
    db.run('DELETE FROM profesores WHERE id = ?', [id], function (err) {
        callback(err, { changes: this.changes });
    });
};

// Exportamos todas las funciones para usarlas en el controlador
module.exports = { getAll, getById, create, update, remove };