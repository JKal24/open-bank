import { addUserDb, checkIfUserExistsDb, validateUserDb } from '../services/db/user.js';
export async function addUser(req, res) {
    await addUserDb(req.body.email, req.body.password);
}
export async function getUserId(req, res) {
    const user_id = await validateUserDb(req.body.email, req.body.password);
    if (user_id) {
        res.json(user_id);
    }
    else {
        res.status(401).send({ status: "Wrong username or password!" });
    }
}
export async function checkIfUserExists(req, res) {
    const user = await checkIfUserExistsDb(req.body.email);
    res.json(user);
}
//# sourceMappingURL=user.js.map