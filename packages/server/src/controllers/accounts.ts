import { getAccount, getTransactions, getBalances, addNewUserAccount } from '../services/accounts.js'
import { AccountInfo, UserAccountInfo } from '../types/account.js';

export async function addNewAccount(req, res, next) {
    try {
        const userAccountInfo: UserAccountInfo = req.body;

        addNewUserAccount(userAccountInfo);
    } catch (err) {
        next(err);
    }
}