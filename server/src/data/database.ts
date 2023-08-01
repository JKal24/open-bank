import * as mysql from 'mysql';

var database = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'openbank'
});

export default database;