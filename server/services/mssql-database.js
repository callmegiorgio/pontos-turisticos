const fs           = require('fs');
const path         = require('path');
const sql          = require('mssql/msnodesqlv8');
const BaseDatabase = require('./base-database');

const MSSQL_SCRIPT = fs.readFileSync(path.resolve(__dirname, 'mssql-script.sql'), 'utf8');

class MSSQLDatabase extends BaseDatabase {
  constructor(connectionString) {
    super();

    this.poolPromise = sql.connect({
      connectionString: connectionString,
      connectionTimeout: 30000
    });

    this.poolPromise.then(pool => {
      console.log('Connected to MSSQL database');

      /**
       * O pacote `mssql` não processa a palavra-chave `GO`, já que ela não é parte do
       * T-SQL e sim interpretada pelas ferramentas do SQL Server. Assim, é necessário
       * dividir os lotes ("batches") contidos no arquivo `MSSQL_SCRIPT` tal que cada
       * `GO` defina o fim de um lote.
       */
      for (const script of MSSQL_SCRIPT.split('GO')) {
        if (script !== '')
          pool.request().batch(script);
      }
    });

    this.poolPromise.catch(err => console.log('Could not connect to MSSQL database', err));
  }

  async criarPontoTuristico(ponto) {
    const pool   = await this.poolPromise;
    const result = await (
      pool.request()
          .input('nome',       sql.VarChar(80),  ponto.nome)
          .input('cidade',     sql.VarChar(80),  ponto.cidade)
          .input('estado',     sql.Char(2),      ponto.estado)
          .input('referencia', sql.VarChar(80),  ponto.referencia)
          .input('descricao',  sql.VarChar(100), ponto.descricao)
          .output('ponto_id',  sql.Int)
          .execute('dbo.SP_InserirPonto')
    );
  
    return result.output['ponto_id'];
  }
  
  async obterPontosTuristicos() {
    const command = 'SELECT * FROM dbo.FN_ObterPontos(@termo) ORDER BY timestamp DESC';
  
    const pool = await this.poolPromise;

    const result = await (
      pool.request()
          .input('termo', sql.VarChar, '%')
          .query(command)
    );
  
    return result.recordset;
  }
  
  async obterPontosTuristicosPorTermo(termo) {
    if (termo === '')
      return [];

    const command = 'SELECT * FROM dbo.FN_ObterPontos(@termo) ORDER BY timestamp DESC';
  
    const pool   = await this.poolPromise;
    const result = await (
      pool.request()
          .input('termo', sql.VarChar, '%' + termo + '%')
          .query(command)
    );
  
    return result.recordset;
  }
};

module.exports = MSSQLDatabase;