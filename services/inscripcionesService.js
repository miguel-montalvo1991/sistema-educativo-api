const inscripcionesModel = require('../models/inscripcionesModel');

const obtenerInscripciones = async (query) => {
  return await inscripcionesModel.getAll(query);
};

const obtenerInscripcionPorId = async (id) => {
  const data = await inscripcionesModel.getById(id);

  if (!data) {
    throw { status: 404, message: "Inscripción no encontrada" };
  }

  return data;
};

const crearInscripcion = async (data) => {
  return await inscripcionesModel.create(data);
};

const actualizarInscripcion = async (id, data) => {
  const existente = await inscripcionesModel.getById(id);

  if (!existente) {
    throw { status: 404, message: "Inscripción no encontrada" };
  }

  return await inscripcionesModel.update(id, data);
};

const eliminarInscripcion = async (id) => {
  const existente = await inscripcionesModel.getById(id);

  if (!existente) {
    throw { status: 404, message: "Inscripción no encontrada" };
  }

  return await inscripcionesModel.remove(id);
};

module.exports = {
  obtenerInscripciones,
  obtenerInscripcionPorId,
  crearInscripcion,
  actualizarInscripcion,
  eliminarInscripcion
};