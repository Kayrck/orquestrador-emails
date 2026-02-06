const express = require('express');
const router = express.Router();
const db = require('../banco/conexao');
const validarDominio = require('../automacoes/validarDominio');

// Listar todas as contas do banco
router.get('/', (req, res) => {
    db.all("SELECT * FROM contas", [], (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(rows);
    });
});

// Forçar validação de uma conta
router.post('/:id/validar', (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM contas WHERE id = ?", [id], (err, conta) => {
        if (!conta) return res.status(404).json({ erro: "Conta não encontrada" });
        const resultado = validarDominio(conta);
        res.json({ mensagem: "Processo disparado", resultado });
    });
});

module.exports = router;