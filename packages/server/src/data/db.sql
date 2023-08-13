CREATE DATABASE openbank;

CREATE TABLE users(
    user_id int UNIQUE AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL
);

CREATE TABLE items(
    item_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
    access_token VARCHAR(255) NOT NULL UNIQUE,
    user_id int,
    institution_id VARCHAR(255),
    institution_name VARCHAR(255),
    FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

CREATE TABLE accounts(
    account_id VARCHAR(255) NOT NULL PRIMARY KEY,
    item_id VARCHAR(255),
    account_type VARCHAR(255),
    account_subtype VARCHAR(255),
    account_mask VARCHAR(255),
    balance int,
    FOREIGN KEY(item_id)
        REFERENCES items(item_id)
        ON DELETE CASCADE
);

CREATE TABLE transactions(
    transaction_id VARCHAR(255) NOT NULL PRIMARY KEY,
    account_id VARCHAR(255),
    authorized_date VARCHAR(255),
    payment_date VARCHAR(255),
    amount int,
    merchant_name VARCHAR(255),
    payment_channel VARCHAR(255),
    currency_code VARCHAR(255),
    transaction_type VARCHAR(255),
    FOREIGN KEY(account_id)
        REFERENCES accounts(account_id)
        ON DELETE CASCADE
);