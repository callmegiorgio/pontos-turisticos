class BaseDatabase {
  constructor() {
    if (this.constructor == BaseDatabase) {
      throw new Error("BaseDatabase can't be instantiated.");
    }
  }

  async criarPontoTuristico(ponto) {
    throw new Error("Method 'criarPontoTuristico()' must be implemented.");
  }
  
  async obterPontosTuristicos() {
    throw new Error("Method 'obterPontosTuristicos()' must be implemented.");
  }
  
  async obterPontosTuristicosPorTermo(termo) {
    throw new Error("Method 'obterPontosTuristicosPorTermo()' must be implemented.");
  }
};

module.exports = BaseDatabase;