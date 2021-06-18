const unidadesModel = require('../models/unidades-model');
const mongodb = require('../infra/mongodb');

exports.adicionarUnidade = (req, res) => {
  unidadesModel.find((err, unidades) => {
    if (err) {
      console.log('Não foi possível recuperar os unidades!');
      res.json({
        status: 'erro',
        message:
          'Não foi possível recuperar os unidades e portanto inserir o novo unidade!',
      });
    }
    //Eu tenho a lista dos unidades

    for (let i = 0; i < unidades.length; i++) {
      if (req.body.email_unidade === unidades[i].email_unidade) {
        res.json({
          status: 'erro',
          message: `O unidade ${req.body.nome_unidade} já está cadastrado com o e-mail ${req.body.email_unidade}`,
        });
        return;
      }
    }

    let unidade = new unidadesModel();
    unidade.nome_unidade = req.body.nome_unidade;
    unidade.descricao_unidade = req.body.descricao_unidade;
    unidade.endereco_unidade = req.body.endereco_unidade;
    unidade.telefone_unidade = req.body.telefone_unidade;
    unidade.email_unidade = req.body.email_unidade;
    unidade.latlong_unidade = req.body.latlong_unidade;    

    unidade.save((erro) => {
      if (erro) {
        res.send({
          status: 'erro',
          message: 'Não foi possível inserir o unidade.',
        });
      } else {
        res.send({
          status: 'ok',
          message: `Unidade ${req.body.nome_unidade} inserido com sucesso!`,
        });
      }
    });
  });
};

exports.listarUnidades = (req, res) => {
  unidadesModel.find(function (err, unidades) {
    if (err) {
      console.log('Não foi possível recuperar os unidades!');
      res.json({
        status: 'erro',
        message: 'Não foi possível recuperar os unidades!',
      });
    } else {
      res.json({
        status: 'ok',
        unidades: unidades,
      });
    }
  });
};

exports.listarUnidadePorID = (req, res) => {
  let id_unidade = req.params.id;

  unidadesModel.findById(id_unidade, function (err, unidade) {
    if (err || !unidade) {
      console.log(`Não foi possivel recuperar o unidade de id: ${id_unidade}`);
      res.json({
        status: 'erro',
        message: `Não foi possivel recuperar o unidade de id: ${id_unidade}`,
      });
    } else {
      res.json({
        status: 'ok',
        unidade: unidade,
      });
    }
  });
};

exports.atualizarUnidade = (req, res) => {
  let id_unidade = req.params.id;

  unidadesModel.findById(id_unidade, (erro, unidade) => {
    if (erro || !unidade) {
      console.log('Não foi possível recuperar os unidade!');
      res.json({
        status: 'erro',
        message: `Não foi possível recuperar o unidade de id ${id_unidade} para atualização`,
      });
    } else {
      unidade.nome_unidade = req.body.nome_unidade;
      unidade.descricao_unidade = req.body.descricao_unidade;
      unidade.endereco_unidade = req.body.endereco_unidade;
      unidade.telefone_unidade = req.body.telefone_unidade;
      unidade.email_unidade = req.body.email_unidade;
      unidade.latlong_unidade = req.body.latlong_unidade;
      unidade.data_alteracao_unidade = Date.now();

      unidade.save((err) => {
        if (err) {
          res.json({
            status: 'erro',
            message: 'Houve um erro ao atualizar o unidade',
          });
        } else {
          res.json({
            status: 'ok',
            message: `Unidade ${unidade.nome_unidade} atualizado com sucesso!`,
            novoUnidade: unidade,
          });
        }
      });
    }
  });
};

exports.removerUnidade = (req, res) => {
  let id_unidade = req.params.id;

  unidadesModel.remove(
    {
      _id: id_unidade,
    },
    (err) => {
      if (err) {
        res.json({
          status: 'erro',
          message: 'Houve um erro ao deletar o unidade',
        });
      } else {
        res.json({
          status: 'ok',
          message: `Unidade deletado com sucesso!`,
        });
      }
    }
  );
};
