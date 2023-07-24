import db from '../data/database.js';

export async function addUser(req, res) {
    await db.query("INSERT INTO users (user_id, email, pass) VALUES (0, ?, ?)", [req.params.email, req.params.pass]);
}

export async function checkUserExists(req, res) {
    const dbResponse = await db.query('')
}