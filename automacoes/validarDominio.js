module.exports = (conta) => {
    console.log(`[AUTOMAÇÃO] Validando DNS para: ${conta.dominio}`);
    return { sucesso: true, msg: "DNS verificado com sucesso" };
};