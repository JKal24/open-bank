import { AbstractedUser, User } from '../types/users.js'
import jwt from 'jsonwebtoken';
import { getUserDb, checkIfUserExistsDb } from './db/user.js';

export const addUniqueUser: (email: string, password: string) => Promise<AbstractedUser|null> = async (email: string, password: string) => {
    if (!checkIfUserExistsDb(email)) {
        return createAbstractedUser(await getUserDb(email, password))
    }
    return null;
}

export const createAbstractedUser: (user: User) => AbstractedUser = (user: User) => {
    const access_token = createAccessToken(user);
    return {
        user_id: user.user_id,
        access_token
    }
}

const createAccessToken = (user: User) => {
    return jwt.sign(
        { user_id: user.user_id, email: user.email },
            process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );
}