const estudiantesModel = require('../models/estudiantesModel');

const obtenerEstudiantes = async (query) => {
  return await estudiantesModel.getAll(query);
};

const obtenerEstudiantePorId = async (id) => {
  const data = await estudiantesModel.getById(id);

  if (!data) {
    throw { status: 404, message: "Estudiante no encontrado" };
  }

  return data;
};

const crearEstudiante = async (data) => {
  return await estudiantesModel.create(data);
};

const actualizarEstudiante = async (id, data) => {
  const dataExistente = await estudiantesModel.getById(id);

  if (!dataExistente) {
    throw { status: 404, message: "Estudiante no encontrado" };
  }

  return await estudiantesModel.update(id, data);
};

const eliminarEstudiante = async (id) => {
  const data = await estudiantesModel.getById(id);

  if (!data) {
    throw { status: 404, message: "Estudiante no encontrado" };
  }

  return await estudiantesModel.remove(id);
};

module.exports = {
  obtenerEstudiantes,
  obtenerEstudiantePorId,
  crearEstudiante,
  actualizarEstudiante,
  eliminarEstudiante
};