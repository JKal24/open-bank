import { addBank, getBank } from '../services/bank.js';
export async function addNewBank(req, res, next) {
    try {
        const userBankData = req.body;
        const output = await addBank(userBankData);
        res.json(output);
    }
    catch (err) {
        next(err);
    }
}
export async function getAllBanks(req, res, next) {
    try {
        const user_id = req.body.used_id;
        const output = await getBank(user_id);
        res.json(output);
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=bank.js.map