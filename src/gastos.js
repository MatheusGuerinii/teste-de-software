
window.calcularCustoMensal = function (valor, frequencia) {
  return valor * frequencia;
};

const gastos = [];

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

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nomeGasto").value.trim();
  const categoria = document.getElementById("categoria").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const frequencia = parseInt(document.getElementById("frequencia").value);

  if (!nome || !categoria || isNaN(valor) || isNaN(frequencia) || valor < 0 || frequencia < 1) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  gastos.push({ nome, categoria, valor, frequencia });

  atualizarListaEGastoTotal();

  e.target.reset();
window.limparGastos = function () {
  gastos.length = 0; 
  atualizarListaEGastoTotal();
};

});
