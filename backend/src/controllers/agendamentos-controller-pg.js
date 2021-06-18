const agendamentoModelPg = require('../models/agendamentos-model-pg');
const PessoaModel = require('../models/pessoas-model-pg');
const UnidadeModel = require('../models/unidades-model-pg');

exports.adicionarAgendamentoPg = async (req, res) => {
  const agendamento = req.body;

  const findPessoa = await PessoaModel.findByPk(agendamento.pessoa_id);
  if (!findPessoa) {
    res.json({
      status: 'erro',
      resultado: 'Pessoa inválida',
    });
  }

  const findUnidade = await UnidadeModel.findByPk(agendamento.unidade_id);
  if (!findUnidade) {
    res.json({
      status: 'erro',
      resultado: 'Unidade inválida',
    });
  }

  const agendamentoInserido = await agendamentoModelPg.create({
    data_hora_agendamento: agendamento.data_hora_agendamento,
    necessidades_especiais_agendamento:
      agendamento.necessidades_especiais_agendamento,
    observacoes_agendamento: agendamento.observacoes_agendamento,
    pessoaId: agendamento.pessoa_id,
    unidadeId: agendamento.unidade_id,
    data_criacao_agendamento: Date(),
    data_alteracao_agendamento: null,
  });
  res.json({
    status: 'ok',
    resultado: agendamentoInserido,
  });
};

exports.listarAgendamentosPg = async (req, res) => {
  try {
    const agendamentos = await agendamentoModelPg.findAll();
    res.json({
      status: 'ok',
      agendamentos: agendamentos,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 'erro',
      message: 'Não foi possível recuperar os agendamentos',
    });
  }
};

exports.listarAgendamentoPorIDPg = async (req, res) => {
  let id_agendamento = req.params.id;

  try {
    const agendamentoEspecifico = await agendamentoModelPg.findByPk(
      id_agendamento
    );
    console.log(agendamentoEspecifico);
    if (agendamentoEspecifico) {
      res.json({
        status: 'ok',
        message: 'Agendamento recuperado com sucesso',
        agendamento: agendamentoEspecifico,
      });
    } else {
      res.json({
        status: 'erro',
        message: `Não encontramos o agendamento de id ${id_agendamento}`,
      });
    }
  } catch (erro) {
    console.log(erro);
    res.json({
      status: 'erro',
      message: `Erro ao recuperar o agendamento de id ${id_agendamento}`,
    });
  }
};

exports.atualizarAgendamentoPg = async (req, res) => {
  let id_agendamento = req.params.id;

  const findPessoa = await PessoaModel.findByPk(req.body.pessoa_id);
  if (!findPessoa) {
    res.json({
      status: 'erro',
      resultado: 'Pessoa inválida',
    });
  }

  const findUnidade = await UnidadeModel.findByPk(req.body.unidade_id);
  if (!findUnidade) {
    res.json({
      status: 'erro',
      resultado: 'Unidade inválida',
    });
  }

  let novoAgendamento = {
    data_hora_agendamento: req.body.data_hora_agendamento,
    necessidades_especiais_agendamento:
      req.body.necessidades_especiais_agendamento,
    observacoes_agendamento: req.body.observacoes_agendamento,
    pessoaId: req.body.pessoa_id,
    unidadeId: req.body.unidade_id,
    data_alteracao_agendamento: new Date(),
  };

  if (id_agendamento) {
    let agendamentoAtualizado = await agendamentoModelPg.update(
      novoAgendamento,
      {
        where: { id: id_agendamento },
      }
    );

    if (agendamentoAtualizado) {
      res.json({
        status: 'ok',
        message: 'Agendamento atualizado com sucesso!',
        novoAgendamento: novoAgendamento,
      });
    } else {
      res.json({
        status: 'erro',
        message: `Erro ao atualizar o agendamento de id ${id_agendamento}`,
      });
    }
  } else {
    console.log('Sem id');
  }
};

exports.removerAgendamentoPg = async (req, res) => {
  let id_agendamento = req.params.id;

  if (id_agendamento) {
    try {
      let agendamentoDeletado = await agendamentoModelPg.destroy({
        where: { id: id_agendamento },
      });
      if (agendamentoDeletado) {
        res.json({
          status: 'ok',
          message: `Agendamento de id ${id_agendamento} deletado com sucesso!`,
        });
      } else {
        res.json({
          status: 'erro',
          message: `Não foi possível deletar o agendamento de id ${id_agendamento}`,
        });
      }
    } catch (erro) {
      res.json({
        status: 'erro',
        message: `Não foi possível deletar o agendamento de id ${id_agendamento}`,
      });
    }
  }
};
