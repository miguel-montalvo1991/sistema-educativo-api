const { Router } = require('express'); 
const controlador = require('../controllers/profesoresController'); 
const router = Router(); 
router.get('/', controlador.obtenerProfesores); 
router.get('/:id', controlador.obtenerProfesorPorId); 
router.post('/', controlador.crearProfesor); 
router.put('/:id', controlador.actualizarProfesor); 
router.delete('/:id', controlador.eliminarProfesor); 
module.exports = router; 
