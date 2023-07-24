import { getLinkToken } from '../services/token.js';
export async function sendLinkToken(req, res) {
    const linkToken = await getLinkToken();
    res.json(linkToken);
}
export async function getExistingAccessToken(req, res) {
}
//# sourceMappingURL=token.js.map