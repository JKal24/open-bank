const mysql = require('mysql')

var database = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'openbank'
});

module.exports = database