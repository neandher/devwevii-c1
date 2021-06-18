let router = require('express').Router();

const unidadesControllerPg = require('../controllers/unidades-controller-pg');

router.post('/', unidadesControllerPg.adicionarUnidadePg);

router.get('/', unidadesControllerPg.listarUnidadesPg);

router.get('/:id', unidadesControllerPg.listarUnidadePorIDPg);

router.put('/:id', unidadesControllerPg.atualizarUnidadePg);

router.delete('/:id', unidadesControllerPg.removerUnidadePg);

module.exports = router;