import { User } from "../../types/users.js";
import { query } from '../../data/database.js';

export async function addUserDb(email: string, password: string) {
    if (!(await checkIfUserExistsDb(email))) {
        await query("INSERT INTO users (user_id, email, pass) VALUES (0, ?, ?)", [email, password]);
    }
}

export async function checkIfUserExistsDb(email: string): Promise<boolean> {
    const results = await query<User>("SELECT * FROM users WHERE email LIKE ?", [email]);
    return results[0] != null;
}

export async function getUserDb(email: string, password: string): Promise<User> {
    const results = (await query<User>("SELECT * FROM users WHERE email = ? AND pass = ?", [email, password]))[0];
    return results;
}