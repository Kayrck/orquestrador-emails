const API_URL = 'http://localhost:3000/api/contas';

// Carrega dados ao iniciar
document.addEventListener('DOMContentLoaded', carregarDados);

async function carregarDados() {
    try {
        const res = await fetch(API_URL);
        const contas = await res.json();
        atualizarDashboard(contas);
        renderizarTabela(contas);
    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
    }
}

function atualizarDashboard(contas) {
    document.getElementById('total-contas').innerText = contas.length;
    
    // Calcula média de reputação
    const media = contas.reduce((acc, c) => acc + c.reputacao, 0) / contas.length || 0;
    document.getElementById('media-reputacao').innerText = media.toFixed(0);

    // Conta alertas
    const alertas = contas.filter(c => c.status === 'Alerta').length;
    document.getElementById('total-alerta').innerText = alertas;
}

function renderizarTabela(contas) {
    const tbody = document.getElementById('tabela-corpo');
    tbody.innerHTML = ''; // Limpa tabela

    contas.forEach(conta => {
        const tr = document.createElement('tr');
        
        // Formata data
        const data = new Date(conta.ultima_atualizacao).toLocaleString();
        
        // Define classe do status
        const classeStatus = conta.status === 'Ativo' ? 'ativo' : 'alerta';

        tr.innerHTML = `
            <td>#${conta.id}</td>
            <td><strong>${conta.dominio}</strong></td>
            <td><span class="badge ${classeStatus}">${conta.status}</span></td>
            <td>${conta.reputacao}</td>
            <td style="font-size: 0.85rem; color: #94a3b8;">${data}</td>
            <td>
                <button class="btn-action" onclick="validarConta(${conta.id})">Validar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function validarConta(id) {
    try {
        showToast("Iniciando validação...");
        const res = await fetch(`${API_URL}/${id}/validar`, { method: 'POST' });
        const dados = await res.json();
        
        if (dados.mensagem) {
            showToast(`✅ ${dados.resultado.msg}`);
            // Recarrega a tabela após validar para atualizar logs ou status
            setTimeout(carregarDados, 1000);
        }
    } catch (erro) {
        showToast("❌ Erro ao validar");
    }
}

function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.className = "toast show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}