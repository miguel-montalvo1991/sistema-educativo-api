const notasModel = require('../models/notasModel');

const obtenerNotas = async (query) => {
  return await notasModel.getAll(query);
};

const obtenerNotaPorId = async (id) => {
  const data = await notasModel.getById(id);

  if (!data) {
    throw { status: 404, message: "Nota no encontrada" };
  }

  return data;
};

const crearNota = async (data) => {
  return await notasModel.create(data);
};

const actualizarNota = async (id, data) => {
  const existente = await notasModel.getById(id);

  if (!existente) {
    throw { status: 404, message: "Nota no encontrada" };
  }

  return await notasModel.update(id, data);
};

const eliminarNota = async (id) => {
  const existente = await notasModel.getById(id);

  if (!existente) {
    throw { status: 404, message: "Nota no encontrada" };
  }

  return await notasModel.remove(id);
};

module.exports = {
  obtenerNotas,
  obtenerNotaPorId,
  crearNota,
  actualizarNota,
  eliminarNota
};