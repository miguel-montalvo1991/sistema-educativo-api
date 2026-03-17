// Importamos Router de Express para definir las rutas de este módulo
const { Router } = require('express');

// Importamos el controlador de inscripciones que tiene toda la lógica
const controlador = require('../controllers/inscripcionesController');

// Creamos una instancia del Router
const router = Router();

// ── RUTAS ──────────────────────────────────────────────────────────────

// GET /api/inscripciones — obtiene todas las inscripciones
router.get('/', controlador.getAll);

// GET /api/inscripciones/:id — obtiene una inscripción por su ID
router.get('/:id', controlador.getById);

// POST /api/inscripciones — crea una nueva inscripción
router.post('/', controlador.create);

// PUT /api/inscripciones/:id — actualiza una inscripción existente
router.put('/:id', controlador.update);

// DELETE /api/inscripciones/:id — elimina una inscripción
router.delete('/:id', controlador.remove);

// Exportamos el router para registrarlo en index.js
module.exports = router;