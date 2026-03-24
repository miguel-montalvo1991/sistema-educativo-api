const usuariosService = require('../services/usuariosService');


// ── GET ALL ──────────────────────────────────────
const obtenerUsuarios = async (req, res, next) => {
  try {
    const data = await usuariosService.obtenerUsuarios(req.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
};


// ── GET BY ID ────────────────────────────────────
const obtenerUsuarioPorId = async (req, res, next) => {
  try {
    const data = await usuariosService.obtenerUsuarioPorId(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};


// ── CREATE ───────────────────────────────────────
const crearUsuario = async (req, res, next) => {
  try {
    const data = await usuariosService.crearUsuario(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};


// ── UPDATE ───────────────────────────────────────
const actualizarUsuario = async (req, res, next) => {
  try {
    const data = await usuariosService.actualizarUsuario(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
};


// ── DELETE ───────────────────────────────────────
const eliminarUsuario = async (req, res, next) => {
  try {
    const data = await usuariosService.eliminarUsuario(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
};