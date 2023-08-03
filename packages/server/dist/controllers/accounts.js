import { addNewUserAccount } from '../services/accounts.js';
export async function addNewAccount(req, res, next) {
    try {
        const userAccountInfo = req.body;
        addNewUserAccount(userAccountInfo);
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=accounts.js.map