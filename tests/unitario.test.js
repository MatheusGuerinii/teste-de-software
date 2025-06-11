// Função que roda todos os testes unitários
function runUnitTests() {
  testar("UNIT - Custo mensal simples", () => {
    const custo = calcularCustoMensal(100, 2);
    if (custo !== 200) throw new Error(`Esperado 200, obtido ${custo}`);
  });

  testar("UNIT - Custo mensal com zero frequência", () => {
    const custo = calcularCustoMensal(50, 0);
    if (custo !== 0) throw new Error(`Esperado 0, obtido ${custo}`);
  });

  testar("UNIT - Custo mensal com valores decimais", () => {
    const custo = calcularCustoMensal(19.99, 3);
    if (custo !== 59.97) throw new Error(`Esperado 59.97, obtido ${custo}`);
  });

  testar("UNIT - Custo mensal com zero valor", () => {
    const custo = calcularCustoMensal(0, 10);
    if (custo !== 0) throw new Error(`Esperado 0, obtido ${custo}`);
  });

  testar("UNIT - Custo mensal com valor negativo (deve calcular normalmente)", () => {
    const custo = calcularCustoMensal(-20, 3);
    if (custo !== -60) throw new Error(`Esperado -60, obtido ${custo}`);
  });
}
