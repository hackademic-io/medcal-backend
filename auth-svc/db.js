const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  password: 'h@9&fgUzNumpA4p',
  host: 'localhost',
  port: 5432,
  database: 'medical_app',
});

module.exports = pool;
