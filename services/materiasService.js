const materiasModel = require('../models/materiasModel');

const obtenerMaterias = async (query) => {
  return await materiasModel.obtenerMaterias(query);
};

const obtenerMateriaPorId = async (id) => {
  const materia = await materiasModel.obtenerMateriaPorId(id);

  if (!materia) {
    throw { status: 404, message: "Materia no encontrada" };
  }

  return materia;
};

const crearMateria = async (data) => {
  const { nombre, descripcion, creditos } = data;

  if (!nombre) {
    throw { status: 400, message: "El nombre es obligatorio" };
  }

  if (creditos && creditos <= 0) {
    throw { status: 400, message: "Los créditos deben ser mayores a 0" };
  }

  return await materiasModel.crearMateria(data);
};

const actualizarMateria = async (id, data) => {
  const materia = await materiasModel.obtenerMateriaPorId(id);

  if (!materia) {
    throw { status: 404, message: "Materia no encontrada" };
  }

  return await materiasModel.actualizarMateria(id, data);
};

const eliminarMateria = async (id) => {
  const materia = await materiasModel.obtenerMateriaPorId(id);

  if (!materia) {
    throw { status: 404, message: "Materia no encontrada" };
  }

  return await materiasModel.eliminarMateria(id);
};

module.exports = {
  obtenerMaterias,
  obtenerMateriaPorId,
  crearMateria,
  actualizarMateria,
  eliminarMateria
};