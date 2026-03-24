const db = require('../db/db'); 
const getAll = (filtros) => new Promise((resolve, reject) => { 
  let query = 'SELECT * FROM materias'; 
  const valores = []; 
  const condiciones = Object.entries(filtros).filter(([_, v]) => v !== undefined && v !== ''); 
  if (condiciones.length > 0) { const clausulas = condiciones.map(([c, v]) => { valores.push(`%${v}%%`); return `${c} LIKE ?`; }); query += ' WHERE ' + clausulas.join(' AND '); } 
  db.all(query, valores, (err, filas) => { if (err) return reject(err); resolve(filas); }); 
}); 
const getById = (id) => new Promise((resolve, reject) => { db.get('SELECT * FROM materias WHERE id = ?', [id], (err, fila) => { if (err) return reject(err); resolve(fila); }); }); 
const create = (datos) => new Promise((resolve, reject) => { const { nombre, descripcion, creditos } = datos; db.run('INSERT INTO materias (nombre, descripcion, creditos) VALUES (?, ?, ?)', [nombre, descripcion || null, creditos || 3], function(err) { if (err) return reject(err); resolve({ id: this.lastID }); }); }); 
const update = (id, datos) => new Promise((resolve, reject) => { const { nombre, descripcion, creditos } = datos; db.run('UPDATE materias SET nombre = ?, descripcion = ?, creditos = ? WHERE id = ?', [nombre, descripcion || null, creditos || 3, id], function(err) { if (err) return reject(err); resolve({ changes: this.changes }); }); }); 
const remove = (id) => new Promise((resolve, reject) => { db.run('DELETE FROM materias WHERE id = ?', [id], function(err) { if (err) return reject(err); resolve({ changes: this.changes }); }); }); 
module.exports = { getAll, getById, create, update, remove }; 
