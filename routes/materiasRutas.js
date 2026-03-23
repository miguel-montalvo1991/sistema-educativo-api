const { Router } = require('express');
const controlador = require('../controllers/materiasController');
const router = Router();

router.get('/', controlador.getAll);
router.get('/:id', controlador.getById);
router.post('/', controlador.create);
router.put('/:id', controlador.update);
router.delete('/:id', controlador.remove);

module.exports = router;
