// Importamos el modelo de cursos (acceso a DB)
const cursosModel = require('../models/cursosModel');


// ── GET ALL ─────────────────────────────────────────
// Obtiene todos los cursos con filtros opcionales
const obtenerCursos = async (query) => {
  return await cursosModel.getAll(query);
};


// ── GET BY ID ───────────────────────────────────────
// Obtiene un curso por ID y valida que exista
const obtenerCursoPorId = async (id) => {

  const curso = await cursosModel.getById(id);

  // Si no existe → error 404
  if (!curso) {
    throw { status: 404, message: "Curso no encontrado" };
  }

  return curso;
};


// ── CREATE ──────────────────────────────────────────
// Crea un nuevo curso
const crearCurso = async (data) => {

  // Aquí podrías validar datos en el futuro

  return await cursosModel.create(data);
};


// ── UPDATE ──────────────────────────────────────────
// Actualiza un curso existente
const actualizarCurso = async (id, data) => {

  const curso = await cursosModel.getById(id);

  if (!curso) {
    throw { status: 404, message: "Curso no encontrado" };
  }

  return await cursosModel.update(id, data);
};


// ── DELETE ──────────────────────────────────────────
// Elimina un curso
const eliminarCurso = async (id) => {

  const curso = await cursosModel.getById(id);

  if (!curso) {
    throw { status: 404, message: "Curso no encontrado" };
  }

  return await cursosModel.remove(id);
};


// Exportamos funciones
module.exports = {
  obtenerCursos,
  obtenerCursoPorId,
  crearCurso,
  actualizarCurso,
  eliminarCurso
};