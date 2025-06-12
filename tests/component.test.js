function runComponentTests() {

  if (typeof window.limparGastos === "function") {
    window.limparGastos();
  }
  testar("COMPONENT - Formulário deve estar presente na página", () => {
    const form = document.getElementById("form");
    if (!form) throw new Error("Formulário não encontrado");
  });

  testar("COMPONENT - Inputs devem existir e aceitar valores", () => {
    const nome = document.getElementById("nomeGasto");
    const categoria = document.getElementById("categoria");
    const valor = document.getElementById("valor");
    const frequencia = document.getElementById("frequencia");

    nome.value = "Internet";
    categoria.value = "Serviços";
    valor.value = "120.50";
    frequencia.value = "2";

    if (
      nome.value !== "Internet" ||
      categoria.value !== "Serviços" ||
      valor.value !== "120.50" ||
      frequencia.value !== "2"
    ) {
      throw new Error("Inputs não aceitaram valores corretamente");
    }
  });

  testar("COMPONENT - Deve adicionar gasto e exibir corretamente", () => {
  const nomeInput = document.getElementById("nomeGasto");
  const categoriaSelect = document.getElementById("categoria");
  const valorInput = document.getElementById("valor");
  const frequenciaInput = document.getElementById("frequencia");
  const form = document.getElementById("form");

  nomeInput.value = "Internet";
  categoriaSelect.value = "Outros";
  valorInput.value = "100";
  frequenciaInput.value = "1";

  form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

  const lista = document.getElementById("lista-gastos");
  if (!lista.textContent.includes("Internet (Outros): R$ 100.00")) {
    throw new Error("Gasto Internet não foi adicionado corretamente");
  }
});

testar("COMPONENT - Botão excluir remove gasto da lista", () => {
  const gastosLengthAntes = gastos.length;
  gastos.push({ nome: "Teste Excluir", categoria: "Lazer", valor: 50, frequencia: 2 });
  atualizarListaEGastoTotal();

  const lista = document.getElementById("lista-gastos");
  const btnExcluir = lista.querySelector("li:last-child button");
  btnExcluir.click();

  if (gastos.length !== gastosLengthAntes) {
    throw new Error("Gasto não foi excluído da lista");
  }
});

}
  