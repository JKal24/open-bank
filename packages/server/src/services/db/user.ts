import { query } from '../../data/database.js';

export async function addUserDb(email: string, password: string) {
    if (await checkIfUserExistsDb(email, password)) {

    }
    const results = await query("INSERT INTO users (user_id, email, pass) VALUES (0, ?, ?)", [email, password]);
    console.log(results);

    return await getUserIdDb(email);
}

async function checkIfUserExistsDb(email: string, password: string) {
    const results = await query("SELECT * FROM users WHERE email LIKE '?'", [email]);
    console.log(results);
    return results;
}

export async function getUserIdDb(email: string): Promise<string> {
    return await query<string>("SELECT * FROM users WHERE email = ?", [email])
}