// Importamos Router de Express para definir las rutas de este módulo
const { Router } = require('express');

// Importamos el controlador de estudiantes que tiene toda la lógica
const controlador = require('../controllers/estudiantesController');

// Creamos una instancia del Router
const router = Router();

// ── RUTAS ──────────────────────────────────────────────────────────────

// GET /api/estudiantes — obtiene todos los estudiantes
// soporta filtros por query params — ejemplo: /api/estudiantes?nombre=juan
router.get('/', controlador.getAll);

// GET /api/estudiantes/:id — obtiene un estudiante por su ID
router.get('/:id', controlador.getById);

// POST /api/estudiantes — crea un nuevo estudiante
router.post('/', controlador.create);

// PUT /api/estudiantes/:id — actualiza un estudiante existente
router.put('/:id', controlador.update);

// DELETE /api/estudiantes/:id — elimina un estudiante
router.delete('/:id', controlador.remove);

// Exportamos el router para registrarlo en index.js
module.exports = router;