CREATE DATABASE openbank;

CREATE TABLE users(
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    pass VARCHAR(255)
);

CREATE TABLE accounts(
    account_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    institution_id INT,
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
    transaction_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    account_id INT,
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
    transaction_id INT,
    FOREIGN KEY(transaction_id)
        REFERENCES transactions(transaction_id)
        ON DELETE CASCADE
);