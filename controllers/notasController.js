const notasService = require('../services/notasService');

const obtenerNotas = async (req, res, next) => {
  try {
    const data = await notasService.obtenerNotas(req.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const crearNota = async (req, res, next) => {
  try {
    const data = await notasService.crearNota(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  obtenerNotas,
  crearNota
};