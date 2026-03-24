// ── MODELO ─────────────────────────────────────────
const profesoresModel = require('../models/profesoresModel');


// ── GET ALL ────────────────────────────────────────
const obtenerProfesores = async (query) => {
  return await profesoresModel.getAll(query);
};


// ── GET BY ID ──────────────────────────────────────
const obtenerProfesorPorId = async (id) => {

  const profesor = await profesoresModel.getById(id);

  if (!profesor) {
    throw { status: 404, message: "Profesor no encontrado" };
  }

  return profesor;
};


// ── CREATE ─────────────────────────────────────────
const crearProfesor = async (data) => {
  return await profesoresModel.create(data);
};


// ── UPDATE ─────────────────────────────────────────
const actualizarProfesor = async (id, data) => {

  const profesor = await profesoresModel.getById(id);

  if (!profesor) {
    throw { status: 404, message: "Profesor no encontrado" };
  }

  return await profesoresModel.update(id, data);
};


// ── DELETE ─────────────────────────────────────────
const eliminarProfesor = async (id) => {

  const profesor = await profesoresModel.getById(id);

  if (!profesor) {
    throw { status: 404, message: "Profesor no encontrado" };
  }

  return await profesoresModel.remove(id);
};


module.exports = {
  obtenerProfesores,
  obtenerProfesorPorId,
  crearProfesor,
  actualizarProfesor,
  eliminarProfesor
};