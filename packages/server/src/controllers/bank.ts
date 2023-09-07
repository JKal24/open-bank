import { addBank, getBank, removeBank as removeBankService } from '../services/bank.js'
import { UserBankData } from '../types/users.js';

export async function addNewBank(req, res, next) {
    try {
        const userBankData: UserBankData = req.body;

        const output = await addBank(userBankData);
        res.json(output);
    } catch (err) {
        next(err);
    }
}

export async function removeBank(req, res, next) {
    try {
        await removeBankService(req.body.institution_name, req.body.user_id);
        res.status(200).send({status: "Removed account"});
    } catch (err) {
        next(err)
    }
}

export async function getAllBanks(req, res, next) {
    try {
        const user_id: string = req.body;

        const output = await getBank(user_id);
        res.json(output);
    } catch (err) {
        next(err);
    }
}