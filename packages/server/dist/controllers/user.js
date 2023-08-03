import { addUserDb } from '../services/user.js';
export function addUser(req, res) {
    addUserDb(req.params.email, req.params.pass);
}
export function getUser(req, res) {
}
export async function checkUserExists(req, res) {
}
//# sourceMappingURL=user.js.map