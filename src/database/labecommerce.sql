-- Active: 1695771350690@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL
);

SELECT * FROM users;

DROP TABLE users;

INSERT INTO users ( id, name, email, password )
VALUES ( 'us001', 'Cartman', 'cartman@email.com', '123456' );

INSERT INTO users ( id, name, email, password )
VALUES ( 'us002', 'Kenny', 'kenny@email.com', '123456' );

INSERT INTO users ( id, name, email, password )
VALUES ( 'us003', 'Stan', 'stan@email.com', '123456' );


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
VALUES ( 'pro005', 'Teclado Bluetooth', 150, 'Teclado liso e resistente', 'image' );