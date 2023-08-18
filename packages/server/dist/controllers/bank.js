import { addBank } from '../services/bank.js';
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
//# sourceMappingURL=bank.js.map