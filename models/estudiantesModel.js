// Importamos la conexión a la base de datos
const db = require('../db/db');

// ── GET ALL ────────────────────────────────────────────────────────────
// Obtiene todos los estudiantes de la base de datos
// Si se envían query params, filtra por esos campos dinámicamente
const getAll = (filtros, callback) => {

  // Empezamos con la consulta base
  let query = 'SELECT * FROM estudiantes';
  
  // Array donde guardamos los valores de los filtros
  const valores = [];

  // Object.entries convierte el objeto de filtros en pares [clave, valor]
  // filtramos los que no estén vacíos
  const condiciones = Object.entries(filtros)
    .filter(([_, valor]) => valor !== undefined && valor !== '');

  // Si hay filtros, los agregamos a la consulta con WHERE
  if (condiciones.length > 0) {
    const clausulas = condiciones.map(([campo, valor]) => {
      valores.push(`%${valor}%`); // el % permite búsqueda parcial con LIKE
      return `${campo} LIKE ?`;
    });
    query += ' WHERE ' + clausulas.join(' AND ');
  }

  // Ejecutamos la consulta — db.all trae múltiples filas
  db.all(query, valores, (err, filas) => {
    callback(err, filas);
  });
};

// ── GET BY ID ──────────────────────────────────────────────────────────
// Busca un estudiante por su ID
const getById = (id, callback) => {
  // db.get trae una sola fila — el ? se reemplaza por el id
  db.get('SELECT * FROM estudiantes WHERE id = ?', [id], (err, fila) => {
    callback(err, fila);
  });
};

// ── CREATE ─────────────────────────────────────────────────────────────
// Crea un nuevo estudiante en la base de datos
const create = (datos, callback) => {
  const { nombre, email, documento, telefono, fecha_nac } = datos;

  // INSERT INTO inserta una fila nueva — los ? evitan inyección SQL
  db.run(
    `INSERT INTO estudiantes (nombre, email, documento, telefono, fecha_nac)
     VALUES (?, ?, ?, ?, ?)`,
    [nombre, email, documento, telefono || null, fecha_nac || null],
    function (err) {
      // this.lastID contiene el ID del registro recién creado
      callback(err, { id: this.lastID });
    }
  );
};

// ── UPDATE ─────────────────────────────────────────────────────────────
// Actualiza un estudiante existente por su ID
const update = (id, datos, callback) => {
  const { nombre, email, documento, telefono, fecha_nac } = datos;

  db.run(
    `UPDATE estudiantes
     SET nombre = ?, email = ?, documento = ?, telefono = ?, fecha_nac = ?
     WHERE id = ?`,
    [nombre, email, documento, telefono || null, fecha_nac || null, id],
    function (err) {
      // this.changes indica cuántas filas fueron modificadas
      // si es 0 significa que no existía ese ID
      callback(err, { changes: this.changes });
    }
  );
};

// ── DELETE ─────────────────────────────────────────────────────────────
// Elimina un estudiante por su ID
const remove = (id, callback) => {
  db.run('DELETE FROM estudiantes WHERE id = ?', [id], function (err) {
    callback(err, { changes: this.changes });
  });
};

// Exportamos todas las funciones para usarlas en el controlador
module.exports = { getAll, getById, create, update, remove };