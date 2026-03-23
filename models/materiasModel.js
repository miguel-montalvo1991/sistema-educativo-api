// Importamos la conexión a la base de datos (SQLite)
const db = require('../db/db');


// ─────────────────────────────────────────────────────────────
// 🔍 GET ALL → Obtener todas las materias con filtros dinámicos
// ─────────────────────────────────────────────────────────────
const obtenerMaterias = (filtros) => {
  return new Promise((resolve, reject) => {

    // Consulta base
    let query = 'SELECT * FROM materias';

    // Valores que reemplazan los "?" en SQL (evita inyección)
    const valores = [];

    // ⚠️ Lista blanca de campos permitidos para filtrar
    const camposPermitidos = ['nombre', 'creditos'];

    // Filtramos solo campos válidos y con valor
    const condiciones = Object.entries(filtros)
      .filter(([campo, valor]) =>
        camposPermitidos.includes(campo) &&
        valor !== undefined &&
        valor !== ''
      );

    // Si hay filtros, construimos el WHERE dinámicamente
    if (condiciones.length > 0) {
      const clausulas = condiciones.map(([campo, valor]) => {

        // Usamos LIKE para permitir búsquedas parciales
        valores.push(`%${valor}%`);

        return `${campo} LIKE ?`;
      });

      query += ' WHERE ' + clausulas.join(' AND ');
    }

    // Ejecutamos la consulta
    db.all(query, valores, (err, filas) => {
      if (err) {
        reject(err); // Error en la consulta
      } else {
        resolve(filas); // Retorna todas las filas encontradas
      }
    });

  });
};


// ─────────────────────────────────────────────────────────────
// 🔍 GET BY ID → Obtener una materia por su ID
// ─────────────────────────────────────────────────────────────
const obtenerMateriaPorId = (id) => {
  return new Promise((resolve, reject) => {

    db.get(
      'SELECT * FROM materias WHERE id = ?',
      [id],
      (err, fila) => {
        if (err) {
          reject(err);
        } else {
          resolve(fila); // Puede ser undefined si no existe
        }
      }
    );

  });
};


// ─────────────────────────────────────────────────────────────
// ➕ CREATE → Crear una nueva materia
// ─────────────────────────────────────────────────────────────
const crearMateria = (datos) => {
  return new Promise((resolve, reject) => {

    const { nombre, descripcion, creditos } = datos;

    db.run(
      `INSERT INTO materias (nombre, descripcion, creditos)
       VALUES (?, ?, ?)`,
      [
        nombre,
        descripcion || null, // Si no viene, se guarda como null
        creditos || 3        // Valor por defecto
      ],
      function (err) {
        if (err) {
          reject(err);
        } else {
          // this.lastID contiene el ID generado automáticamente
          resolve({ id: this.lastID });
        }
      }
    );

  });
};


// ─────────────────────────────────────────────────────────────
// ✏️ UPDATE → Actualizar una materia por ID
// ─────────────────────────────────────────────────────────────
const actualizarMateria = (id, datos) => {
  return new Promise((resolve, reject) => {

    const { nombre, descripcion, creditos } = datos;

    db.run(
      `UPDATE materias
       SET nombre = ?, descripcion = ?, creditos = ?
       WHERE id = ?`,
      [
        nombre,
        descripcion || null,
        creditos || 3,
        id
      ],
      function (err) {
        if (err) {
          reject(err);
        } else {
          // this.changes indica cuántas filas fueron modificadas
          resolve({ changes: this.changes });
        }
      }
    );

  });
};


// ─────────────────────────────────────────────────────────────
// ❌ DELETE → Eliminar una materia por ID
// ─────────────────────────────────────────────────────────────
const eliminarMateria = (id) => {
  return new Promise((resolve, reject) => {

    db.run(
      'DELETE FROM materias WHERE id = ?',
      [id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      }
    );

  });
};


// Exportamos todas las funciones del modelo
module.exports = {
  obtenerMaterias,
  obtenerMateriaPorId,
  crearMateria,
  actualizarMateria,
  eliminarMateria
};