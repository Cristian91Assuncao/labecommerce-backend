import { users, products, createUser, getAllUsers, createProduct, getAllProducts, searchProductsByName } from "./database";

const setTimeout = () => {
    console.table(users);
    console.table(products);
};

setTimeout()


console.log(createUser("u003", "Astrodev", "astrodev@email.com", "astrodev99"))

console.log(getAllUsers())

console.log(createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://images.unsplash.com/photo"))

console.log(getAllProducts())

console.log(searchProductsByName("gamer"))
