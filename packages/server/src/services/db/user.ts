import db from '../../data/database.js';

export function addUniqueUserDb(email: string, password: string, callback: (err, res) => void) {
    db.query("SELECT * FROM users WHERE email LIKE '?'", [email], function (err, res) {
        if (err || res.length > 0) callback(err, []);
        addUserDb(email, password, callback);
    });
}

function addUserDb(email: string, password: string, callback:  (err, res) => void) {
    db.query("INSERT INTO users (user_id, email, pass) VALUES (0, ?, ?)", [email, password], function (err, res) {
        getUserDb(email, callback);
    });
}

export function getUserDb(email: string, callback: (err, res) => void) {
    db.query("SELECT * FROM users WHERE email = ?", [email], function (err, res) {
        callback(err, res);
    })
}