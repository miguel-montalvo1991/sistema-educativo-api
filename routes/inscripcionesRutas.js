const { Router } = require('express'); 
const controlador = require('../controllers/inscripcionesController'); 
const router = Router(); 
router.get('/', controlador.obtenerInscripciones); 
router.post('/', controlador.crearInscripcion); 
module.exports = router; 
