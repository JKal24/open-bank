import { addNewUserAccount } from '../services/bank.js';
export async function addNewAccount(req, res, next) {
    try {
        const user_id = req.body.id;
        const userAccountInfo = req.body.info;
        addNewUserAccount(userAccountInfo, user_id);
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=accounts.js.map