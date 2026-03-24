const { existeOError, esNumero, camposRequeridos } = require('../utils/validators');

const inscripcionesModel = require('../models/inscripcionesModel');
const estudiantesModel = require('../models/estudiantesModel');
const cursosModel = require('../models/cursosModel');

const obtenerInscripciones = async (query) => {
  return await inscripcionesModel.getAll(query);
};

const crearInscripcion = async (data) => {

  const { estudiante_id, curso_id } = data;

  camposRequeridos(data, ["estudiante_id", "curso_id"]);

  esNumero(estudiante_id, "estudiante_id");
  esNumero(curso_id, "curso_id");

  const estudiante = await estudiantesModel.getById(estudiante_id);
  existeOError(estudiante, "Estudiante no existe");

  const curso = await cursosModel.getById(curso_id);
  existeOError(curso, "Curso no existe");

  return await inscripcionesModel.create(data);
};

module.exports = {
  obtenerInscripciones,
  crearInscripcion
};