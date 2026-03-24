const usuariosModel = require('../models/usuariosModel');

const obtenerUsuarios = async (query) => {
  return await usuariosModel.getAll(query);
};

const obtenerUsuarioPorId = async (id) => {
  const data = await usuariosModel.getById(id);

  if (!data) {
    throw { status: 404, message: "Usuario no encontrado" };
  }

  return data;
};

const crearUsuario = async (data) => {
  return await usuariosModel.create(data);
};

const actualizarUsuario = async (id, data) => {
  const existente = await usuariosModel.getById(id);

  if (!existente) {
    throw { status: 404, message: "Usuario no encontrado" };
  }

  return await usuariosModel.update(id, data);
};

const eliminarUsuario = async (id) => {
  const existente = await usuariosModel.getById(id);

  if (!existente) {
    throw { status: 404, message: "Usuario no encontrado" };
  }

  return await usuariosModel.remove(id);
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
};