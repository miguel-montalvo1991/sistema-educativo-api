// Importamos la conexión a la base de datos
const db = require('../db/db');

// ── GET ALL ────────────────────────────────────────────────────────────
// Obtiene todas las inscripciones — hacemos JOIN con estudiantes y cursos
// para traer los nombres en vez de solo los IDs
const getAll = (filtros, callback) => {

  // JOIN con estudiantes y cursos para mostrar nombres completos
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

  // Array donde guardamos los valores de los filtros
  const valores = [];

  // Filtramos los query params que no estén vacíos
  const condiciones = Object.entries(filtros)
    .filter(([_, valor]) => valor !== undefined && valor !== '');

  // Si hay filtros los agregamos con WHERE
  if (condiciones.length > 0) {
    const clausulas = condiciones.map(([campo, valor]) => {
      valores.push(`%${valor}%`);
      return `inscripciones.${campo} LIKE ?`;
    });
    query += ' WHERE ' + clausulas.join(' AND ');
  }

  // Ejecutamos la consulta y devolvemos todas las filas
  db.all(query, valores, (err, filas) => {
    callback(err, filas);
  });
};

// ── GET BY ID ──────────────────────────────────────────────────────────
// Busca una inscripción por su ID incluyendo nombres de estudiante y curso
const getById = (id, callback) => {
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
    callback(err, fila);
  });
};

// ── CREATE ─────────────────────────────────────────────────────────────
// Crea una nueva inscripción en la base de datos
const create = (datos, callback) => {
  const { estudiante_id, curso_id, fecha, estado } = datos;

  db.run(
    `INSERT INTO inscripciones (estudiante_id, curso_id, fecha, estado)
     VALUES (?, ?, ?, ?)`,
    [estudiante_id, curso_id, fecha, estado || 'activo'],
    function (err) {
      // this.lastID devuelve el ID de la inscripción recién creada
      callback(err, { id: this.lastID });
    }
  );
};

// ── UPDATE ─────────────────────────────────────────────────────────────
// Actualiza una inscripción existente por su ID
const update = (id, datos, callback) => {
  const { estudiante_id, curso_id, fecha, estado } = datos;

  db.run(
    `UPDATE inscripciones
     SET estudiante_id = ?, curso_id = ?, fecha = ?, estado = ?
     WHERE id = ?`,
    [estudiante_id, curso_id, fecha, estado || 'activo', id],
    function (err) {
      // this.changes es 0 si no existía ese ID
      callback(err, { changes: this.changes });
    }
  );
};

// ── DELETE ─────────────────────────────────────────────────────────────
// Elimina una inscripción por su ID
const remove = (id, callback) => {
  db.run('DELETE FROM inscripciones WHERE id = ?', [id], function (err) {
    callback(err, { changes: this.changes });
  });
};

// Exportamos todas las funciones para usarlas en el controlador
module.exports = { getAll, getById, create, update, remove };