let router = require('express').Router();

const unidadesController = require('../controllers/unidades-controller');

router.post('/', unidadesController.adicionarUnidade);

router.get('/', unidadesController.listarUnidades);

router.get('/:id', unidadesController.listarUnidadePorID);

router.put('/:id', unidadesController.atualizarUnidade);

router.delete('/:id', unidadesController.removerUnidade);

module.exports = router;