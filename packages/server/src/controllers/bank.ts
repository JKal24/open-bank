import { getAccount, getTransactions, getBalances, addBank } from '../services/bank.js'
import { UserBankData } from '@openbank/types';

export async function addNewBank(req, res, next) {
    try {
        const userBankData: UserBankData = req.body;

        const output = await addBank(userBankData);
        res.json(output);
    } catch (err) {
        next(err);
    }
}