import { User } from '@openbank/types';
import { query } from '../../data/database.js';

export async function addUserDb(email: string, password: string) {
    if (await checkIfUserExistsDb(email)) {
        return { user_id: null }
    } else {
        await query("INSERT INTO users (user_id, email, pass) VALUES (0, ?, ?)", [email, password]);

        return await getUserIdDb(email);
    }
}

export async function checkIfUserExistsDb(email: string): Promise<boolean> {
    const results = await query<User>("SELECT * FROM users WHERE email LIKE ?", [email]);
    return results[0] != null;
}

export async function getUserIdDb(email: string): Promise<User> {
    return (await query<User>("SELECT * FROM users WHERE email = ?", [email]))[0]
}