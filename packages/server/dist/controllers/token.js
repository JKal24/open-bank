import { getLinkToken, getAccessToken } from '../services/token.js';
export async function sendLinkToken(req, res, next) {
    try {
        const linkToken = await getLinkToken();
        res.json(linkToken);
    }
    catch (err) {
        next(err);
    }
}
export async function sendAccessToken(req, res, next) {
    try {
        const publicToken = Object.values(req.body)[0];
        const accessToken = await getAccessToken(publicToken);
        res.json(accessToken);
    }
    catch (err) {
        next(err);
    }
}
export async function getExistingAccessToken(req, res, next) {
    try {
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=token.js.map