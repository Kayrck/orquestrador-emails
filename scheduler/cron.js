const cron = require('node-cron');
const { iniciarMonitoramento } = require('../monitores/monitorContas');

function configurarAgendador() {
    // Roda a cada 2 minutos
    cron.schedule('*/2 * * * *', () => {
        console.log("--- Executando tarefa agendada ---");
        iniciarMonitoramento();
    });
}

module.exports = configurarAgendador;