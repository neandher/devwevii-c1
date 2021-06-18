const pessoaModelPg = require('../models/pessoas-model-pg');
const UnidadeModel = require('../models/unidades-model-pg');

exports.adicionarPessoaPg = async (req, res) => {
  const pessoa = req.body;

  console.log(pessoa);

  const pessoaExiste = await pessoaModelPg.findAll({
    where: {
      email_pessoa: pessoa.email_pessoa,
    },
  });

  console.log(pessoaExiste);
  if (pessoaExiste.length > 0) {
    res.json({
      status: 'fail',
      resultado: 'Já existe um pessoa com o e-mail cadastrado',
    });
  } else {
    const findUnidade = await UnidadeModel.findByPk(pessoa.unidade_id);
    if (!findUnidade) {
      res.json({
        status: 'erro',
        resultado: 'Unidade inválida',
      });
      return;
    }

    const pessoaInserido = await pessoaModelPg.create({
      unidadeId: pessoa.unidade_id,
      nome_pessoa: pessoa.nome_pessoa,
      data_nascimento_pessoa: pessoa.data_nascimento_pessoa,
      email_pessoa: pessoa.email_pessoa,
      cpf_pessoa: pessoa.cpf_pessoa,
      endereco_pessoa: pessoa.endereco_pessoa,
      telefone_pessoa: pessoa.telefone_pessoa,
      grupo_prioritario_pessoa: pessoa.grupo_prioritario_pessoa,
      data_criacao_pessoa: Date(),
      data_alteracao_pessoa: null,
    });
    res.json({
      status: 'ok',
      resultado: pessoaInserido,
    });
  }
};

exports.listarPessoasPg = async (req, res) => {
  try {
    const pessoas = await pessoaModelPg.findAll();
    res.json({
      status: 'ok',
      pessoas: pessoas,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 'erro',
      message: 'Não foi possível recuperar os pessoas',
    });
  }
};

exports.listarPessoaPorIDPg = async (req, res) => {
  let id_pessoa = req.params.id;

  try {
    const pessoaEspecifico = await pessoaModelPg.findByPk(id_pessoa);
    console.log(pessoaEspecifico);
    if (pessoaEspecifico) {
      res.json({
        status: 'ok',
        message: 'Pessoa recuperado com sucesso',
        pessoa: pessoaEspecifico,
      });
    } else {
      res.json({
        status: 'erro',
        message: `Não encontramos o pessoa de id ${id_pessoa}`,
      });
    }
  } catch (erro) {
    console.log(erro);
    res.json({
      status: 'erro',
      message: `Erro ao recuperar o pessoa de id ${id_pessoa}`,
    });
  }
};

exports.atualizarPessoaPg = async (req, res) => {
  let id_pessoa = req.params.id;

  const findUnidade = await UnidadeModel.findByPk(req.body.unidade_id);
  if (!findUnidade) {
    res.json({
      status: 'erro',
      resultado: 'Unidade inválida',
    });
  }

  let novoPessoa = {
    unidadeId: findUnidade,
    nome_pessoa: req.body.nome_pessoa,
    data_nascimento_pessoa: req.body.data_nascimento_pessoa,
    email_pessoa: req.body.email_pessoa,
    cpf_pessoa: req.body.cpf_pessoa,
    endereco_pessoa: req.body.endereco_pessoa,
    telefone_pessoa: req.body.telefone_pessoa,
    grupo_prioritario_pessoa: req.body.grupo_prioritario_pessoa,
    data_alteracao_pessoa: new Date(),
  };

  if (id_pessoa) {
    let pessoaAtualizado = await pessoaModelPg.update(novoPessoa, {
      where: { id: id_pessoa },
    });

    if (pessoaAtualizado) {
      res.json({
        status: 'ok',
        message: 'Pessoa atualizado com sucesso!',
        novoPessoa: novoPessoa,
      });
    } else {
      res.json({
        status: 'erro',
        message: `Erro ao atualizar o pessoa de id ${id_pessoa}`,
      });
    }
  } else {
    console.log('Sem id');
  }
};

exports.removerPessoaPg = async (req, res) => {
  let id_pessoa = req.params.id;

  if (id_pessoa) {
    try {
      let pessoaDeletado = await pessoaModelPg.destroy({
        where: { id: id_pessoa },
      });
      if (pessoaDeletado) {
        res.json({
          status: 'ok',
          message: `Pessoa de id ${id_pessoa} deletado com sucesso!`,
        });
      } else {
        res.json({
          status: 'erro',
          message: `Não foi possível deletar o pessoa de id ${id_pessoa}`,
        });
      }
    } catch (erro) {
      res.json({
        status: 'erro',
        message: `Não foi possível deletar o pessoa de id ${id_pessoa}`,
      });
    }
  }
};
