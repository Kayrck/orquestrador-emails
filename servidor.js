const express = require('express');
const cors = require('cors');
const rotasContas = require('./rotas/contas');
const configurarAgendador = require('./scheduler/cron');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/contas', rotasContas);

// Iniciar Scheduler
configurarAgendador();

const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`=========================================`);
    console.log(`ORQUESTRADOR EAO RODANDO NA PORTA ${PORTA}`);
    console.log(`=========================================`);
});