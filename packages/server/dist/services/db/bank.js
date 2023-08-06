import db from '../../data/database.js';
export function addItemToDB(item) {
    db.query("INSERT INTO items SET " + item);
}
export function addAccountToDB(account) {
    db.query("INSERT INTO accounts SET " + account);
}
export function addTransactionToDB(transaction) {
    db.query("INSERT INTO transactions SET " + transaction);
}
//# sourceMappingURL=bank.js.map