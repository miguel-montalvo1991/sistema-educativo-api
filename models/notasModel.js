// Importamos la conexión a la base de datos
const db = require('../db/db');

// ── GET ALL ────────────────────────────────────────────────────────────
// Obtiene todas las notas con JOIN a estudiantes y cursos
const getAll = (filtros) => {
  return new Promise((resolve, reject) => {
    let query = `
      SELECT
        notas.id,
        notas.nota,
        notas.periodo,
        notas.estudiante_id,
        notas.curso_id,
        estudiantes.nombre AS estudiante_nombre,
        cursos.nombre      AS curso_nombre
      FROM notas
      JOIN estudiantes ON notas.estudiante_id = estudiantes.id
      JOIN cursos      ON notas.curso_id      = cursos.id
    `;
    const valores = [];

    const condiciones = Object.entries(filtros)
      .filter(([_, valor]) => valor !== undefined && valor !== '');

    if (condiciones.length > 0) {
      const clausulas = condiciones.map(([campo, valor]) => {
        valores.push(`%${valor}%`);
        return `notas.${campo} LIKE ?`;
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
        notas.id,
        notas.nota,
        notas.periodo,
        notas.estudiante_id,
        notas.curso_id,
        estudiantes.nombre AS estudiante_nombre,
        cursos.nombre      AS curso_nombre
      FROM notas
      JOIN estudiantes ON notas.estudiante_id = estudiantes.id
      JOIN cursos      ON notas.curso_id      = cursos.id
      WHERE notas.id = ?
    `, [id], (err, fila) => {
      if (err) return reject(err);
      resolve(fila);
    });
  });
};

// ── CREATE ─────────────────────────────────────────────────────────────
const create = (datos) => {
  return new Promise((resolve, reject) => {
    const { estudiante_id, curso_id, nota, periodo } = datos;
    db.run(
      `INSERT INTO notas (estudiante_id, curso_id, nota, periodo)
       VALUES (?, ?, ?, ?)`,
      [estudiante_id, curso_id, nota, periodo],
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
    const { estudiante_id, curso_id, nota, periodo } = datos;
    db.run(
      `UPDATE notas
       SET estudiante_id = ?, curso_id = ?, nota = ?, periodo = ?
       WHERE id = ?`,
      [estudiante_id, curso_id, nota, periodo, id],
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
    db.run('DELETE FROM notas WHERE id = ?', [id], function (err) {
      if (err) return reject(err);
      resolve({ changes: this.changes });
    });
  });
};

module.exports = { getAll, getById, create, update, remove };