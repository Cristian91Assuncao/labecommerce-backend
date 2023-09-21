import { users, products, createUser, getAllUsers, createProduct, getAllProducts, searchProductsByName } from "./database";
import express, { Request, Response } from 'express'

//import do CORS 
import cors from 'cors';
import { TProducts, TUsers } from "./types";
//criação do servidor express 
const app = express();
//configuração do middleware que garante que nossas respostas estejam sempre
//no formato json 
app.use(express.json());
//configuração do middleware que habilita o CORS 👇🏽
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
    res.send("pong!")
})

app.get("/users", (req: Request, res: Response) => {
    const result: TUsers[] = users;

    res.status(200).send(result);
})

app.get("/products", (req: Request, res: Response) => {
    const result: TProducts[] = products;

    res.status(200).send(result);
})

app.get("/products/search", (req: Request, res: Response) => {
    const q: string = req.query.q as string;
    const result: TProducts[] = products;

    const productsByName: TProducts[] = products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()));
    if (q === undefined) {
        res.status(200).send(result);
    } else {
        res.status(200).send(productsByName);
    }
})

app.post("/users", (req: Request, res: Response) => {
    const { id, name, email, password } = req.body;

    // const newUser: TUsers = {
    //     id,
    //     name,
    //     email,
    //     password,
    //     createdAt: new Date().toISOString()
    // };
    // users.push(newUser)    //OU CHAMANDO A FUNÇÃO COMO FEITO ABAIXO

    const newUser = createUser(id, name, email, password);

    res.status(201).send("Cadastro realizado com sucesso");
})

app.post("/products", (req: Request, res: Response) => {
    const { id, name, price, description, imageUrl } = req.body;

    // const newProduct: TProducts = {
    //     id,
    //     name,
    //     price,
    //     description,
    //     imageUrl
    // };
    // products.push(newProduct)

    const newProduct = createProduct(id, name, price, description, imageUrl);

    res.status(201).send("Produto cadastrado com sucesso")
})

app.delete("/users/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const userToDelete = users.findIndex((user) => user.id === id)

    users.splice(userToDelete, 1)

    res.status(200).send({ message: "User apagado com sucesso" });
})

app.delete("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const productToDelete = products.findIndex((product) => product.id === id)

    products.splice(productToDelete, 1)

    res.status(200).send({ message: "Produto apagado com sucesso" });
})

app.put("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined
    const newImageUrl = req.body.imageUrl as string | undefined

    const product = products.find((product) => product.id === id);

    product.name = newName || product.name
    product.description = newDescription || product.description
    product.imageUrl = newImageUrl || product.imageUrl

    product.price = isNaN(newPrice) ? product.price : newPrice


    res.status(200).send({ message: "Produto atualizado com sucesso" });
})





const setTimeout = () => {
    console.table(users);
    console.table(products);
};

setTimeout()


// console.log(createUser("u003", "Astrodev", "astrodev@email.com", "astrodev99"))

console.log(getAllUsers())

// console.log(createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://images.unsplash.com/photo"))

console.log(getAllProducts())

console.log(searchProductsByName("gamer"))
