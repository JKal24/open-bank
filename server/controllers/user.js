import { query } from '../data/database'

module.exports = {
    async addUser(req, res) {
        await query('INSERT INTO users (user_id email pass) VALUES (0 ? ?)', [req.params.email, req.params.pass]);
    },

    async checkUserExists(req, res) {
        const dbResponse = await query('')
    }
}