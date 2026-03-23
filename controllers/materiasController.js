const materiasService = require('../services/materiasService');

const crearMateria = async (req, res, next) => {
  try {
    const materia = await materiasService.crearMateria(req.body);
    res.json(materia);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  crearMateria
};