const mysql = require('mysql')

class database {
    constructor() {
        this.pool = mysql.createPool({
            connectionLimit : 10,
            host     : 'localhost',
            user     : 'root',
            password : 'root',
            database : 'openbank'
        });
    }

    query(queryString, options) {
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