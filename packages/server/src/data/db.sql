CREATE DATABASE openbank;

CREATE TABLE users(
    user_id VARCHAR(255) NOT NULL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    pass VARCHAR(255)
);

CREATE TABLE items(
    item_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
    access_token VARCHAR(255) NOT NULL UNIQUE,
    user_id VARCHAR(255),
    institution_id VARCHAR(255),
    instution_name VARCHAR(255)
    FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
)

CREATE TABLE accounts(
    account_id VARCHAR(255) NOT NULL PRIMARY KEY,
    user_id VARCHAR(255),
    institution_id VARCHAR(255),
    institution_name VARCHAR(255),
    account_type VARCHAR(255),
    accountSubtype VARCHAR(255),
    accountMask VARCHAR(255),
    balance int,
    FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

CREATE TABLE transactions(
    transaction_id VARCHAR(255) NOT NULL PRIMARY KEY,
    account_id VARCHAR(255),
    authorized_date VARCHAR(255),
    payment_date VARCHAR(255),
    amount INT,
    merchant_name VARCHAR(255),
    payment_channel VARCHAR(255),
    currency_code VARCHAR(255),
    transaction_type VARCHAR(255),
    FOREIGN KEY(account_id)
        REFERENCES accounts(account_id)
        ON DELETE CASCADE
);

CREATE TABLE transaction_categories(
    category VARCHAR(255) NOT NULL PRIMARY KEY,
    transaction_id VARCHAR(255),
    FOREIGN KEY(transaction_id)
        REFERENCES transactions(transaction_id)
        ON DELETE CASCADE
);