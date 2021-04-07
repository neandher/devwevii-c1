let router = require('express').Router();

const agendamentosController = require('../controllers/agendamentos-controller');

router.post('/', agendamentosController.adicionarAgendamento);

router.get('/', agendamentosController.listarAgendamentos);

router.get('/:id', agendamentosController.listarAgendamentoPorID);

router.put('/:id', agendamentosController.atualizarAgendamento);

router.delete('/:id', agendamentosController.removerAgendamento);

module.exports = router;