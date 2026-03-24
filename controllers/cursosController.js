const cursosService = require('../services/cursosService');


// GET ALL
const obtenerCursos = async (req, res, next) => {
  try {
    const data = await cursosService.obtenerCursos(req.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
};


// GET BY ID
const obtenerCursoPorId = async (req, res, next) => {
  try {
    const data = await cursosService.obtenerCursoPorId(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};


// CREATE
const crearCurso = async (req, res, next) => {
  try {
    const data = await cursosService.crearCurso(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};


// UPDATE
const actualizarCurso = async (req, res, next) => {
  try {
    const data = await cursosService.actualizarCurso(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
};


// DELETE
const eliminarCurso = async (req, res, next) => {
  try {
    const data = await cursosService.eliminarCurso(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  obtenerCursos,
  obtenerCursoPorId,
  crearCurso,
  actualizarCurso,
  eliminarCurso
};