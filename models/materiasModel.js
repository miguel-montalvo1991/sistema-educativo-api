// Importamos la conexión a la base de datos
const db = require('../db/db');

// ── GET ALL ────────────────────────────────────────────────────────────
// Obtiene todas las materias con soporte de filtros dinámicos
// ejemplo: ?nombre=algebra o ?creditos=3
const getAll = (filtros, callback) => {

  // Consulta base para traer todas las materias
  let query = 'SELECT * FROM materias';

  // Array donde guardamos los valores de los filtros
  const valores = [];

  // Convertimos el objeto filtros en pares [clave, valor] y filtramos vacíos
  const condiciones = Object.entries(filtros)
    .filter(([_, valor]) => valor !== undefined && valor !== '');

  // Si hay filtros los agregamos a la consulta con WHERE y LIKE
  if (condiciones.length > 0) {
    const clausulas = condiciones.map(([campo, valor]) => {
      valores.push(`%${valor}%`); // el % permite búsqueda parcial
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
// Busca una materia por su ID
const getById = (id, callback) => {
  // db.get trae una sola fila — el ? se reemplaza por el id
  db.get('SELECT * FROM materias WHERE id = ?', [id], (err, fila) => {
    callback(err, fila);
  });
};

// ── CREATE ─────────────────────────────────────────────────────────────
// Crea una nueva materia en la base de datos
const create = (datos, callback) => {
  const { nombre, descripcion, creditos } = datos;

  // INSERT INTO inserta una fila nueva — los ? evitan inyección SQL
  db.run(
    `INSERT INTO materias (nombre, descripcion, creditos)
     VALUES (?, ?, ?)`,
    [nombre, descripcion || null, creditos || 3],
    function (err) {
      // this.lastID contiene el ID del registro recién creado
      callback(err, { id: this.lastID });
    }
  );
};

// ── UPDATE ─────────────────────────────────────────────────────────────
// Actualiza una materia existente por su ID
const update = (id, datos, callback) => {
  const { nombre, descripcion, creditos } = datos;

  db.run(
    `UPDATE materias
     SET nombre = ?, descripcion = ?, creditos = ?
     WHERE id = ?`,
    [nombre, descripcion || null, creditos || 3, id],
    function (err) {
      // this.changes indica cuántas filas fueron modificadas
      callback(err, { changes: this.changes });
    }
  );
};

// ── DELETE ─────────────────────────────────────────────────────────────
// Elimina una materia por su ID
const remove = (id, callback) => {
  db.run('DELETE FROM materias WHERE id = ?', [id], function (err) {
    callback(err, { changes: this.changes });
  });
};

// Exportamos todas las funciones para usarlas en el controlador
module.exports = { getAll, getById, create, update, remove };