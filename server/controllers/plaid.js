const { getLinkToken } = require('../data/api')

module.exports = {
    async sendLinkToken(req, res) {
        const linkToken = await getLinkToken();
        console.log(linkToken);
        res.json(linkToken);
    }
}