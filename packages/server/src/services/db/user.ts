import { User } from '@openbank/types';
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

export async function getUserIdDb(email: string): Promise<User> {
    const results = (await query<User>("SELECT * FROM users WHERE email = ? AND pass = ?", [email]))[0];
    return results;
}

export async function validateUserDb(email: string, password: string): Promise<string> {
    return (await query<string>("SELECT user_id FROM users WHERE email = ? AND pass = ?", [email, password]))[0]
}