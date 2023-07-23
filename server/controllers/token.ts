module.exports = {
    async sendLinkToken(req, res) {
        const linkToken = await getLinkToken();
        res.json(linkToken);
    },

    async getExistingAccessToken(req, res) {
        
    }
}