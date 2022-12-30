const { db_file }    = require('../config');
const SQLiteDatabase = require('./sqlite-database');

const db = new SQLiteDatabase(db_file);

module.exports = db;