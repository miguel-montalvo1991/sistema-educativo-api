// Importamos Router de Express para definir las rutas de este módulo
const { Router } = require('express');

// Importamos el controlador de cursos que tiene toda la lógica
const controlador = require('../controllers/cursosController');

// Creamos una instancia del Router
const router = Router();

// ── RUTAS ──────────────────────────────────────────────────────────────

// GET /api/cursos — obtiene todos los cursos
router.get('/', controlador.getAll);

// GET /api/cursos/:id — obtiene un curso por su ID
router.get('/:id', controlador.getById);

// POST /api/cursos — crea un nuevo curso
router.post('/', controlador.create);

// PUT /api/cursos/:id — actualiza un curso existente
router.put('/:id', controlador.update);

// DELETE /api/cursos/:id — elimina un curso
router.delete('/:id', controlador.remove);

// Exportamos el router para registrarlo en index.js
module.exports = router;