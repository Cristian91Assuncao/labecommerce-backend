import { TProducts, TUsers } from "./types"

export const users: TUsers[] = [
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
]

export const products: TProducts[] = [
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
]


// EXERCÍCIO 1
export const createUser = (id: string, name: string, email: string, password: string): string => {
    
    const newUser: TUsers = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    return "Cadastro realizado com sucesso"
}

export const getAllUsers = (): TUsers[] => {
    return users;
}

const listaDeUsuarios: TUsers[] = getAllUsers();

// EXERCÍCIO 2
export const createProduct = (id: string, name: string, price: number, description: string, imageUrl: string): string => {
    const newProduct: TProducts = { id, name, price, description, imageUrl };
    products.push(newProduct);
    return "Produto criado com sucesso"
}

export const getAllProducts = (): TProducts[] => {
    return products;
}

// EXERCÍCIO 3
export const searchProductsByName = (name: string): TProducts[] => {
    name = name.toLocaleLowerCase();
    const searchProduct = products.filter(product => product.name.toLocaleLowerCase().includes(name));
    return searchProduct;
}
