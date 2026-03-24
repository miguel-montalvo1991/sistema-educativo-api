const { Router } = require('express'); 
const controlador = require('../controllers/materiasController'); 
const router = Router(); 
router.get('/', controlador.obtenerMaterias); 
router.get('/:id', controlador.obtenerMateriaPorId); 
router.post('/', controlador.crearMateria); 
router.put('/:id', controlador.actualizarMateria); 
router.delete('/:id', controlador.eliminarMateria); 
module.exports = router; 
