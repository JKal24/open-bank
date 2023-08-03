import { createPool } from 'mysql';
var database = createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'openbank'
});
export default database;
//# sourceMappingURL=database.js.map