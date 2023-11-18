-- Active: 1700249650742@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL
);

SELECT * FROM users;

DROP TABLE users;

DROP TABLE products;

INSERT INTO users ( id, name, email, password )
VALUES ( 'us001', 'Cristian', 'cristian@email.com', '123456' );

INSERT INTO users ( id, name, email, password )
VALUES ( 'us002', 'Amanda', 'amanda@email.com', '123456' );

INSERT INTO users ( id, name, email, password )
VALUES ( 'us003', 'Eunice', 'eunice@email.com', '123456' );


CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

SELECT * FROM products;

INSERT INTO products ( id, name, price, description, image_url )
VALUES ( 'pro001', 'Notebook', 3500, 'Notebook Dell', 'image' );

INSERT INTO products ( id, name, price, description, image_url )
VALUES ( 'pro002', 'Cadeira Gamer', 999, 'Cadeira super confortável', 'image' );

INSERT INTO products ( id, name, price, description, image_url )
VALUES ( 'pro003', 'Escrivaninha', 650, 'Escrivaninha de escritório', 'image' );

INSERT INTO products ( id, name, price, description, image_url )
VALUES ( 'pro004', 'Fone Bluetooth', 120, 'Fone bluetooth com som fodaaa', 'image' );

INSERT INTO products ( id, name, price, description, image_url )
VALUES ( 'pro005', 'Teclado gamer Bluetooth', 150, 'Teclado liso e resistente', 'image' );


SELECT * FROM users;

SELECT * FROM products;

DROP TABLE products;

SELECT * FROM products
WHERE name like 'gamer%' or name like '%gamer%' or name like '%gamer';

INSERT INTO users ( id, name, email, password )
VALUES ( 'us004', 'Clayton', 'clayton@email.com', '123456' );

INSERT INTO products ( id, name, price, description, image_url )
VALUES ( 'pro006', 'Mouse gamer Bluetooth', 100, 'Mouse gamer resistente', 'image' );

DELETE FROM users
WHERE id = 'us004';

DELETE FROM products
WHERE id = 'pro006';

UPDATE products
SET
    name = 'Joystick Sem fio Para Pc',
    price = 250,
    description = 'Melhor joystick para Pc',
    image_url = 'image'
WHERE id = 'pro004';

CREATE TABLE purchases (
id TEXT PRIMARY KEY UNIQUE NOT NULL,
buyer TEXT NOT NULL,
total_price REAL NOT NULL,
created_at TEXT DEFAULT(DATETIME()) NOT NULL,
FOREIGN KEY(buyer) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

SELECT * FROM purchases

DROP TABLE purchases;

INSERT INTO purchases
VALUES ('pur01', 'us001', 199.99, DATETIME());

INSERT INTO purchases
VALUES ('pur02', 'us002', 99.99, DATETIME());

UPDATE purchases
SET
    total_price = 500.00
WHERE id = 'pur02';

SELECT
purchases.id as idCompra,
users.id as idUsuário,
users.name as Nome,
users.email as Email,
purchases.total_price as PreçoTotal,
purchases.created_at as Data
FROM users
INNER JOIN purchases ON users.id = purchases.buyer;


CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY(purchase_id) REFERENCES purchases(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY(product_id) REFERENCES products(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

INSERT INTO purchases_products
VALUES ('pur01', 'pro001', 2), ('pur02', 'pro003', 5), ('pur02', 'pro005', 3);

SELECT * FROM purchases_products;

SELECT * FROM purchases_products
INNER JOIN products
ON purchases_products.product_id = products.id
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id;

DROP TABLE purchases_products;

UPDATE products
SET id = 'pro009'
WHERE id = 'pro001';

UPDATE purchases
SET id = 'pur09'
WHERE id = 'pur01';

DELETE FROM products
WHERE id = 'pro003';

DELETE FROM purchases
WHERE id = 'pur02';