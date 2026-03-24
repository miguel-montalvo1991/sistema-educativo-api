const profesoresService = require('../services/profesoresService');


// ── GET ALL ──────────────────────────────────────
const obtenerProfesores = async (req, res, next) => {
  try {
    const data = await profesoresService.obtenerProfesores(req.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
};


// ── GET BY ID ────────────────────────────────────
const obtenerProfesorPorId = async (req, res, next) => {
  try {
    const data = await profesoresService.obtenerProfesorPorId(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};


// ── CREATE ───────────────────────────────────────
const crearProfesor = async (req, res, next) => {
  try {
    const data = await profesoresService.crearProfesor(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};


// ── UPDATE ───────────────────────────────────────
const actualizarProfesor = async (req, res, next) => {
  try {
    const data = await profesoresService.actualizarProfesor(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
};


// ── DELETE ───────────────────────────────────────
const eliminarProfesor = async (req, res, next) => {
  try {
    const data = await profesoresService.eliminarProfesor(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  obtenerProfesores,
  obtenerProfesorPorId,
  crearProfesor,
  actualizarProfesor,
  eliminarProfesor
};