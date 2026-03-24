const estudiantesService = require('../services/estudiantesService');

const obtenerEstudiantes = async (req, res, next) => {
  try {
    const data = await estudiantesService.obtenerEstudiantes(req.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const obtenerEstudiantePorId = async (req, res, next) => {
  try {
    const data = await estudiantesService.obtenerEstudiantePorId(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const crearEstudiante = async (req, res, next) => {
  try {
    const data = await estudiantesService.crearEstudiante(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const actualizarEstudiante = async (req, res, next) => {
  try {
    const data = await estudiantesService.actualizarEstudiante(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const eliminarEstudiante = async (req, res, next) => {
  try {
    const data = await estudiantesService.eliminarEstudiante(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  obtenerEstudiantes,
  obtenerEstudiantePorId,
  crearEstudiante,
  actualizarEstudiante,
  eliminarEstudiante
};