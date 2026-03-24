const { existeOError, esNumero, camposRequeridos } = require('../utils/validators');
const materiasModel = require('../models/materiasModel');

// GET ALL
const obtenerMaterias = async (query) => {
  return await materiasModel.getAll(query);
};

// GET BY ID
const obtenerMateriaPorId = async (id) => {
  esNumero(id, "id");
  const data = await materiasModel.getById(id);
  return existeOError(data, "Materia no encontrada");
};

// CREATE
const crearMateria = async (data) => {
  camposRequeridos(data, ["nombre"]);
  return await materiasModel.create(data);
};

// UPDATE
const actualizarMateria = async (id, data) => {
  esNumero(id, "id");

  const existente = await materiasModel.getById(id);
  existeOError(existente, "Materia no encontrada");

  return await materiasModel.update(id, data);
};

// DELETE
const eliminarMateria = async (id) => {
  esNumero(id, "id");

  const existente = await materiasModel.getById(id);
  existeOError(existente, "Materia no encontrada");

  return await materiasModel.remove(id);
};

module.exports = {
  obtenerMaterias,
  obtenerMateriaPorId,
  crearMateria,
  actualizarMateria,
  eliminarMateria
};