import { getAccount, getTransactions, getBalances, addNewUserAccount } from '../services/bank.js'
import { AccountInfo, UserAccountInfo } from '../types/plaid.js';

export async function addNewAccount(req, res, next) {
    try {
        const user_id: string = req.body.id;
        const userAccountInfo: UserAccountInfo = req.body.info;

        addNewUserAccount(userAccountInfo, user_id);
    } catch (err) {
        next(err);
    }
}