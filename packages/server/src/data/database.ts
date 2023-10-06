import { createPool } from 'mysql';

var database = createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'openbank'
});

export function query<T> (query: string, args: any[]): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        try {
            database.query(query, args, (error, results, fields) => {
                if (error) reject(error);
                resolve(results);
            })
        } catch (err) {
            reject(err);
        }
    })
}