// Importamos la conexión a la base de datos
const db = require('../db/db');

// ── GET ALL ────────────────────────────────────────────────────────────
const getAll = (filtros) => {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM profesores';
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
      if (err) return reject(err);
      resolve(filas);
    });
  });
};

// ── GET BY ID ──────────────────────────────────────────────────────────
const getById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM profesores WHERE id = ?', [id], (err, fila) => {
      if (err) return reject(err);
      resolve(fila);
    });
  });
};

// ── CREATE ─────────────────────────────────────────────────────────────
const create = (datos) => {
  return new Promise((resolve, reject) => {
    const { nombre, email, especialidad, telefono } = datos;
    db.run(
      `INSERT INTO profesores (nombre, email, especialidad, telefono)
       VALUES (?, ?, ?, ?)`,
      [nombre, email, especialidad, telefono || null],
      function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID });
      }
    );
  });
};

// ── UPDATE ─────────────────────────────────────────────────────────────
const update = (id, datos) => {
  return new Promise((resolve, reject) => {
    const { nombre, email, especialidad, telefono } = datos;
    db.run(
      `UPDATE profesores
       SET nombre = ?, email = ?, especialidad = ?, telefono = ?
       WHERE id = ?`,
      [nombre, email, especialidad, telefono || null, id],
      function (err) {
        if (err) return reject(err);
        resolve({ changes: this.changes });
      }
    );
  });
};

// ── DELETE ─────────────────────────────────────────────────────────────
const remove = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM profesores WHERE id = ?', [id], function (err) {
      if (err) return reject(err);
      resolve({ changes: this.changes });
    });
  });
};

module.exports = { getAll, getById, create, update, remove };