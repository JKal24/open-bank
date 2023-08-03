import db from '../data/database.js';
export function addUserDb(email, password) {
    try {
        return db.query("INSERT INTO users (user_id, email, pass) VALUES (0, ?, ?)", [email, password]);
    }
    catch (err) {
        console.log(err);
    }
}
export function checkUserExistsDb(id) {
    return db.query("SELECT * FROM users WHERE user_id LIKE '?'", [id]);
}
//# sourceMappingURL=user.js.map