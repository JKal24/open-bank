import { query } from '../../data/database.js';
export async function addUserDb(email, password) {
    if (await checkIfUserExistsDb(email)) {
        return { user_id: null };
    }
    else {
        await query("INSERT INTO users (user_id, email, pass) VALUES (0, ?, ?)", [email, password]);
        return await getUserIdDb(email);
    }
}
export async function checkIfUserExistsDb(email) {
    const results = await query("SELECT * FROM users WHERE email LIKE ?", [email]);
    return results[0] != null;
}
export async function getUserIdDb(email) {
    return (await query("SELECT * FROM users WHERE email = ?", [email]))[0];
}
//# sourceMappingURL=user.js.map