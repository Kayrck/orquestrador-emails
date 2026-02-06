module.exports = (id) => {
    console.log(`[AUTOMAÇÃO] Ativando Cooldown para conta ID: ${id}`);
    // Aqui faria um UPDATE no banco para status = 'Pausa'
    return { sucesso: true, msg: "Conta em modo de espera por 24h" };
};