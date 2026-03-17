// Importamos el modelo de estudiantes que contiene todas las consultas SQL
const modelo = require('../models/estudiantesModel');

// ── GET ALL ────────────────────────────────────────────────────────────
// Maneja la petición GET /api/estudiantes
// Soporta filtros dinámicos por query params — ejemplo: ?nombre=juan
const getAll = (req, res) => {

  // req.query contiene todos los query params que llegaron en la URL
  // los pasamos directo al modelo para filtrar si es necesario
  modelo.getAll(req.query, (err, datos) => {
    if (err) {
      // Si hubo un error en la base de datos respondemos con 500
      return res.status(500).json({
        success: false,
        message: 'Error al obtener los estudiantes',
        error: err.message
      });
    }

    // Todo salió bien — respondemos con 200 y los datos
    res.status(200).json({
      success: true,
      total: datos.length, // cuántos registros se encontraron
      data: datos
    });
  });
};

// ── GET BY ID ──────────────────────────────────────────────────────────
// Maneja la petición GET /api/estudiantes/:id
const getById = (req, res) => {

  // req.params.id contiene el ID que viene en la URL
  const { id } = req.params;

  modelo.getById(id, (err, dato) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error al buscar el estudiante',
        error: err.message
      });
    }

    // Si no encontró ningún registro con ese ID respondemos con 404
    if (!dato) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún estudiante con el ID ${id}`
      });
    }

    res.status(200).json({
      success: true,
      data: dato
    });
  });
};

// ── CREATE ─────────────────────────────────────────────────────────────
// Maneja la petición POST /api/estudiantes
const create = (req, res) => {

  // req.body contiene los datos que mandó el cliente en el cuerpo de la petición
  const { nombre, email, documento, telefono, fecha_nac } = req.body;

  // Validamos que los campos obligatorios no lleguen vacíos o indefinidos
  if (!nombre || !email || !documento) {
    return res.status(400).json({
      success: false,
      message: 'Los campos nombre, email y documento son obligatorios'
    });
  }

  // Validamos que el email tenga un formato válido con una expresión regular
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValido) {
    return res.status(400).json({
      success: false,
      message: 'El email no tiene un formato válido'
    });
  }

  // Verificamos que no exista otro estudiante con el mismo email
  modelo.getAll({ email }, (err, existentes) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error al verificar el email',
        error: err.message
      });
    }

    // Si ya existe un estudiante con ese email no permitimos crearlo
    if (existentes.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un estudiante con ese email'
      });
    }

    // Verificamos que no exista otro estudiante con el mismo documento
    modelo.getAll({ documento }, (err, existentes2) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al verificar el documento',
          error: err.message
        });
      }

      if (existentes2.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Ya existe un estudiante con ese documento'
        });
      }

      // Todo está bien — creamos el estudiante
      modelo.create(req.body, (err, resultado) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Error al crear el estudiante',
            error: err.message
          });
        }

        // Respondemos con 201 (Created) y el ID del nuevo registro
        res.status(201).json({
          success: true,
          message: 'Estudiante creado correctamente',
          data: { id: resultado.id }
        });
      });
    });
  });
};

// ── UPDATE ─────────────────────────────────────────────────────────────
// Maneja la petición PUT /api/estudiantes/:id
const update = (req, res) => {
  const { id } = req.params;
  const { nombre, email, documento, telefono, fecha_nac } = req.body;

  // Validamos campos obligatorios
  if (!nombre || !email || !documento) {
    return res.status(400).json({
      success: false,
      message: 'Los campos nombre, email y documento son obligatorios'
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

  // Verificamos que el estudiante que queremos actualizar exista
  modelo.getById(id, (err, existente) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error al verificar el estudiante',
        error: err.message
      });
    }

    // Si no existe respondemos con 404
    if (!existente) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún estudiante con el ID ${id}`
      });
    }

    // Todo bien — actualizamos
    modelo.update(id, req.body, (err, resultado) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al actualizar el estudiante',
          error: err.message
        });
      }

      res.status(200).json({
        success: true,
        message: 'Estudiante actualizado correctamente'
      });
    });
  });
};

// ── DELETE ─────────────────────────────────────────────────────────────
// Maneja la petición DELETE /api/estudiantes/:id
const remove = (req, res) => {
  const { id } = req.params;

  // Primero verificamos que el estudiante exista
  modelo.getById(id, (err, existente) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error al verificar el estudiante',
        error: err.message
      });
    }

    // Si no existe respondemos con 404
    if (!existente) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún estudiante con el ID ${id}`
      });
    }

    // Existe — procedemos a eliminarlo
    modelo.remove(id, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al eliminar el estudiante',
          error: err.message
        });
      }

      res.status(200).json({
        success: true,
        message: 'Estudiante eliminado correctamente'
      });
    });
  });
};

// Exportamos todas las funciones para usarlas en las rutas
module.exports = { getAll, getById, create, update, remove };