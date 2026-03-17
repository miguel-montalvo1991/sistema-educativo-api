// Importamos Router de Express para definir las rutas de este módulo
const { Router } = require('express');

// Importamos el controlador de profesores que tiene toda la lógica
const controlador = require('../controllers/profesoresController');

// Creamos una instancia del Router
const router = Router();

// ── RUTAS ──────────────────────────────────────────────────────────────

// GET /api/profesores — obtiene todos los profesores
router.get('/', controlador.getAll);

// GET /api/profesores/:id — obtiene un profesor por su ID
router.get('/:id', controlador.getById);

// POST /api/profesores — crea un nuevo profesor
router.post('/', controlador.create);

// PUT /api/profesores/:id — actualiza un profesor existente
router.put('/:id', controlador.update);

// DELETE /api/profesores/:id — elimina un profesor
router.delete('/:id', controlador.remove);

// Exportamos el router para registrarlo en index.js
module.exports = router;