import { TransferNetwork, TransferType } from "plaid";
import { client } from "./client.js";
import { getItemsFromDb, getAccountsFromDb } from "./db/bank.js";
export async function transferRequest(user_id, institution_name_transferor, institution_name_transferee, account_id_transferor, account_id_transferee, amount) {
    const items = await getItemsFromDb(user_id);
    const item_transferor = items.filter(item => item.institution_name == institution_name_transferor)[0];
    const item_transferee = items.filter(item => item.institution_name == institution_name_transferee)[0];
    const accounts_transferor = await getAccountsFromDb(item_transferor.item_id);
    const account_transferor = accounts_transferor.filter(account => account.account_id == account_id_transferor)[0];
    const accounts_transferee = await getAccountsFromDb(item_transferee.item_id);
    const account_transferee = accounts_transferee.filter(account => account.account_id == account_id_transferee)[0];
    let type;
    if (amount < 0)
        type = TransferType.Credit;
    else
        type = TransferType.Debit;
    const absAmount = Math.abs(amount).toString();
    const authRequest = {
        access_token: item_transferor.access_token,
        account_id: account_transferor.account_id,
        type,
        network: TransferNetwork.Ach,
        amount: absAmount,
        user: {
            legal_name: ""
        }
    };
    const output = await client.transferAuthorizationCreate(authRequest);
    const authorization = output.data;
    type = type == TransferType.Credit ? TransferType.Debit : TransferType.Credit;
    const transferRequest = {
        access_token: item_transferee.access_token,
        account_id: account_transferee.account_id,
        authorization_id: authorization.authorization.id,
        type,
        network: TransferNetwork.Ach,
        amount: absAmount,
        description: "Transfer " + absAmount
    };
    const transfer = await client.transferCreate(transferRequest);
    return await client.transferGet({
        transfer_id: transfer.data.transfer.id
    });
}
//# sourceMappingURL=account.js.map