import jwt from 'jsonwebtoken';
import { getUserDb, checkIfUserExistsDb } from './db/user.js';
export const addUniqueUser = async (email, password) => {
    if (!checkIfUserExistsDb(email)) {
        return createAbstractedUser(await getUserDb(email, password));
    }
    return null;
};
export const createAbstractedUser = (user) => {
    const access_token = createAccessToken(user);
    return {
        user_id: user.user_id,
        access_token
    };
};
const createAccessToken = (user) => {
    return jwt.sign({ user_id: user.user_id, email: user.email }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
    });
};
//# sourceMappingURL=user.js.map