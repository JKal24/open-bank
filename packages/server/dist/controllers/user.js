import { addUniqueUserDb, getUserDb } from '../services/db/user.js';
export function addUser(req, res) {
    addUniqueUserDb(req.params.email, req.params.pass, (err, dbRes) => {
        if (err)
            res.json(err);
        res.json(dbRes[0].user_id);
    });
}
export function getUser(req, res) {
    getUserDb(req.params.email, (err, dbRes) => {
        if (err)
            res.json(err);
        res.json(dbRes[0].user_id);
    });
}
//# sourceMappingURL=user.js.map