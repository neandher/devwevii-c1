const agendamentosModel = require('../models/agendamentos-model');
const mongodb = require('../infra/mongodb');

exports.adicionarAgendamento = (req, res) => {
  let agendamento = new agendamentosModel();
  agendamento.data_hora_agendamento = req.body.data_hora_agendamento;
  agendamento.necessidades_especiais_agendamento =
    req.body.necessidades_especiais_agendamento;
  agendamento.observacoes_agendamento = req.body.observacoes_agendamento;

  agendamento.save((erro) => {
    if (erro) {
      res.send({
        status: 'erro',
        message: 'Não foi possível inserir o agendamento.',
      });
    } else {
      res.send({
        status: 'ok',
        message: `Agendamento ${req.body.data_hora_agendamento} inserido com sucesso!`,
      });
    }
  });
};

exports.listarAgendamentos = (req, res) => {
  agendamentosModel.find(function (err, agendamentos) {
    if (err) {
      console.log('Não foi possível recuperar os agendamentos!');
      res.json({
        status: 'erro',
        message: 'Não foi possível recuperar os agendamentos!',
      });
    } else {
      res.json({
        status: 'ok',
        agendamentos: agendamentos,
      });
    }
  });
};

exports.listarAgendamentoPorID = (req, res) => {
  let id_agendamento = req.params.id;

  agendamentosModel.findById(id_agendamento, function (err, agendamento) {
    if (err || !agendamento) {
      console.log(
        `Não foi possivel recuperar o agendamento de id: ${id_agendamento}`
      );
      res.json({
        status: 'erro',
        message: `Não foi possivel recuperar o agendamento de id: ${id_agendamento}`,
      });
    } else {
      res.json({
        status: 'ok',
        agendamento: agendamento,
      });
    }
  });
};

exports.atualizarAgendamento = (req, res) => {
  let id_agendamento = req.params.id;

  agendamentosModel.findById(id_agendamento, (erro, agendamento) => {
    if (erro || !agendamento) {
      console.log('Não foi possível recuperar os agendamento!');
      res.json({
        status: 'erro',
        message: `Não foi possível recuperar o agendamento de id ${id_agendamento} para atualização`,
      });
    } else {
      agendamento.data_hora_agendamento = req.body.data_hora_agendamento;
      agendamento.necessidades_especiais_agendamento =
        req.body.necessidades_especiais_agendamento;
      agendamento.observacoes_agendamento = req.body.observacoes_agendamento;
      agendamento.data_alteracao_agendamento = Date.now();

      agendamento.save((err) => {
        if (err) {
          res.json({
            status: 'erro',
            message: 'Houve um erro ao atualizar o agendamento',
          });
        } else {
          res.json({
            status: 'ok',
            message: `Agendamento ${agendamento.data_hora_agendamento} atualizado com sucesso!`,
            novoAgendamento: agendamento,
          });
        }
      });
    }
  });
};

exports.removerAgendamento = (req, res) => {
  let id_agendamento = req.params.id;

  agendamentosModel.remove(
    {
      _id: id_agendamento,
    },
    (err) => {
      if (err) {
        res.json({
          status: 'erro',
          message: 'Houve um erro ao deletar o agendamento',
        });
      } else {
        res.json({
          status: 'ok',
          message: `Agendamento deletado com sucesso!`,
        });
      }
    }
  );
};
