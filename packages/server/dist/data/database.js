import { createPool } from 'mysql';
var database = createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'openbank'
});
export function query(query, args) {
    return new Promise((resolve, reject) => {
        database.query(query, args, (error, results, fields) => {
            if (error)
                reject(error);
            console.log(results);
            resolve(results);
        });
    });
}
//# sourceMappingURL=database.js.map