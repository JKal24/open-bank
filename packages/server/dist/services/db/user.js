import { query } from '../../data/database.js';
export async function addUserDb(email, password) {
    if (await checkIfUserExistsDb(email, password)) {
    }
    const results = await query("INSERT INTO users (user_id, email, pass) VALUES (0, ?, ?)", [email, password]);
    console.log(results);
    return await getUserIdDb(email);
}
async function checkIfUserExistsDb(email, password) {
    const results = await query("SELECT * FROM users WHERE email LIKE '?'", [email]);
    console.log(results);
    return results;
}
export async function getUserIdDb(email) {
    return await query("SELECT * FROM users WHERE email = ?", [email]);
}
//# sourceMappingURL=user.js.map