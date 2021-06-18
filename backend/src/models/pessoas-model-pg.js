const Sequelize = require('../infra/postgres').Sequelize;
const postgres = require('../infra/postgres').sequelize;
const UnidadeModel = require('./unidades-model-pg');

const PessoaModel = postgres.define('pessoa', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome_pessoa: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cpf_pessoa: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  data_nascimento_pessoa: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  endereco_pessoa: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telefone_pessoa: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email_pessoa: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  grupo_prioritario_pessoa: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  data_criacao_pessoa: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  data_alteracao_pessoa: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

PessoaModel.belongsTo(UnidadeModel);

module.exports = PessoaModel;
