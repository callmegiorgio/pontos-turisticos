require('dotenv').config();

const env = process.env;

module.exports = {
    db_file: env.DB_FILE || ':memory:',
    port: env.PORT || 8000
}