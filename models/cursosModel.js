// Importamos la conexión a la base de datos
const db = require('../db/db');

// ── GET ALL ────────────────────────────────────────────────────────────
// Obtiene todos los cursos con JOIN a profesores y materias
const getAll = (filtros) => {
  return new Promise((resolve, reject) => {
    let query = `
      SELECT
        cursos.id,
        cursos.nombre,
        cursos.horario,
        cursos.cupo,
        cursos.profesor_id,
        cursos.materia_id,
        profesores.nombre AS profesor_nombre,
        materias.nombre   AS materia_nombre
      FROM cursos
      JOIN profesores ON cursos.profesor_id = profesores.id
      JOIN materias   ON cursos.materia_id  = materias.id
    `;
    const valores = [];

    const condiciones = Object.entries(filtros)
      .filter(([_, valor]) => valor !== undefined && valor !== '');

    if (condiciones.length > 0) {
      const clausulas = condiciones.map(([campo, valor]) => {
        valores.push(`%${valor}%`);
        return `cursos.${campo} LIKE ?`;
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
        cursos.id,
        cursos.nombre,
        cursos.horario,
        cursos.cupo,
        cursos.profesor_id,
        cursos.materia_id,
        profesores.nombre AS profesor_nombre,
        materias.nombre   AS materia_nombre
      FROM cursos
      JOIN profesores ON cursos.profesor_id = profesores.id
      JOIN materias   ON cursos.materia_id  = materias.id
      WHERE cursos.id = ?
    `, [id], (err, fila) => {
      if (err) return reject(err);
      resolve(fila);
    });
  });
};

// ── CREATE ─────────────────────────────────────────────────────────────
const create = (datos) => {
  return new Promise((resolve, reject) => {
    const { nombre, profesor_id, materia_id, horario, cupo } = datos;
    db.run(
      `INSERT INTO cursos (nombre, profesor_id, materia_id, horario, cupo)
       VALUES (?, ?, ?, ?, ?)`,
      [nombre, profesor_id, materia_id, horario || null, cupo || 30],
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
    const { nombre, profesor_id, materia_id, horario, cupo } = datos;
    db.run(
      `UPDATE cursos
       SET nombre = ?, profesor_id = ?, materia_id = ?, horario = ?, cupo = ?
       WHERE id = ?`,
      [nombre, profesor_id, materia_id, horario || null, cupo || 30, id],
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
    db.run('DELETE FROM cursos WHERE id = ?', [id], function (err) {
      if (err) return reject(err);
      resolve({ changes: this.changes });
    });
  });
};

module.exports = { getAll, getById, create, update, remove };