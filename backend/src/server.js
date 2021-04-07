const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');

const port = 3000;
const hostname = 'localhost';

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const pessoasRoutes = require('./routes/pessoas-routes');
app.use('/api/pessoas/', pessoasRoutes);

const unidadesRoutes = require('./routes/unidades-routes');
app.use('/api/unidades/', unidadesRoutes);

const agendamentosRoutes = require('./routes/agendamentos-routes');
app.use('/api/agendamentos/', agendamentosRoutes);

mongoose.connect(
  'mongodb://root:faesa123@localhost:27017/devwebII?authSource=admin',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no Mongo'));
db.once('open', function () {
  console.log('Banco de Dados Mongo conectado com sucesso');
});

app.get('/', function (req, res) {
  res.json({
    status: 'ok',
    message: 'Servidor rodando perfeitamente',
  });
});

app.listen(port, hostname, () => {
  console.log(`Servidor rodando no endereço: https://${hostname}:${port}`);
});
