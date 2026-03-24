// ── HELPERS ───────────────────────────────────────
const { 
  existeOError, 
  camposRequeridos, 
  esNumero, 
  numeroPositivo 
} = require('../utils/validators');


// ── MODELOS ───────────────────────────────────────
const cursosModel = require('../models/cursosModel');
const profesoresModel = require('../models/profesoresModel');
const materiasModel = require('../models/materiasModel');


// ── GET ALL ───────────────────────────────────────
const obtenerCursos = async (query) => {
  return await cursosModel.getAll(query);
};


// ── GET BY ID ─────────────────────────────────────
const obtenerCursoPorId = async (id) => {

  esNumero(id, "id");

  const curso = await cursosModel.getById(id);

  return existeOError(curso, "Curso no encontrado");
};


// ── CREATE ───────────────────────────────────────
const crearCurso = async (data) => {

  const { profesor_id, materia_id, cupo } = data;

  // ✅ Validaciones
  camposRequeridos(data, ["nombre", "profesor_id", "materia_id"]);

  esNumero(profesor_id, "profesor_id");
  esNumero(materia_id, "materia_id");

  if (cupo !== undefined) {
    numeroPositivo(cupo, "cupo");
  }

  // ✅ Validar relaciones
  const profesor = await profesoresModel.getById(profesor_id);
  existeOError(profesor, "Profesor no existe");

  const materia = await materiasModel.getById(materia_id);
  existeOError(materia, "Materia no existe");

  return await cursosModel.create(data);
};


// ── UPDATE ───────────────────────────────────────
const actualizarCurso = async (id, data) => {

  esNumero(id, "id");

  const { profesor_id, materia_id, cupo } = data;

  // Validar existencia del curso
  const curso = await cursosModel.getById(id);
  existeOError(curso, "Curso no encontrado");

  // Validaciones
  camposRequeridos(data, ["nombre", "profesor_id", "materia_id"]);

  esNumero(profesor_id, "profesor_id");
  esNumero(materia_id, "materia_id");

  if (cupo !== undefined) {
    numeroPositivo(cupo, "cupo");
  }

  // Validar relaciones
  const profesor = await profesoresModel.getById(profesor_id);
  existeOError(profesor, "Profesor no existe");

  const materia = await materiasModel.getById(materia_id);
  existeOError(materia, "Materia no existe");

  return await cursosModel.update(id, data);
};


// ── DELETE ───────────────────────────────────────
const eliminarCurso = async (id) => {

  esNumero(id, "id");

  const curso = await cursosModel.getById(id);

  existeOError(curso, "Curso no encontrado");

  return await cursosModel.remove(id);
};


// ── EXPORT ───────────────────────────────────────
module.exports = {
  obtenerCursos,
  obtenerCursoPorId,
  crearCurso,
  actualizarCurso,
  eliminarCurso
};