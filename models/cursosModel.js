// Importamos la conexión a la base de datos
const db = require('../db/db');

// ── GET ALL ────────────────────────────────────────────────────────────
// Obtiene todos los cursos — hacemos JOIN con profesores y materias
// para traer el nombre del profesor y la materia en vez de solo el ID
const getAll = (filtros, callback) => {

  // Usamos JOIN para combinar la info de las 3 tablas en una sola consulta
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

  // Array donde guardamos los valores de los filtros
  const valores = [];

  // Filtramos los query params que no estén vacíos
  const condiciones = Object.entries(filtros)
    .filter(([_, valor]) => valor !== undefined && valor !== '');

  // Si hay filtros los agregamos con WHERE — usamos cursos.campo para evitar ambigüedad
  if (condiciones.length > 0) {
    const clausulas = condiciones.map(([campo, valor]) => {
      valores.push(`%${valor}%`);
      return `cursos.${campo} LIKE ?`;
    });
    query += ' WHERE ' + clausulas.join(' AND ');
  }

  // Ejecutamos la consulta y devolvemos los resultados
  db.all(query, valores, (err, filas) => {
    callback(err, filas);
  });
};

// ── GET BY ID ──────────────────────────────────────────────────────────
// Busca un curso por su ID incluyendo nombre del profesor y materia
const getById = (id, callback) => {
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
    callback(err, fila);
  });
};

// ── CREATE ─────────────────────────────────────────────────────────────
// Crea un nuevo curso en la base de datos
const create = (datos, callback) => {
  const { nombre, profesor_id, materia_id, horario, cupo } = datos;

  db.run(
    `INSERT INTO cursos (nombre, profesor_id, materia_id, horario, cupo)
     VALUES (?, ?, ?, ?, ?)`,
    [nombre, profesor_id, materia_id, horario || null, cupo || 30],
    function (err) {
      // this.lastID devuelve el ID del curso recién creado
      callback(err, { id: this.lastID });
    }
  );
};

// ── UPDATE ─────────────────────────────────────────────────────────────
// Actualiza un curso existente por su ID
const update = (id, datos, callback) => {
  const { nombre, profesor_id, materia_id, horario, cupo } = datos;

  db.run(
    `UPDATE cursos
     SET nombre = ?, profesor_id = ?, materia_id = ?, horario = ?, cupo = ?
     WHERE id = ?`,
    [nombre, profesor_id, materia_id, horario || null, cupo || 30, id],
    function (err) {
      // this.changes es 0 si no existía ese ID
      callback(err, { changes: this.changes });
    }
  );
};

// ── DELETE ─────────────────────────────────────────────────────────────
// Elimina un curso por su ID
const remove = (id, callback) => {
  db.run('DELETE FROM cursos WHERE id = ?', [id], function (err) {
    callback(err, { changes: this.changes });
  });
};

// Exportamos todas las funciones para usarlas en el controlador
module.exports = { getAll, getById, create, update, remove };