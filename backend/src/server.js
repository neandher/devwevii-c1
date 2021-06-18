  
require('dotenv').config({
  path: process.env.NODE_ENV === "development" ? ".env.development" : ".env"
});

console.log(process.env.NODE_ENV);

const express = require('express');
const { sync } = require('./infra/postgres');
const app = express();

const port = process.env.APP_PORT;
const hostname = process.env.APP_HOSTNAME;

(async () => await sync())();

const pessoasRoutes = require('./routes/pessoas-routes');
const pessoasRoutesPg = require('./routes/pessoas-routes-pg');
const unidadesRoutes = require('./routes/unidades-routes');
const unidadesRoutesPg = require('./routes/unidades-routes-pg');
const agendamentosRoutes = require('./routes/agendamentos-routes');
const agendamentosRoutesPg = require('./routes/agendamentos-routes-pg');
const defaultRoutes = require('./routes/default-routes');

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get('/', defaultRoutes);
app.use('/api/pessoas/', pessoasRoutes);
app.use('/api/pessoas-pg/', pessoasRoutesPg);
app.use('/api/unidades/', unidadesRoutes);
app.use('/api/unidades-pg/', unidadesRoutesPg);
app.use('/api/agendamentos/', agendamentosRoutes);
app.use('/api/agendamentos-pg/', agendamentosRoutesPg);

app.listen(port, hostname, () => {
  console.log(`Servidor rodando no endereço: http://${hostname}:${port}`);
});
