"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.products = exports.users = void 0;
exports.users = [
    {
        id: "u001",
        name: "Fulano",
        email: "fulano@email.com",
        password: "fulano123",
        createdAt: new Date().toISOString(),
    },
    {
        id: "u002",
        name: "Beltrana",
        email: "beltrana@email.com",
        password: "beltrana00",
        createdAt: new Date().toISOString(),
    }
];
exports.products = [
    {
        id: "prod001",
        name: "Mouse gamer",
        price: 199,
        description: "Melhor fone do mercado",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
    },
    {
        id: "prod002",
        name: "Monitor",
        price: 899,
        description: "Monitor LED Full HD 24 polegadas",
        imageUrl: "https://picsum.photos/seed/Monitor/400",
    }
];
const createUser = (id, name, email, password) => {
    const createdAt = new Date().toISOString();
    const newUser = { id, name, email, password, createdAt };
    exports.users.push(newUser);
    return "Cadastro realizado com sucesso";
};
exports.createUser = createUser;
const getAllUsers = () => {
    return exports.users;
};
exports.getAllUsers = getAllUsers;
const listaDeUsuarios = (0, exports.getAllUsers)();
const createProduct = (id, name, price, description, imageUrl) => {
    const newProduct = { id, name, price, description, imageUrl };
    exports.products.push(newProduct);
    return "Produto criado com sucesso";
};
exports.createProduct = createProduct;
const getAllProducts = () => {
    return exports.products;
};
exports.getAllProducts = getAllProducts;
const searchProductsByName = (name) => {
    name = name.toLocaleLowerCase();
    const searchProduct = exports.products.filter(product => product.name.toLocaleLowerCase().includes(name));
    return searchProduct;
};
exports.searchProductsByName = searchProductsByName;
//# sourceMappingURL=database.js.map