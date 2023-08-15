import { createPool } from 'mysql';
var database = createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'openbank'
});
export function query(query, args) {
    return new Promise((resolve, reject) => {
        try {
            database.query(query, args, (error, results, fields) => {
                if (error)
                    reject(error);
                resolve(results);
            });
        }
        catch (err) {
            reject(err);
        }
    });
}
//# sourceMappingURL=database.js.map