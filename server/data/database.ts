const mysql = require('mysql')

class database {
    pool: any

    constructor() {
        this.pool = mysql.createPool({
            connectionLimit : 10,
            host     : 'localhost',
            user     : 'root',
            password : 'root',
            database : 'openbank'
        });
    }

    query(queryString: String, options: String[]) {
        return new Promise<any>((res, rej) => {
            this.pool.query(queryString, options, (err, result) => {
                if (err) return rej(err)
                res(result)
            })
        })
    }

    close() {
        this.pool.end()
    }
}

module.exports = database