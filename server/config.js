require('dotenv').config();

const env = process.env;

function readDatabaseConfig() {
  let db_type = (env.DB_TYPE || '').toLowerCase();
  let db_conn = env.DB_CONN || '';

  switch (db_type) {
    case 'sqlite':
    case 'mssql':
        break;
    
    default:
      if (db_type !== '') {
        console.warn(
          `Environment variable 'DB_TYPE' has invalid value '${env.DB_TYPE}'. ` +
          "Falling back to in-memory SQLite connection."
        );
      }

      db_type = 'sqlite';
      db_conn = ':memory:';
  }

  if (db_conn === '' && db_type == 'sqlite')
    db_conn = ':memory:';

  return {
    type: db_type,
    conn: db_conn
  };
}

module.exports = {
    db: readDatabaseConfig(),
    port: env.PORT || 8000
}