// Importamos la conexión a la base de datos
const db = require('../db/db');

// ── GET ALL ────────────────────────────────────────────────────────────
// Obtiene todas las notas — hacemos JOIN con estudiantes y cursos
// para mostrar los nombres en vez de solo los IDs
const getAll = (filtros, callback) => {

  // JOIN con estudiantes y cursos para mostrar información completa
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

  // Array donde guardamos los valores de los filtros
  const valores = [];

  // Filtramos los query params que no estén vacíos
  const condiciones = Object.entries(filtros)
    .filter(([_, valor]) => valor !== undefined && valor !== '');

  // Si hay filtros los agregamos con WHERE
  if (condiciones.length > 0) {
    const clausulas = condiciones.map(([campo, valor]) => {
      valores.push(`%${valor}%`);
      return `notas.${campo} LIKE ?`;
    });
    query += ' WHERE ' + clausulas.join(' AND ');
  }

  // Ejecutamos la consulta y devolvemos todas las filas
  db.all(query, valores, (err, filas) => {
    callback(err, filas);
  });
};

// ── GET BY ID ──────────────────────────────────────────────────────────
// Busca una nota por su ID incluyendo nombres de estudiante y curso
const getById = (id, callback) => {
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
    callback(err, fila);
  });
};

// ── CREATE ─────────────────────────────────────────────────────────────
// Crea una nueva nota en la base de datos
const create = (datos, callback) => {
  const { estudiante_id, curso_id, nota, periodo } = datos;

  db.run(
    `INSERT INTO notas (estudiante_id, curso_id, nota, periodo)
     VALUES (?, ?, ?, ?)`,
    [estudiante_id, curso_id, nota, periodo],
    function (err) {
      // this.lastID devuelve el ID de la nota recién creada
      callback(err, { id: this.lastID });
    }
  );
};

// ── UPDATE ─────────────────────────────────────────────────────────────
// Actualiza una nota existente por su ID
const update = (id, datos, callback) => {
  const { estudiante_id, curso_id, nota, periodo } = datos;

  db.run(
    `UPDATE notas
     SET estudiante_id = ?, curso_id = ?, nota = ?, periodo = ?
     WHERE id = ?`,
    [estudiante_id, curso_id, nota, periodo, id],
    function (err) {
      // this.changes es 0 si no existía ese ID
      callback(err, { changes: this.changes });
    }
  );
};

// ── DELETE ─────────────────────────────────────────────────────────────
// Elimina una nota por su ID
const remove = (id, callback) => {
  db.run('DELETE FROM notas WHERE id = ?', [id], function (err) {
    callback(err, { changes: this.changes });
  });
};

// Exportamos todas las funciones para usarlas en el controlador
module.exports = { getAll, getById, create, update, remove };