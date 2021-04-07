const mongoose = require('mongoose');

const pessoaSchema = mongoose.Schema({
  id_unidade: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  nome_pessoa: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  cpf_pessoa: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  data_nascimento_pessoa: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
  telefone_pessoa: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  grupo_prioritario_pessoa: {
    type: mongoose.Schema.Types.Boolean,
    required: true,
    default: false,
  },
  endereco_pessoa: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  email_pessoa: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  data_criacao_pessoa: {
    type: mongoose.Schema.Types.Date,
    default: Date.now,
  },
  data_alteracao_pessoa: {
    type: mongoose.Schema.Types.Date,
    default: null,
  },
});

let Pessoa = (module.exports = mongoose.model('pessoa', pessoaSchema));

module.exports.get = function (callback, limit) {
  Pessoa.find(callback).limit(limit);
};
