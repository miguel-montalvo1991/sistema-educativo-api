// ── HELPERS ───────────────────────────────────────
const { existeOError, esNumero } = require('../utils/validators');

// ── MODELO ───────────────────────────────────────
const profesoresModel = require('../models/profesoresModel');


// ── GET ALL ──────────────────────────────────────
const obtenerProfesores = async (query) => {
  return await profesoresModel.getAll(query);
};


// ── GET BY ID ────────────────────────────────────
const obtenerProfesorPorId = async (id) => {

  esNumero(id, "id");

  const profesor = await profesoresModel.getById(id);

  return existeOError(profesor, "Profesor no encontrado");
};


// ── CREATE ───────────────────────────────────────
const crearProfesor = async (data) => {
  return await profesoresModel.create(data);
};


// ── UPDATE ───────────────────────────────────────
const actualizarProfesor = async (id, data) => {

  esNumero(id, "id");

  const profesor = await profesoresModel.getById(id);

  existeOError(profesor, "Profesor no encontrado");

  return await profesoresModel.update(id, data);
};


// ── DELETE ───────────────────────────────────────
const eliminarProfesor = async (id) => {

  esNumero(id, "id");

  const profesor = await profesoresModel.getById(id);

  existeOError(profesor, "Profesor no encontrado");

  return await profesoresModel.remove(id);
};


// ── EXPORT ───────────────────────────────────────
module.exports = {
  obtenerProfesores,
  obtenerProfesorPorId,
  crearProfesor,
  actualizarProfesor,
  eliminarProfesor
};