const Sequelize = require('../infra/postgres').Sequelize;
const postgres = require('../infra/postgres').sequelize;
const UnidadeModel = require('./unidades-model-pg');
const PessoaModel = require('./pessoas-model-pg');

const AgendamentoModel = postgres.define('agendamento', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  data_hora_agendamento: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  necessidades_especiais_agendamento: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  observacoes_agendamento: {
    type: Sequelize.STRING,
    allowNull: false,
  },  
  data_criacao_agendamento: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  data_alteracao_agendamento: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

AgendamentoModel.belongsTo(UnidadeModel);
AgendamentoModel.belongsTo(PessoaModel);

module.exports = AgendamentoModel;
