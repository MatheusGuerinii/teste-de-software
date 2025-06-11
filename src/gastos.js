// Função pura exposta globalmente para testes
window.calcularCustoMensal = function (valor, frequencia) {
  return valor * frequencia;
};

// Estado para armazenar os gastos adicionados
const gastos = [];

// Atualiza a lista de gastos e o total no DOM
function atualizarListaEGastoTotal() {
  const lista = document.getElementById("lista-gastos");
  const totalGeral = document.getElementById("total-geral");

  lista.innerHTML = "";
  let somaTotal = 0;

  gastos.forEach((gasto, index) => {
    const custo = window.calcularCustoMensal(gasto.valor, gasto.frequencia);
    somaTotal += custo;

    const li = document.createElement("li");
    li.textContent = `${gasto.nome} (${gasto.categoria}): R$ ${custo.toFixed(2)}`;

    // Botão excluir
    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.style.marginLeft = "10px";
    btnExcluir.addEventListener("click", () => {
      gastos.splice(index, 1);
      atualizarListaEGastoTotal();
    });

    li.appendChild(btnExcluir);
    lista.appendChild(li);
  });

  totalGeral.textContent = somaTotal.toFixed(2);
}

// Captura do evento submit do formulário
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nomeGasto").value.trim();
  const categoria = document.getElementById("categoria").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const frequencia = parseInt(document.getElementById("frequencia").value);

  // Validação simples
  if (!nome || !categoria || isNaN(valor) || isNaN(frequencia) || valor < 0 || frequencia < 1) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  gastos.push({ nome, categoria, valor, frequencia });

  atualizarListaEGastoTotal();

  e.target.reset();
  // Função para limpar gastos e atualizar a UI — útil para testes
window.limparGastos = function () {
  gastos.length = 0; // limpa o array
  atualizarListaEGastoTotal(); // atualiza a interface (lista e total)
};

});
