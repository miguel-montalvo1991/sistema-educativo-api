// Importamos la conexión a la base de datos
const db = require('../db/db');

// ── GET ALL ────────────────────────────────────────────────────────────
// Obtiene todos los usuarios con soporte de filtros dinámicos
const getAll = (filtros, callback) => {

  let query = 'SELECT * FROM usuarios';
  const valores = [];

  const condiciones = Object.entries(filtros)
    .filter(([_, valor]) => valor !== undefined && valor !== '');

  if (condiciones.length > 0) {
    const clausulas = condiciones.map(([campo, valor]) => {
      valores.push(`%${valor}%`);
      return `${campo} LIKE ?`;
    });
    query += ' WHERE ' + clausulas.join(' AND ');
  }

  db.all(query, valores, (err, filas) => {
    callback(err, filas);
  });
};

// ── GET BY ID ──────────────────────────────────────────────────────────
// Busca un usuario por su ID
const getById = (id, callback) => {
  db.get('SELECT * FROM usuarios WHERE id = ?', [id], (err, fila) => {
    callback(err, fila);
  });
};

// ── CREATE ─────────────────────────────────────────────────────────────
// Crea un nuevo usuario en la base de datos
const create = (datos, callback) => {
  const { nombre, email, password, rol } = datos;

  db.run(
    `INSERT INTO usuarios (nombre, email, password, rol)
     VALUES (?, ?, ?, ?)`,
    [nombre, email, password, rol || 'estudiante'],
    function (err) {
      callback(err, { id: this.lastID });
    }
  );
};

// ── UPDATE ─────────────────────────────────────────────────────────────
// Actualiza un usuario existente por su ID
const update = (id, datos, callback) => {
  const { nombre, email, password, rol } = datos;

  db.run(
    `UPDATE usuarios
     SET nombre = ?, email = ?, password = ?, rol = ?
     WHERE id = ?`,
    [nombre, email, password, rol || 'estudiante', id],
    function (err) {
      callback(err, { changes: this.changes });
    }
  );
};

// ── DELETE ─────────────────────────────────────────────────────────────
// Elimina un usuario por su ID
const remove = (id, callback) => {
  db.run('DELETE FROM usuarios WHERE id = ?', [id], function (err) {
    callback(err, { changes: this.changes });
  });
};

module.exports = { getAll, getById, create, update, remove };