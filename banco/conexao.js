const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'dados.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error("Erro ao abrir banco:", err.message);
    else console.log("Conectado ao SQLite.");
});

// Criar tabela se não existir
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS contas (
        id INTEGER PRIMARY KEY,
        dominio TEXT,
        status TEXT,
        reputacao INTEGER,
        ultima_atualizacao TEXT
    )`);
});

module.exports = db;