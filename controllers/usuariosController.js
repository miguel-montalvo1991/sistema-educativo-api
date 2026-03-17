// Importamos el modelo de usuarios
const modelo = require('../models/usuariosModel');

// ── GET ALL ────────────────────────────────────────────────────────────
const getAll = (req, res) => {
  modelo.getAll(req.query, (err, datos) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener los usuarios',
        error: err.message
      });
    }
    res.status(200).json({ success: true, total: datos.length, data: datos });
  });
};

// ── GET BY ID ──────────────────────────────────────────────────────────
const getById = (req, res) => {
  const { id } = req.params;
  modelo.getById(id, (err, dato) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error al buscar el usuario',
        error: err.message
      });
    }
    if (!dato) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún usuario con el ID ${id}`
      });
    }
    res.status(200).json({ success: true, data: dato });
  });
};

// ── CREATE ─────────────────────────────────────────────────────────────
const create = (req, res) => {
  const { nombre, email, password, rol } = req.body;

  // Validamos que los campos obligatorios no lleguen vacíos
  if (!nombre || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Los campos nombre, email y password son obligatorios'
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

  // Validamos que el rol sea uno de los valores permitidos si se envió
  const rolesValidos = ['admin', 'estudiante', 'profesor'];
  if (rol && !rolesValidos.includes(rol)) {
    return res.status(400).json({
      success: false,
      message: 'El rol debe ser: admin, estudiante o profesor'
    });
  }

  // Verificamos que no exista otro usuario con el mismo email
  modelo.getAll({ email }, (err, existentes) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error al verificar el email',
        error: err.message
      });
    }
    if (existentes.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un usuario con ese email'
      });
    }

    // Todo bien — creamos el usuario
    modelo.create(req.body, (err, resultado) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al crear el usuario',
          error: err.message
        });
      }
      res.status(201).json({
        success: true,
        message: 'Usuario creado correctamente',
        data: { id: resultado.id }
      });
    });
  });
};

// ── UPDATE ─────────────────────────────────────────────────────────────
const update = (req, res) => {
  const { id } = req.params;
  const { nombre, email, password, rol } = req.body;

  // Validamos campos obligatorios
  if (!nombre || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Los campos nombre, email y password son obligatorios'
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

  // Verificamos que el usuario exista
  modelo.getById(id, (err, existente) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error al verificar el usuario',
        error: err.message
      });
    }
    if (!existente) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún usuario con el ID ${id}`
      });
    }

    // Todo bien — actualizamos
    modelo.update(id, req.body, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al actualizar el usuario',
          error: err.message
        });
      }
      res.status(200).json({
        success: true,
        message: 'Usuario actualizado correctamente'
      });
    });
  });
};

// ── DELETE ─────────────────────────────────────────────────────────────
const remove = (req, res) => {
  const { id } = req.params;

  // Verificamos que el usuario exista
  modelo.getById(id, (err, existente) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error al verificar el usuario',
        error: err.message
      });
    }
    if (!existente) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún usuario con el ID ${id}`
      });
    }

    // Existe — procedemos a eliminarlo
    modelo.remove(id, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al eliminar el usuario',
          error: err.message
        });
      }
      res.status(200).json({
        success: true,
        message: 'Usuario eliminado correctamente'
      });
    });
  });
};

module.exports = { getAll, getById, create, update, remove };