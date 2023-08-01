import { getAccount, getTransactions, getBalances } from '../services/accounts.js'
import { AccountInfo, UserAccountInfo } from '../models/account.js';

export async function addNewAccount(req, res) {
    const userAccountInfo: UserAccountInfo = req.body;

    
}