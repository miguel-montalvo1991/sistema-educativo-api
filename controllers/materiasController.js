const materiasService = require('../services/materiasService');

const obtenerMaterias = async (req, res, next) => {
  try {
    const data = await materiasService.obtenerMaterias(req.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const obtenerMateriaPorId = async (req, res, next) => {
  try {
    const data = await materiasService.obtenerMateriaPorId(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const crearMateria = async (req, res, next) => {
  try {
    const data = await materiasService.crearMateria(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const actualizarMateria = async (req, res, next) => {
  try {
    const data = await materiasService.actualizarMateria(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const eliminarMateria = async (req, res, next) => {
  try {
    const data = await materiasService.eliminarMateria(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  obtenerMaterias,
  obtenerMateriaPorId,
  crearMateria,
  actualizarMateria,
  eliminarMateria
};