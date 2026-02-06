const axios = require('axios');
const db = require('../banco/conexao');
const winston = require('winston');

// Configuração de Log
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/monitoramento.log' })
    ]
});

async function iniciarMonitoramento() {
    try {
        logger.info("Iniciando varredura de contas...");
        const resposta = await axios.get('http://localhost:3001/contas_externas');
        const contas = resposta.data;

        contas.forEach(conta => {
            let status = (conta.dns_ok && conta.reputation > 50) ? 'Ativo' : 'Alerta';
            
            // Atualiza ou Insere no SQLite
            db.run(`INSERT INTO contas (id, dominio, status, reputacao, ultima_atualizacao) 
                    VALUES (?, ?, ?, ?, ?)
                    ON CONFLICT(id) DO UPDATE SET 
                    status=excluded.status, 
                    reputacao=excluded.reputacao, 
                    ultima_atualizacao=excluded.ultima_atualizacao`,
            [conta.id, conta.dominio, status, conta.reputation, new Date().toISOString()]);
            
            logger.info(`Conta ${conta.dominio} processada. Status: ${status}`);
        });
    } catch ( erro ) {
        logger.error("Erro no monitoramento: " + erro.message);
    }
}

module.exports = { iniciarMonitoramento };