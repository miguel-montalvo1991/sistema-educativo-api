const materiasModel = require('../models/materiasModel');

const crearMateria = async (data) => {
  const { nombre, descripcion, creditos } = data;

  if (!nombre) {
    throw { status: 400, message: "Nombre requerido" };
  }

  if (creditos && creditos <= 0) {
    throw { status: 400, message: "Créditos inválidos" };
  }

  return await materiasModel.crearMateria(data);
};

module.exports = {
  crearMateria
};