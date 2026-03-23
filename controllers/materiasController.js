// Importamos el modelo de materias que contiene todas las consultas SQL
const modelo = require('../models/materiasModel');

// ── GET ALL ────────────────────────────────────────────────────────────
// Maneja la petición GET /api/materias
// Soporta filtros dinámicos por query params — ejemplo: ?nombre=algebra
const getAll = (req, res) => {

  // req.query contiene todos los query params que llegaron en la URL
  modelo.getAll(req.query, (err, datos) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener las materias',
        error: err.message
      });
    }

    res.status(200).json({
      success: true,
      total: datos.length,
      data: datos
    });
  });
};

// ── GET BY ID ──────────────────────────────────────────────────────────
// Maneja la petición GET /api/materias/:id
const getById = (req, res) => {
  const { id } = req.params;

  modelo.getById(id, (err, dato) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error al buscar la materia',
        error: err.message
      });
    }

    // Si no encontró ninguna materia con ese ID respondemos con 404
    if (!dato) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ninguna materia con el ID ${id}`
      });
    }

    res.status(200).json({
      success: true,
      data: dato
    });
  });
};

// ── CREATE ─────────────────────────────────────────────────────────────
// Maneja la petición POST /api/materias
const create = (req, res) => {
  const { nombre, descripcion, creditos } = req.body;

  // Validamos que el campo obligatorio no llegue vacío
  if (!nombre) {
    return res.status(400).json({
      success: false,
      message: 'El campo nombre es obligatorio'
    });
  }

  // Validamos que los créditos sean un número mayor a 0 si se enviaron
  if (creditos !== undefined && (isNaN(creditos) || creditos <= 0)) {
    return res.status(400).json({
      success: false,
      message: 'Los créditos deben ser un número mayor a 0'
    });
  }

  // Verificamos que no exista otra materia con el mismo nombre
  modelo.getAll({ nombre }, (err, existentes) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error al verificar el nombre',
        error: err.message
      });
    }

    // Si ya existe una materia con ese nombre no permitimos crearla
    if (existentes.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe una materia con ese nombre'
      });
    }

    // Todo está bien — creamos la materia
    modelo.create(req.body, (err, resultado) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al crear la materia',
          error: err.message
        });
      }

      // Respondemos con 201 (Created) y el ID del nuevo registro
      res.status(201).json({
        success: true,
        message: 'Materia creada correctamente',
        data: { id: resultado.id }
      });
    });
  });
};

// ── UPDATE ─────────────────────────────────────────────────────────────
// Maneja la petición PUT /api/materias/:id
const update = (req, res) => {
  const { id } = req.params;
  const { nombre, creditos } = req.body;

  // Validamos que el campo obligatorio no llegue vacío
  if (!nombre) {
    return res.status(400).json({
      success: false,
      message: 'El campo nombre es obligatorio'
    });
  }

  // Validamos que los créditos sean un número mayor a 0 si se enviaron
  if (creditos !== undefined && (isNaN(creditos) || creditos <= 0)) {
    return res.status(400).json({
      success: false,
      message: 'Los créditos deben ser un número mayor a 0'
    });
  }

  // Verificamos que la materia que queremos actualizar exista
  modelo.getById(id, (err, existente) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error al verificar la materia',
        error: err.message
      });
    }

    if (!existente) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ninguna materia con el ID ${id}`
      });
    }

    // Todo bien — actualizamos
    modelo.update(id, req.body, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al actualizar la materia',
          error: err.message
        });
      }

      res.status(200).json({
        success: true,
        message: 'Materia actualizada correctamente'
      });
    });
  });
};

// ── DELETE ─────────────────────────────────────────────────────────────
// Maneja la petición DELETE /api/materias/:id
const remove = (req, res) => {
  const { id } = req.params;

  // Primero verificamos que la materia exista
  modelo.getById(id, (err, existente) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error al verificar la materia',
        error: err.message
      });
    }

    if (!existente) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ninguna materia con el ID ${id}`
      });
    }

    // Existe — procedemos a eliminarla
    modelo.remove(id, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al eliminar la materia',
          error: err.message
        });
      }

      res.status(200).json({
        success: true,
        message: 'Materia eliminada correctamente'
      });
    });
  });
};

// Exportamos todas las funciones para usarlas en las rutas
module.exports = { getAll, getById, create, update, remove };