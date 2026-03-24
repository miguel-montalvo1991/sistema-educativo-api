// Importamos la conexión a la base de datos
const db = require('../db/db');

// ── GET ALL ────────────────────────────────────────────────────────────
// Obtiene todas las inscripciones con JOIN a estudiantes y cursos
const getAll = (filtros) => {
  return new Promise((resolve, reject) => {
    let query = `
      SELECT
        inscripciones.id,
        inscripciones.fecha,
        inscripciones.estado,
        inscripciones.estudiante_id,
        inscripciones.curso_id,
        estudiantes.nombre AS estudiante_nombre,
        cursos.nombre      AS curso_nombre
      FROM inscripciones
      JOIN estudiantes ON inscripciones.estudiante_id = estudiantes.id
      JOIN cursos      ON inscripciones.curso_id      = cursos.id
    `;
    const valores = [];

    const condiciones = Object.entries(filtros)
      .filter(([_, valor]) => valor !== undefined && valor !== '');

    if (condiciones.length > 0) {
      const clausulas = condiciones.map(([campo, valor]) => {
        valores.push(`%${valor}%`);
        return `inscripciones.${campo} LIKE ?`;
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
    db.get(`
      SELECT
        inscripciones.id,
        inscripciones.fecha,
        inscripciones.estado,
        inscripciones.estudiante_id,
        inscripciones.curso_id,
        estudiantes.nombre AS estudiante_nombre,
        cursos.nombre      AS curso_nombre
      FROM inscripciones
      JOIN estudiantes ON inscripciones.estudiante_id = estudiantes.id
      JOIN cursos      ON inscripciones.curso_id      = cursos.id
      WHERE inscripciones.id = ?
    `, [id], (err, fila) => {
      if (err) return reject(err);
      resolve(fila);
    });
  });
};

// ── CREATE ─────────────────────────────────────────────────────────────
const create = (datos) => {
  return new Promise((resolve, reject) => {
    const { estudiante_id, curso_id, fecha, estado } = datos;
    db.run(
      `INSERT INTO inscripciones (estudiante_id, curso_id, fecha, estado)
       VALUES (?, ?, ?, ?)`,
      [estudiante_id, curso_id, fecha, estado || 'activo'],
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
    const { estudiante_id, curso_id, fecha, estado } = datos;
    db.run(
      `UPDATE inscripciones
       SET estudiante_id = ?, curso_id = ?, fecha = ?, estado = ?
       WHERE id = ?`,
      [estudiante_id, curso_id, fecha, estado || 'activo', id],
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
    db.run('DELETE FROM inscripciones WHERE id = ?', [id], function (err) {
      if (err) return reject(err);
      resolve({ changes: this.changes });
    });
  });
};

module.exports = { getAll, getById, create, update, remove };