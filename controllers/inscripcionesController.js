const inscripcionesService = require('../services/inscripcionesService');

const obtenerInscripciones = async (req, res, next) => {
  try {
    const data = await inscripcionesService.obtenerInscripciones(req.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const crearInscripcion = async (req, res, next) => {
  try {
    const data = await inscripcionesService.crearInscripcion(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  obtenerInscripciones,
  crearInscripcion
};