import { addBank } from '../services/bank.js';
export async function addNewBank(req, res, next) {
    try {
        const userBankData = req.body;
        const output = await addBank(userBankData);
        console.log(output);
        res.json(output);
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=bank.js.map