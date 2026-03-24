const { Router } = require('express'); 
const controlador = require('../controllers/cursosController'); 
const router = Router(); 
router.get('/', controlador.obtenerCursos); 
router.get('/:id', controlador.obtenerCursoPorId); 
router.post('/', controlador.crearCurso); 
router.put('/:id', controlador.actualizarCurso); 
router.delete('/:id', controlador.eliminarCurso); 
module.exports = router; 
