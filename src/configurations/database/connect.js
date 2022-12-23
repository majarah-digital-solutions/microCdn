const mysql = require('mysql2');
const datacenter = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'',
  database: 'majarah_encyclopedia'
});
module.exports = datacenter