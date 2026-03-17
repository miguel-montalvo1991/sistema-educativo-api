// Importamos el modelo de profesores que contiene todas las consultas SQL
const modelo = require('../models/profesoresModel');

// ── GET ALL ────────────────────────────────────────────────────────────
// Maneja la petición GET /api/profesores
// Soporta filtros dinámicos por query params — ejemplo: ?especialidad=matematicas
const getAll = (req, res) => {

  // req.query contiene todos los query params que llegaron en la URL
  modelo.getAll(req.query, (err, datos) => {
    if (err) {
      // Si hubo un error en la base de datos respondemos con 500
      return res.status(500).json({
        success: false,
        message: 'Error al obtener los profesores',
        error: err.message
      });
    }

    // Todo salió bien — respondemos con 200 y los datos
    res.status(200).json({
      success: true,
      total: datos.length,
      data: datos
    });
  });
};

// ── GET BY ID ──────────────────────────────────────────────────────────
// Maneja la petición GET /api/profesores/:id
const getById = (req, res) => {

  // req.params.id contiene el ID que viene en la URL
  const { id } = req.params;

  modelo.getById(id, (err, dato) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error al buscar el profesor',
        error: err.message
      });
    }

    // Si no encontró ningún registro con ese ID respondemos con 404
    if (!dato) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún profesor con el ID ${id}`
      });
    }

    res.status(200).json({
      success: true,
      data: dato
    });
  });
};

// ── CREATE ─────────────────────────────────────────────────────────────
// Maneja la petición POST /api/profesores
const create = (req, res) => {

  // Extraemos los campos del cuerpo de la petición
  const { nombre, email, especialidad, telefono } = req.body;

  // Validamos que los campos obligatorios no lleguen vacíos
  if (!nombre || !email || !especialidad) {
    return res.status(400).json({
      success: false,
      message: 'Los campos nombre, email y especialidad son obligatorios'
    });
  }

  // Validamos que el email tenga un formato válido
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValido) {
    return res.status(400).json({
      success: false,
      message: 'El email no tiene un formato válido'
    });
  }

  // Verificamos que no exista otro profesor con el mismo email
  modelo.getAll({ email }, (err, existentes) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error al verificar el email',
        error: err.message
      });
    }

    // Si ya existe un profesor con ese email no permitimos crearlo
    if (existentes.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un profesor con ese email'
      });
    }

    // Todo está bien — creamos el profesor
    modelo.create(req.body, (err, resultado) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al crear el profesor',
          error: err.message
        });
      }

      // Respondemos con 201 (Created) y el ID del nuevo registro
      res.status(201).json({
        success: true,
        message: 'Profesor creado correctamente',
        data: { id: resultado.id }
      });
    });
  });
};

// ── UPDATE ─────────────────────────────────────────────────────────────
// Maneja la petición PUT /api/profesores/:id
const update = (req, res) => {
  const { id } = req.params;
  const { nombre, email, especialidad } = req.body;

  // Validamos campos obligatorios
  if (!nombre || !email || !especialidad) {
    return res.status(400).json({
      success: false,
      message: 'Los campos nombre, email y especialidad son obligatorios'
    });
  }

  // Validamos formato del email
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValido) {
    return res.status(400).json({
      success: false,
      message: 'El email no tiene un formato válido'
    });
  }

  // Verificamos que el profesor que queremos actualizar exista
  modelo.getById(id, (err, existente) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error al verificar el profesor',
        error: err.message
      });
    }

    // Si no existe respondemos con 404
    if (!existente) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún profesor con el ID ${id}`
      });
    }

    // Todo bien — actualizamos
    modelo.update(id, req.body, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al actualizar el profesor',
          error: err.message
        });
      }

      res.status(200).json({
        success: true,
        message: 'Profesor actualizado correctamente'
      });
    });
  });
};

// ── DELETE ─────────────────────────────────────────────────────────────
// Maneja la petición DELETE /api/profesores/:id
const remove = (req, res) => {
  const { id } = req.params;

  // Primero verificamos que el profesor exista
  modelo.getById(id, (err, existente) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error al verificar el profesor',
        error: err.message
      });
    }

    // Si no existe respondemos con 404
    if (!existente) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún profesor con el ID ${id}`
      });
    }

    // Existe — procedemos a eliminarlo
    modelo.remove(id, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al eliminar el profesor',
          error: err.message
        });
      }

      res.status(200).json({
        success: true,
        message: 'Profesor eliminado correctamente'
      });
    });
  });
};

// Exportamos todas las funciones para usarlas en las rutas
module.exports = { getAll, getById, create, update, remove };