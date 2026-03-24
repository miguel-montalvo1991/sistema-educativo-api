const { existeOError, esNumero, camposRequeridos } = require('../utils/validators');
const estudiantesModel = require('../models/estudiantesModel');

const obtenerEstudiantes = async (query) => {
  return await estudiantesModel.getAll(query);
};

const obtenerEstudiantePorId = async (id) => {
  esNumero(id, "id");
  const data = await estudiantesModel.getById(id);
  return existeOError(data, "Estudiante no encontrado");
};

const crearEstudiante = async (data) => {
  camposRequeridos(data, ["nombre", "email"]);
  return await estudiantesModel.create(data);
};

const actualizarEstudiante = async (id, data) => {
  esNumero(id, "id");

  const existente = await estudiantesModel.getById(id);
  existeOError(existente, "Estudiante no encontrado");

  return await estudiantesModel.update(id, data);
};

const eliminarEstudiante = async (id) => {
  esNumero(id, "id");

  const existente = await estudiantesModel.getById(id);
  existeOError(existente, "Estudiante no encontrado");

  return await estudiantesModel.remove(id);
};

module.exports = {
  obtenerEstudiantes,
  obtenerEstudiantePorId,
  crearEstudiante,
  actualizarEstudiante,
  eliminarEstudiante
};