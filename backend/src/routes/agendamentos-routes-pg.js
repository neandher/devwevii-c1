let router = require('express').Router();

const agendamentosControllerPg = require('../controllers/agendamentos-controller-pg');

router.post('/', agendamentosControllerPg.adicionarAgendamentoPg);

router.get('/', agendamentosControllerPg.listarAgendamentosPg);

router.get('/:id', agendamentosControllerPg.listarAgendamentoPorIDPg);

router.put('/:id', agendamentosControllerPg.atualizarAgendamentoPg);

router.delete('/:id', agendamentosControllerPg.removerAgendamentoPg);

module.exports = router;