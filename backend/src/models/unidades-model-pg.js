const Sequelize = require('../infra/postgres').Sequelize;
const postgres = require('../infra/postgres').sequelize;

const UnidadeModel = postgres.define('unidade', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  nome_unidade: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao_unidade: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  endereco_unidade: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telefone_unidade: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email_unidade: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  latlong_unidade: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  data_criacao_unidade: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  data_alteracao_unidade: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

module.exports = UnidadeModel;
