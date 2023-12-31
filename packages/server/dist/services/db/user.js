import { query } from '../../data/database.js';
export async function addUserDb(email, password) {
    if (!(await checkIfUserExistsDb(email))) {
        await query("INSERT INTO users (user_id, email, pass) VALUES (0, ?, ?)", [email, password]);
    }
}
export async function checkIfUserExistsDb(email) {
    const results = await query("SELECT * FROM users WHERE email LIKE ?", [email]);
    return results[0] != null;
}
export async function getUserDb(email, password) {
    const results = (await query("SELECT * FROM users WHERE email = ? AND pass = ?", [email, password]))[0];
    return results;
}
//# sourceMappingURL=user.js.map