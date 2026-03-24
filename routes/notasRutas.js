const { Router } = require('express'); 
const controlador = require('../controllers/notasController'); 
const router = Router(); 
router.get('/', controlador.obtenerNotas); 
router.post('/', controlador.crearNota); 
module.exports = router; 
