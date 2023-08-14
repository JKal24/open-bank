import { createPool } from 'mysql';

var database = createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'openbank'
});

export function query<T> (query: string, args: any[]): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        database.query(query, args, (error, results, fields) => {
            if (error) reject(error);
            console.log(results);
            resolve(results);
        })
    })
}