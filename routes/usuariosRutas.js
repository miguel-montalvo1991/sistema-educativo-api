const { Router } = require('express'); 
const controlador = require('../controllers/usuariosController'); 
const router = Router(); 
router.get('/', controlador.obtenerUsuarios); 
router.get('/:id', controlador.obtenerUsuarioPorId); 
router.post('/', controlador.crearUsuario); 
router.put('/:id', controlador.actualizarUsuario); 
router.delete('/:id', controlador.eliminarUsuario); 
module.exports = router; 
