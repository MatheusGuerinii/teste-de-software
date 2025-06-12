
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
    testar("UNIT - Custo mensal com ambos valores zero", () => {
    const custo = calcularCustoMensal(0, 0);
    if (custo !== 0) throw new Error(`Esperado 0, obtido ${custo}`);
  });

  testar("UNIT - Custo mensal com frequência 1", () => {
    const custo = calcularCustoMensal(75, 1);
    if (custo !== 75) throw new Error(`Esperado 75, obtido ${custo}`);
  });

  testar("UNIT - Custo mensal com valor 1 e frequência 10", () => {
    const custo = calcularCustoMensal(1, 10);
    if (custo !== 10) throw new Error(`Esperado 10, obtido ${custo}`);
  });

}
