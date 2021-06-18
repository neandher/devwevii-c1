const unidadeModelPg = require('../models/unidades-model-pg');

exports.adicionarUnidadePg = async (req, res) => {
  const unidade = req.body;

  console.log(unidade);

  const unidadeExiste = await unidadeModelPg.findAll({
    where: {
      email_unidade: unidade.email_unidade,
    },
  });

  console.log(unidadeExiste);
  if (unidadeExiste.length > 0) {
    res.json({
      status: 'fail',
      resultado: 'Já existe um unidade com o e-mail cadastrado',
    });
  } else {
    const unidadeInserido = await unidadeModelPg.create({
      nome_unidade: unidade.nome_unidade,
      email_unidade: unidade.email_unidade,
      descricao_unidade: unidade.descricao_unidade,
      endereco_unidade: unidade.endereco_unidade,
      telefone_unidade: unidade.telefone_unidade,
      latlong_unidade: unidade.latlong_unidade,
      data_criacao_unidade: Date(),
      data_alteracao_unidade: null,
    });
    res.json({
      status: 'ok',
      resultado: unidadeInserido,
    });
  }
};

exports.listarUnidadesPg = async (req, res) => {
  try {
    const unidades = await unidadeModelPg.findAll();
    res.json({
      status: 'ok',
      unidades: unidades,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 'erro',
      message: 'Não foi possível recuperar os unidades',
    });
  }
};

exports.listarUnidadePorIDPg = async (req, res) => {
  let id_unidade = req.params.id;

  try {
    const unidadeEspecifico = await unidadeModelPg.findByPk(id_unidade);
    console.log(unidadeEspecifico);
    if (unidadeEspecifico) {
      res.json({
        status: 'ok',
        message: 'Unidade recuperado com sucesso',
        unidade: unidadeEspecifico,
      });
    } else {
      res.json({
        status: 'erro',
        message: `Não encontramos o unidade de id ${id_unidade}`,
      });
    }
  } catch (erro) {
    console.log(erro);
    res.json({
      status: 'erro',
      message: `Erro ao recuperar o unidade de id ${id_unidade}`,
    });
  }
};

exports.atualizarUnidadePg = async (req, res) => {
  let id_unidade = req.params.id;

  let novoUnidade = {
    nome_unidade: req.body.nome_unidade,
    email_unidade: req.body.email_unidade,
    descricao_unidade: req.body.descricao_unidade,
    endereco_unidade: req.body.endereco_unidade,
    telefone_unidade: req.body.telefone_unidade,
    latlong_unidade: req.body.latlong_unidade,
    data_alteracao_unidade: new Date(),
  };

  if (id_unidade) {
    let unidadeAtualizado = await unidadeModelPg.update(novoUnidade, {
      where: { id: id_unidade },
    });

    if (unidadeAtualizado) {
      res.json({
        status: 'ok',
        message: 'Unidade atualizado com sucesso!',
        novoUnidade: novoUnidade,
      });
    } else {
      res.json({
        status: 'erro',
        message: `Erro ao atualizar o unidade de id ${id_unidade}`,
      });
    }
  } else {
    console.log('Sem id');
  }
};

exports.removerUnidadePg = async (req, res) => {
  let id_unidade = req.params.id;

  if (id_unidade) {
    try {
      let unidadeDeletado = await unidadeModelPg.destroy({
        where: { id: id_unidade },
      });
      if (unidadeDeletado) {
        res.json({
          status: 'ok',
          message: `Unidade de id ${id_unidade} deletado com sucesso!`,
        });
      } else {
        res.json({
          status: 'erro',
          message: `Não foi possível deletar o unidade de id ${id_unidade}`,
        });
      }
    } catch (erro) {
      res.json({
        status: 'erro',
        message: `Não foi possível deletar o unidade de id ${id_unidade}`,
      });
    }
  }
};
