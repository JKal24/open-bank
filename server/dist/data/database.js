import * as mysql from 'mysql';
var database = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'openbank'
});
export default database;
//# sourceMappingURL=database.js.map