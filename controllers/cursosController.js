// Importamos el modelo de cursos que contiene todas las consultas SQL
const modelo = require('../models/cursosModel');

// Importamos el modelo de profesores para verificar que el profesor existe
const modeloProfesor = require('../models/profesoresModel');



// ── GET ALL ────────────────────────────────────────────────────────────
// Maneja la petición GET /api/cursos
// Soporta filtros dinámicos por query params — ejemplo: ?nombre=algebra
const getAll = (req, res) => {

  // req.query contiene todos los query params que llegaron en la URL
  modelo.getAll(req.query, (err, datos) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener los cursos',
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
// Maneja la petición GET /api/cursos/:id
const getById = (req, res) => {
  const { id } = req.params;

  modelo.getById(id, (err, dato) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error al buscar el curso',
        error: err.message
      });
    }

    // Si no encontró ningún curso con ese ID respondemos con 404
    if (!dato) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún curso con el ID ${id}`
      });
    }

    res.status(200).json({
      success: true,
      data: dato
    });
  });
};

// ── CREATE ─────────────────────────────────────────────────────────────
// Maneja la petición POST /api/cursos
const create = (req, res) => {
  const { nombre, profesor_id, materia_id, horario, cupo } = req.body;

  // Validamos que los campos obligatorios no lleguen vacíos
  if (!nombre || !profesor_id || !materia_id) {
    return res.status(400).json({
      success: false,
      message: 'Los campos nombre, profesor_id y materia_id son obligatorios'
    });
  }

  // Validamos que profesor_id sea un número válido
  if (isNaN(profesor_id)) {
    return res.status(400).json({
      success: false,
      message: 'El profesor_id debe ser un número válido'
    });
  }

  // Validamos que materia_id sea un número válido
  if (isNaN(materia_id)) {
    return res.status(400).json({
      success: false,
      message: 'El materia_id debe ser un número válido'
    });
  }

  // Validamos que el cupo sea mayor a 0 si se envió
  if (cupo !== undefined && (isNaN(cupo) || cupo <= 0)) {
    return res.status(400).json({
      success: false,
      message: 'El cupo debe ser un número mayor a 0'
    });
  }

  // Verificamos que el profesor exista en la base de datos
  // esto es la validación de FK — no podemos crear un curso
  // con un profesor que no existe
  modeloProfesor.getById(profesor_id, (err, profesor) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error al verificar el profesor',
        error: err.message
      });
    }

    // Si no existe el profesor respondemos con 404
    if (!profesor) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún profesor con el ID ${profesor_id}`
      });
    }

    // Verificamos que la materia exista en la base de datos
    modeloMateria.getById(materia_id, (err, materia) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al verificar la materia',
          error: err.message
        });
      }

      // Si no existe la materia respondemos con 404
      if (!materia) {
        return res.status(404).json({
          success: false,
          message: `No se encontró ninguna materia con el ID ${materia_id}`
        });
      }

      // Todo está bien — creamos el curso
      modelo.create(req.body, (err, resultado) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Error al crear el curso',
            error: err.message
          });
        }

        // Respondemos con 201 (Created) y el ID del nuevo registro
        res.status(201).json({
          success: true,
          message: 'Curso creado correctamente',
          data: { id: resultado.id }
        });
      });
    });
  });
};

// ── UPDATE ─────────────────────────────────────────────────────────────
// Maneja la petición PUT /api/cursos/:id
const update = (req, res) => {
  const { id } = req.params;
  const { nombre, profesor_id, materia_id, horario, cupo } = req.body;

  // Validamos campos obligatorios
  if (!nombre || !profesor_id || !materia_id) {
    return res.status(400).json({
      success: false,
      message: 'Los campos nombre, profesor_id y materia_id son obligatorios'
    });
  }

  // Validamos que profesor_id y materia_id sean números válidos
  if (isNaN(profesor_id) || isNaN(materia_id)) {
    return res.status(400).json({
      success: false,
      message: 'profesor_id y materia_id deben ser números válidos'
    });
  }

  // Verificamos que el curso que queremos actualizar exista
  modelo.getById(id, (err, existente) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error al verificar el curso',
        error: err.message
      });
    }

    if (!existente) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún curso con el ID ${id}`
      });
    }

    // Verificamos que el profesor exista
    modeloProfesor.getById(profesor_id, (err, profesor) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al verificar el profesor',
          error: err.message
        });
      }

      if (!profesor) {
        return res.status(404).json({
          success: false,
          message: `No se encontró ningún profesor con el ID ${profesor_id}`
        });
      }

      // Verificamos que la materia exista
      modeloMateria.getById(materia_id, (err, materia) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Error al verificar la materia',
            error: err.message
          });
        }

        if (!materia) {
          return res.status(404).json({
            success: false,
            message: `No se encontró ninguna materia con el ID ${materia_id}`
          });
        }

        // Todo bien — actualizamos el curso
        modelo.update(id, req.body, (err) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: 'Error al actualizar el curso',
              error: err.message
            });
          }

          res.status(200).json({
            success: true,
            message: 'Curso actualizado correctamente'
          });
        });
      });
    });
  });
};

// ── DELETE ─────────────────────────────────────────────────────────────
// Maneja la petición DELETE /api/cursos/:id
const remove = (req, res) => {
  const { id } = req.params;

  // Primero verificamos que el curso exista
  modelo.getById(id, (err, existente) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error al verificar el curso',
        error: err.message
      });
    }

    if (!existente) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún curso con el ID ${id}`
      });
    }

    // Existe — procedemos a eliminarlo
    modelo.remove(id, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al eliminar el curso',
          error: err.message
        });
      }

      res.status(200).json({
        success: true,
        message: 'Curso eliminado correctamente'
      });
    });
  });
};

// Exportamos todas las funciones para usarlas en las rutas
module.exports = { getAll, getById, create, update, remove };