import db from '../data/database.js';

export function addUserDb(email: string, password: string) {
    try {
        return db.query("INSERT INTO users (user_id, email, pass) VALUES (0, ?, ?)", [email, password]);
    } catch (err) {
        
    }
}

export function checkUserExistsDb(id: number) {
    return db.query("SELECT * FROM users WHERE user_id LIKE '?'", [id]);
}