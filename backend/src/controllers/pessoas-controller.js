const pessoasModel = require('../models/pessoas-model');
const mongodb = require('../infra/mongodb');

exports.adicionarPessoa = (req, res) => {
  pessoasModel.find((err, pessoas) => {
    if (err) {
      console.log('Não foi possível recuperar os pessoas!');
      res.json({
        status: 'erro',
        message:
          'Não foi possível recuperar os pessoas e portanto inserir o novo pessoa!',
      });
    }
    //Eu tenho a lista dos pessoas

    for (let i = 0; i < pessoas.length; i++) {
      if (req.body.email_pessoa === pessoas[i].email_pessoa) {
        res.json({
          status: 'erro',
          message: `O pessoa ${req.body.nome_pessoa} já está cadastrado com o e-mail ${req.body.email_pessoa}`,
        });
        return;
      }
    }    

    let pessoa = new pessoasModel();    
    pessoa.nome_pessoa = req.body.nome_pessoa;
    pessoa.cpf_pessoa = req.body.cpf_pessoa;
    pessoa.data_nascimento_pessoa = req.body.data_nascimento_pessoa;
    pessoa.telefone_pessoa = req.body.telefone_pessoa;
    pessoa.grupo_prioritario_pessoa = req.body.grupo_prioritario_pessoa;
    pessoa.endereco_pessoa = req.body.endereco_pessoa;
    pessoa.email_pessoa = req.body.email_pessoa;

    pessoa.save((erro) => {
      if (erro) {
        res.send({
          status: 'erro',
          message: 'Não foi possível inserir o pessoa.',
        });
      } else {
        res.send({
          status: 'ok',
          message: `Pessoa ${req.body.nome_pessoa} inserido com sucesso!`,
        });
      }
    });
  });
};

exports.listarPessoas = (req, res) => {
  pessoasModel.find(function (err, pessoas) {
    if (err) {
      console.log('Não foi possível recuperar os pessoas!');
      res.json({
        status: 'erro',
        message: 'Não foi possível recuperar os pessoas!',
      });
    } else {
      res.json({
        status: 'ok',
        pessoas: pessoas,
      });
    }
  });
};

exports.listarPessoaPorID = (req, res) => {
  let id_pessoa = req.params.id;

  pessoasModel.findById(id_pessoa, function (err, pessoa) {
    if (err || !pessoa) {
      console.log(`Não foi possivel recuperar o pessoa de id: ${id_pessoa}`);
      res.json({
        status: 'erro',
        message: `Não foi possivel recuperar o pessoa de id: ${id_pessoa}`,
      });
    } else {
      res.json({
        status: 'ok',
        pessoa: pessoa,
      });
    }
  });
};

exports.atualizarPessoa = (req, res) => {
  let id_pessoa = req.params.id;

  pessoasModel.findById(id_pessoa, (erro, pessoa) => {
    if (erro || !pessoa) {
      console.log('Não foi possível recuperar os pessoa!');
      res.json({
        status: 'erro',
        message: `Não foi possível recuperar o pessoa de id ${id_pessoa} para atualização`,
      });
    } else {
      pessoa.nome_pessoa = req.body.nome_pessoa;
      pessoa.cpf_pessoa = req.body.cpf_pessoa;
      pessoa.data_nascimento_pessoa = req.body.data_nascimento_pessoa;
      pessoa.telefone_pessoa = req.body.telefone_pessoa;
      pessoa.grupo_prioritario_pessoa = req.body.grupo_prioritario_pessoa;
      pessoa.endereco_pessoa = req.body.endereco_pessoa;
      pessoa.email_pessoa = req.body.email_pessoa;
      pessoa.data_alteracao_pessoa = Date.now();

      pessoa.save((err) => {
        if (err) {
          res.json({
            status: 'erro',
            message: 'Houve um erro ao atualizar o pessoa',
          });
        } else {
          res.json({
            status: 'ok',
            message: `Pessoa ${pessoa.nome_pessoa} atualizado com sucesso!`,
            novoPessoa: pessoa,
          });
        }
      });
    }
  });
};

exports.removerPessoa = (req, res) => {
  let id_pessoa = req.params.id;

  pessoasModel.remove(
    {
      _id: id_pessoa,
    },
    (err) => {
      if (err) {
        res.json({
          status: 'erro',
          message: 'Houve um erro ao deletar o pessoa',
        });
      } else {
        res.json({
          status: 'ok',
          message: `Pessoa deletado com sucesso!`,
        });
      }
    }
  );
};
