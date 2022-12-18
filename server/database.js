const sqlite3 = require('sqlite3').verbose();

const DB_FILE = process.env.DB_FILE || ':memory:';

const db = new sqlite3.Database(DB_FILE, (error) => {
    if (error)
        console.log(error);
    else
        console.log(`Using database '${DB_FILE}'`);
});

db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS ponto (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            nome       VARCHAR(80)         NOT NULL,
            cidade     VARCHAR(80)         NOT NULL,
            estado     CHAR(2)             NOT NULL,
            referencia VARCHAR(80)         NOT NULL,
            descricao  VARCHAR(100)        NOT NULL,
            timestamp  DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`,
        (error) => {
            if (error) console.log(error);
        }
    );
});

function criarPontoTuristico({nome, cidade, estado, referencia, descricao}, callback) {
    const sql = 'INSERT INTO ponto (nome, cidade, estado, referencia, descricao) VALUES (?, ?, ?, ?, ?)';
    const params = [nome, cidade, estado, referencia, descricao];

    db.run(sql, params, function(error, result) {
        if (error)
            callback(error, null);
        else
            callback(error, this.lastID);
    });
}

function obterPontosTuristicos(termo, callback) {
    const sql = 
        ` SELECT *
            FROM ponto
           WHERE nome LIKE $termo
              OR descricao LIKE $termo
              OR referencia LIKE $termo
        ORDER BY timestamp DESC`;

    db.all(sql, {$termo: '%' + termo + '%'}, callback);
}

module.exports = {
    criarPontoTuristico,
    obterPontosTuristicos
};