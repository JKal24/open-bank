import { addNewUserAccount } from '../services/bank.js';
export async function addNewAccount(req, res, next) {
    try {
        const email = req.body.email;
        const userAccountInfo = req.body.info;
        addNewUserAccount(userAccountInfo, email);
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=accounts.js.map