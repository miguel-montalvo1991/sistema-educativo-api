// Importamos el modelo de notas que contiene todas las consultas SQL
const modelo = require("../models/notasModel");

// Importamos el modelo de estudiantes para verificar que el estudiante existe
const modeloEstudiante = require("../models/estudiantesModel");

// Importamos el modelo de cursos para verificar que el curso existe
const modeloCurso = require("../models/cursosModel");

// ── GET ALL ────────────────────────────────────────────────────────────
// Maneja la petición GET /api/notas
// Soporta filtros dinámicos por query params — ejemplo: ?periodo=2025-1
const getAll = (req, res) => {
  // req.query contiene todos los query params que llegaron en la URL
  modelo.getAll(req.query, (err, datos) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error al obtener las notas",
        error: err.message,
      });
    }

    res.status(200).json({
      success: true,
      total: datos.length,
      data: datos,
    });
  });
};

// ── GET BY ID ──────────────────────────────────────────────────────────
// Maneja la petición GET /api/notas/:id
const getById = (req, res) => {
  const { id } = req.params;

  modelo.getById(id, (err, dato) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error al buscar la nota",
        error: err.message,
      });
    }

    // Si no encontró ninguna nota con ese ID respondemos con 404
    if (!dato) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ninguna nota con el ID ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: dato,
    });
  });
};

// ── CREATE ─────────────────────────────────────────────────────────────
// Maneja la petición POST /api/notas
const create = (req, res) => {
  const { estudiante_id, curso_id, nota, periodo } = req.body;

  // Validamos que los campos obligatorios no lleguen vacíos
  if (!estudiante_id || !curso_id || nota === undefined || !periodo) {
    return res.status(400).json({
      success: false,
      message:
        "Los campos estudiante_id, curso_id, nota y periodo son obligatorios",
    });
  }

  // Validamos que estudiante_id sea un número válido
  if (isNaN(estudiante_id)) {
    return res.status(400).json({
      success: false,
      message: "El estudiante_id debe ser un número válido",
    });
  }

  // Validamos que curso_id sea un número válido
  if (isNaN(curso_id)) {
    return res.status(400).json({
      success: false,
      message: "El curso_id debe ser un número válido",
    });
  }

  // Validamos que la nota sea un número válido
  if (isNaN(nota)) {
    return res.status(400).json({
      success: false,
      message: "La nota debe ser un número válido",
    });
  }

  // Validamos que la nota esté entre 0 y 5
  // este es el rango permitido en el sistema educativo colombiano
  if (parseFloat(nota) < 0 || parseFloat(nota) > 5) {
    return res.status(400).json({
      success: false,
      message: "La nota debe estar entre 0.0 y 5.0",
    });
  }

  // Verificamos que el estudiante exista en la base de datos
  // validación de FK — no podemos registrar una nota
  // para un estudiante que no existe
  modeloEstudiante.getById(estudiante_id, (err, estudiante) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error al verificar el estudiante",
        error: err.message,
      });
    }

    // Si no existe el estudiante respondemos con 404
    if (!estudiante) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún estudiante con el ID ${estudiante_id}`,
      });
    }

    // Verificamos que el curso exista en la base de datos
    modeloCurso.getById(curso_id, (err, curso) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error al verificar el curso",
          error: err.message,
        });
      }

      // Si no existe el curso respondemos con 404
      if (!curso) {
        return res.status(404).json({
          success: false,
          message: `No se encontró ningún curso con el ID ${curso_id}`,
        });
      }

      // Todo está bien — creamos la nota
      modelo.create(req.body, (err, resultado) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Error al crear la nota",
            error: err.message,
          });
        }

        // Respondemos con 201 (Created) y el ID del nuevo registro
        res.status(201).json({
          success: true,
          message: "Nota registrada correctamente",
          data: { id: resultado.id },
        });
      });
    });
  });
};

// ── UPDATE ─────────────────────────────────────────────────────────────
// Maneja la petición PUT /api/notas/:id
const update = (req, res) => {
  const { id } = req.params;
  const { estudiante_id, curso_id, nota, periodo } = req.body;

  // Validamos campos obligatorios
  if (!estudiante_id || !curso_id || nota === undefined || !periodo) {
    return res.status(400).json({
      success: false,
      message:
        "Los campos estudiante_id, curso_id, nota y periodo son obligatorios",
    });
  }

  // Validamos que sean números válidos
  if (isNaN(estudiante_id) || isNaN(curso_id) || isNaN(nota)) {
    return res.status(400).json({
      success: false,
      message: "estudiante_id, curso_id y nota deben ser números válidos",
    });
  }

  // Validamos el rango de la nota
  if (parseFloat(nota) < 0 || parseFloat(nota) > 5) {
    return res.status(400).json({
      success: false,
      message: "La nota debe estar entre 0.0 y 5.0",
    });
  }

  // Verificamos que la nota que queremos actualizar exista
  modelo.getById(id, (err, existente) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error al verificar la nota",
        error: err.message,
      });
    }

    if (!existente) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ninguna nota con el ID ${id}`,
      });
    }

    // Verificamos que el estudiante exista
    modeloEstudiante.getById(estudiante_id, (err, estudiante) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error al verificar el estudiante",
          error: err.message,
        });
      }

      if (!estudiante) {
        return res.status(404).json({
          success: false,
          message: `No se encontró ningún estudiante con el ID ${estudiante_id}`,
        });
      }

      // Verificamos que el curso exista
      modeloCurso.getById(curso_id, (err, curso) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Error al verificar el curso",
            error: err.message,
          });
        }

        if (!curso) {
          return res.status(404).json({
            success: false,
            message: `No se encontró ningún curso con el ID ${curso_id}`,
          });
        }

        // Todo bien — actualizamos la nota
        modelo.update(id, req.body, (err) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Error al actualizar la nota",
              error: err.message,
            });
          }

          res.status(200).json({
            success: true,
            message: "Nota actualizada correctamente",
          });
        });
      });
    });
  });
};

// ── DELETE ─────────────────────────────────────────────────────────────
// Maneja la petición DELETE /api/notas/:id
const remove = (req, res) => {
  const { id } = req.params;

  // Primero verificamos que la nota exista
  modelo.getById(id, (err, existente) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error al verificar la nota",
        error: err.message,
      });
    }

    if (!existente) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ninguna nota con el ID ${id}`,
      });
    }

    // Existe — procedemos a eliminarla
    modelo.remove(id, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error al eliminar la nota",
          error: err.message,
        });
      }

      res.status(200).json({
        success: true,
        message: "Nota eliminada correctamente",
      });
    });
  });
};

// Exportamos todas las funciones para usarlas en las rutas
module.exports = { getAll, getById, create, update, remove };
