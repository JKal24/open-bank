import { getAccount, getTransactions, getBalances, addNewUserAccount } from '../services/bank.js'
import { AccountInfo, UserAccountInfo } from '../types/plaid.js';

export async function addNewAccount(req, res, next) {
    try {
        const email: string = req.body.email;
        const userAccountInfo: UserAccountInfo = req.body.info;

        addNewUserAccount(userAccountInfo, email);
    } catch (err) {
        next(err);
    }
}