const config         = require('../config');
const SQLiteDatabase = require('./sqlite-database');
const MSSQLDatabase  = require('./mssql-database');

function createDatabase() {
  switch (config.db.type) {
    case 'sqlite':
      return new SQLiteDatabase(config.db.conn);
    
    case 'mssql':
      return new MSSQLDatabase(config.db.conn);
    
    default:
      throw new Error(`Unknown database type '${config.db.type}'`);
  }
}

module.exports = createDatabase();