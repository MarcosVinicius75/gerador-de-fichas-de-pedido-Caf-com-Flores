// Aguarda a página carregar completamente antes de rodar as ações
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Gera as outras 9 linhas na tabela de entrada do formulário automaticamente
    const tbodyInput = document.getElementById('tabela-produtos-input');
    for (let i = 2; i <= 10; i++) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="text" class="qtd-in"></td>
            <td><input type="text" class="prod-in"></td>
            <td><input type="text" class="valor-in"></td>
            <td><input type="text" class="total-in"></td>
        `;
        tbodyInput.appendChild(tr);
    }

    // 2. Captura o envio do formulário e redireciona para a função de impressão
    const formulario = document.getElementById('meuFormulario');
    formulario.addEventListener('submit', gerarFicha);
});

// Função principal que recolhe os dados e ativa a janela de impressão
function gerarFicha(event) {
    event.preventDefault(); // Impede o site de recarregar a página

    // 1. Coletando e formatando as datas para o padrão brasileiro (DD/MM/AAAA)
    const dataPedRaw = document.getElementById('input_data_pedido').value;
    const dataEntRaw = document.getElementById('input_data_entrega').value;
    
    const dataPed = dataPedRaw.split('-').reverse().join('/');
    const dataEnt = dataEntRaw.split('-').reverse().join('/');
    
    // 2. Colocando os textos informados nos seus respectivos campos da ficha
    document.getElementById('txt_data_pedido').innerText = "Data do pedido: " + dataPed;
    document.getElementById('txt_data_delivery').innerText = "Data da entrega: " + dataEnt;
    document.getElementById('txt_cliente').innerText = document.getElementById('input_cliente').value;
    document.getElementById('txt_fone').innerText = document.getElementById('input_fone').value;
    document.getElementById('txt_endereco').innerText = document.getElementById('input_endereco').value;
    document.getElementById('txt_total_pedido').innerText = document.getElementById('input_total_pedido').value;
    document.getElementById('txt_anotacoes').innerText = document.getElementById('input_anotacoes').value;

    // 3. Verificando qual método de pagamento foi escolhido para marcar o "X" na ficha
    const pagamento = document.getElementById('input_pagamento').value;
    const opcoesContainer = document.getElementById('opcoes-pagamento-print');
    
    opcoesContainer.innerHTML = `
        <span><span class="coracao">♥</span> ${pagamento === 'Pix' ? '<span class="marcado">Pix [ X ]</span>' : 'Pix'}</span>
        <span><span class="coracao">♥</span> ${pagamento === 'Cartão' ? '<span class="marcado">Cartão [ X ]</span>' : 'Cartão'}</span>
        <span><span class="coracao">♥</span> ${pagamento === 'Dinheiro' ? '<span class="marcado">Dinheiro [ X ]</span>' : 'Dinheiro'}</span>
    `;

    // 4. Transportando a lista de produtos da tela para a tabela da ficha (Exatamente 10 linhas)
    const qtdInputs = document.querySelectorAll('.qtd-in');
    const prodInputs = document.querySelectorAll('.prod-in');
    const valorInputs = document.querySelectorAll('.valor-in');
    const totalInputs = document.querySelectorAll('.total-in');
    
    const tbodyOutput = document.getElementById('tabela-produtos-output');
    tbodyOutput.innerHTML = ""; // Reseta dados de testes anteriores

    for (let i = 0; i < 10; i++) {
        const tr = document.createElement('tr');
        
        const q = qtdInputs[i].value || "";
        const p = prodInputs[i].value || "";
        const v = valorInputs[i].value || "";
        const t = totalInputs[i].value || "";

        tr.innerHTML = `
            <td style="text-align: center;">${q}</td>
            <td>${p}</td>
            <td style="text-align: right;">${v}</td>
            <td style="text-align: right;">${t}</td>
        `;
        tbodyOutput.appendChild(tr);
    }

    // 5. Aciona o comando de impressão ou salvamento em PDF nativo do navegador
    window.print();
}