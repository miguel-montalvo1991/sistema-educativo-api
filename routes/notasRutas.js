// Importamos Router de Express para definir las rutas de este módulo
const { Router } = require('express');

// Importamos el controlador de notas que tiene toda la lógica
const controlador = require('../controllers/notasController');

// Creamos una instancia del Router
const router = Router();

// ── RUTAS ──────────────────────────────────────────────────────────────

// GET /api/notas — obtiene todas las notas
router.get('/', controlador.getAll);

// GET /api/notas/:id — obtiene una nota por su ID
router.get('/:id', controlador.getById);

// POST /api/notas — crea una nueva nota
router.post('/', controlador.create);

// PUT /api/notas/:id — actualiza una nota existente
router.put('/:id', controlador.update);

// DELETE /api/notas/:id — elimina una nota
router.delete('/:id', controlador.remove);

// Exportamos el router para registrarlo en index.js
module.exports = router;