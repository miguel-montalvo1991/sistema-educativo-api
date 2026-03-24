const express = require('express');
const router = express.Router();

const controller = require('../controllers/estudiantesController');

// 🔥 AQUÍ USAS LOS MISMOS NOMBRES
router.get('/', controller.obtenerEstudiantes);
router.get('/:id', controller.obtenerEstudiantePorId);
router.post('/', controller.crearEstudiante);
router.put('/:id', controller.actualizarEstudiante);
router.delete('/:id', controller.eliminarEstudiante);

module.exports = router;