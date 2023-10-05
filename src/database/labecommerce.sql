-- Active: 1695771350690@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME('now', 'localtime'))
);

INSERT INTO users ( id, name, email, password )
VALUES ( 'u01', 'Cartman', 'cartman@email.com', '123456' );

INSERT INTO users ( id, name, email, password )
VALUES ( 'u02', 'Kyle', 'kyle@email.com', '123456' );

INSERT INTO users ( id, name, email, password )
VALUES ( 'u03', 'Kenny', 'kennycartman@email.com', '123456' );

SELECT * FROM users

DROP TABLE users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
)

INSERT INTO products ( id, name, price, description, image_url )
VALUES
('p01', 'Cama', 900, 'Cama King Size', 'imagem'),
('p02', 'Sofá', 1500, 'Sofá de Canto', 'imagem'),
('p03', 'Mesa', 700, 'Mesa de cozinha', 'imagem'),
('p04', 'Guarda-roupa', 1000, 'Guarda-roupa 8 portas', 'imagem'),
('p05', 'Rack', 400, 'Rack para TV 50 polegadas', 'imagem')

SELECT * FROM products

DROP TABLE products