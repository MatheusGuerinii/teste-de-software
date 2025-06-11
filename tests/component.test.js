function runComponentTests() {
  // Limpa o estado para não acumular gastos de testes anteriores
  if (typeof window.limparGastos === "function") {
    window.limparGastos();
  }

  // ... seus testes aqui


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

  testar("COMPONENT - Submissão do formulário adiciona gasto e limpa campos", () => {
    const form = document.getElementById("form");
    const nome = document.getElementById("nomeGasto");
    const categoria = document.getElementById("categoria");
    const valor = document.getElementById("valor");
    const frequencia = document.getElementById("frequencia");
    const lista = document.getElementById("lista-gastos");
    const totalGeral = document.getElementById("total-geral");

    // Preenche inputs
    nome.value = "Academia";
    categoria.value = "Saúde";
    valor.value = "100";
    frequencia.value = "3";

    // Cria e dispara submit
    const evento = new Event("submit", { bubbles: true, cancelable: true });
    let submitChamado = false;

    // Intercepta submit para impedir recarregamento e confirmar execução
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      submitChamado = true;
    }, { once: true });

    form.dispatchEvent(evento);

    if (!submitChamado) throw new Error("Evento de submit não foi chamado");

    // Verifica se o gasto foi adicionado na lista
    const encontrado = Array.from(lista.children).some(li =>
      li.textContent.includes("Academia") && li.textContent.includes("Saúde") && li.textContent.includes("300.00")
    );
    if (!encontrado) throw new Error("Gasto não adicionado corretamente à lista");

    // Verifica se total geral foi atualizado corretamente
    if (totalGeral.textContent !== "300.00") {
      throw new Error(`Total geral esperado 300.00, obtido ${totalGeral.textContent}`);
    }

    // Verifica se os campos foram limpos
    if (nome.value !== "" || categoria.value !== "" || valor.value !== "" || frequencia.value !== "") {
      throw new Error("Campos do formulário não foram limpos após submissão");
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
  // Adiciona gasto para excluir
  const gastosLengthAntes = gastos.length;
  gastos.push({ nome: "Teste Excluir", categoria: "Lazer", valor: 50, frequencia: 2 });
  atualizarListaEGastoTotal();

  // Encontra botão excluir e clica
  const lista = document.getElementById("lista-gastos");
  const btnExcluir = lista.querySelector("li:last-child button");
  btnExcluir.click();

  if (gastos.length !== gastosLengthAntes) {
    throw new Error("Gasto não foi excluído da lista");
  }
});

}
