const Pool = require('pg').Pool
const pool = new Pool({
  user: 'keyin',
  host: 'localhost',
  database: 'dvd-rental',
  password: 'keyin2024',
  port: 5432,
});
module.exports = pool;