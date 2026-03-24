const { existeOError, esNumero, camposRequeridos } = require('../utils/validators');

const notasModel = require('../models/notasModel');
const estudiantesModel = require('../models/estudiantesModel');

const obtenerNotas = async (query) => {
  return await notasModel.getAll(query);
};

const crearNota = async (data) => {

  const { estudiante_id, nota } = data;

  camposRequeridos(data, ["estudiante_id", "nota"]);

  esNumero(estudiante_id, "estudiante_id");

  const estudiante = await estudiantesModel.getById(estudiante_id);
  existeOError(estudiante, "Estudiante no existe");

  return await notasModel.create(data);
};

module.exports = {
  obtenerNotas,
  crearNota
};