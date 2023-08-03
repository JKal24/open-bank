import * as dotenv from 'dotenv';
dotenv.config();
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
const ENV = process.env.PLAID_ENV || "sandbox";
const CLIENT_ID = process.env.PLAID_CLIENT_ID;
const SECRET = process.env.PLAID_SECRET;
const config = new Configuration({
    basePath: PlaidEnvironments[ENV],
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': CLIENT_ID,
            'PLAID-SECRET': SECRET,
            'Plaid-Version': '2020-09-14',
        },
    },
});
export const client = new PlaidApi(config);
//# sourceMappingURL=client.js.map