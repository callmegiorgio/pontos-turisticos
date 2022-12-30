const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const BaseDatabase = require('./base-database');

class SQLiteDatabase extends BaseDatabase {
  constructor(filename) {
    super();

    this.dbPromise = open({
      filename: filename,
      driver: sqlite3.Database
    });
    
    this.dbPromise.then(db => {
      console.log(`Using database '${filename}'`);
    
      db.run(
        `CREATE TABLE IF NOT EXISTS ponto (
          id         INTEGER PRIMARY KEY AUTOINCREMENT,
          nome       VARCHAR(80)         NOT NULL,
          cidade     VARCHAR(80)         NOT NULL,
          estado     CHAR(2)             NOT NULL,
          referencia VARCHAR(80)         NOT NULL,
          descricao  VARCHAR(100)        NOT NULL,
          timestamp  DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`
      ).catch(err => console.log(err));
    });
    
    this.dbPromise.catch(err => console.error(`Could not open database '${filename}'`));
  }

  async criarPontoTuristico(ponto) {
    const sql = 'INSERT INTO ponto (nome, cidade, estado, referencia, descricao) VALUES (?, ?, ?, ?, ?)';
    const params = [ponto.nome, ponto.cidade, ponto.estado, ponto.referencia, ponto.descricao];
  
    const db     = await this.dbPromise;
    const result = await db.run(sql, params);
  
    return result.lastID;
  }
  
  async obterPontosTuristicos() {
    const sql = 'SELECT * FROM ponto ORDER BY timestamp DESC';
  
    const db     = await this.dbPromise;
    const result = await db.all(sql);
  
    return result;
  }
  
  async obterPontosTuristicosPorTermo(termo) {
    const sql = 
      ` SELECT *
          FROM ponto
         WHERE nome LIKE $termo
            OR descricao LIKE $termo
            OR referencia LIKE $termo
      ORDER BY timestamp DESC`;
  
    const db     = await this.dbPromise;
    const result = await db.all(sql, {$termo: '%' + termo + '%'});
  
    return result;
  }
};

module.exports = SQLiteDatabase