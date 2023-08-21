import { getAccount, getTransactions, getBalances, addBank, getBank } from '../services/bank.js'
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

export async function getAllBanks(req, res, next) {
    try {
        const user_id: string = req.body.used_id;

        const output = await getBank(user_id);
        res.json(output);
    } catch (err) {
        next(err);
    }
}