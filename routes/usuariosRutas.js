// Importamos Router de Express
const { Router } = require('express');

// Importamos el controlador de usuarios
const controlador = require('../controllers/usuariosController');

const router = Router();

// GET /api/usuarios — obtiene todos los usuarios
router.get('/', controlador.getAll);

// GET /api/usuarios/:id — obtiene un usuario por ID
router.get('/:id', controlador.getById);

// POST /api/usuarios — crea un nuevo usuario
router.post('/', controlador.create);

// PUT /api/usuarios/:id — actualiza un usuario
router.put('/:id', controlador.update);

// DELETE /api/usuarios/:id — elimina un usuario
router.delete('/:id', controlador.remove);

module.exports = router;