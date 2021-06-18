let router = require('express').Router();

const pessoasControllerPg = require('../controllers/pessoas-controller-pg');

router.post('/', pessoasControllerPg.adicionarPessoaPg);

router.get('/', pessoasControllerPg.listarPessoasPg);

router.get('/:id', pessoasControllerPg.listarPessoaPorIDPg);

router.put('/:id', pessoasControllerPg.atualizarPessoaPg);

router.delete('/:id', pessoasControllerPg.removerPessoaPg);

module.exports = router;