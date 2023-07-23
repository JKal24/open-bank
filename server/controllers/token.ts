import { getLinkToken } from '../services/token'

export async function sendLinkToken(req, res) {
    const linkToken = await getLinkToken();
    res.json(linkToken);
}

export async function getExistingAccessToken(req, res) {
    
}