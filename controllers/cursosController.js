// ── IMPORTAMOS EL SERVICE (NO MODELOS) ──────────────────────────────
const cursosService = require('../services/cursosService');


// ── GET ALL ─────────────────────────────────────────────────────────
// Obtiene todos los cursos con filtros
const getAll = async (req, res, next) => {
  try {
    const data = await cursosService.obtenerCursos(req.query);

    res.status(200).json({
      success: true,
      total: data.length,
      data
    });

  } catch (error) {
    next(error);
  }
};


// ── GET BY ID ───────────────────────────────────────────────────────
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await cursosService.obtenerCursoPorId(id);

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    next(error);
  }
};


// ── CREATE ──────────────────────────────────────────────────────────
const create = async (req, res, next) => {
  try {

    const data = await cursosService.crearCurso(req.body);

    res.status(201).json({
      success: true,
      message: "Curso creado correctamente",
      data
    });

  } catch (error) {
    next(error);
  }
};


// ── UPDATE ──────────────────────────────────────────────────────────
const update = async (req, res, next) => {
  try {

    const { id } = req.params;

    await cursosService.actualizarCurso(id, req.body);

    res.status(200).json({
      success: true,
      message: "Curso actualizado correctamente"
    });

  } catch (error) {
    next(error);
  }
};


// ── DELETE ──────────────────────────────────────────────────────────
const remove = async (req, res, next) => {
  try {

    const { id } = req.params;

    await cursosService.eliminarCurso(id);

    res.status(200).json({
      success: true,
      message: "Curso eliminado correctamente"
    });

  } catch (error) {
    next(error);
  }
};


// ── EXPORTACIÓN ─────────────────────────────────────────────────────
module.exports = { getAll, getById, create, update, remove };