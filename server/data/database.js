const mysql = require('mysql')

class database {
    constructor() {
        this.pool = mysql.createPool({
            connectionLimit : 10,
            host     : 'localhost:3306',
            user     : 'root',
            password : 'root',
            database : 'openbank'
        });
    }

    async query(queryString, options) {
        await this.pool.query(queryString, options, (err, result) => {
            return result;
        })
    }

    close() {
        this.pool.end()
    }
}

module.exports = database