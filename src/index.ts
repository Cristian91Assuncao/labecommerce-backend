import { users, products, createUser, getAllUsers, createProduct, getAllProducts, searchProductsByName } from "./database";
import express, { Request, Response } from 'express'

//import do CORS 
import cors from 'cors';
import { TProducts, TUsers } from "./types";
import { db } from "./database/knex";
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

app.get("/users", async (req: Request, res: Response) => {
    try {

        const result = await db.raw(`SELECT * FROM users`)

        // const result: TUsers[] = users;
    
        res.status(200).send(result);
        
    } catch (error: any) {

        if(req.statusCode === 200){
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)            
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get("/products", async (req: Request, res: Response) => {
    try {

        const result = await db.raw(`SELECT * FROM products`)

        // const result: TProducts[] = products;
    
        res.status(200).send(result);

    } catch (error: any) {

        if(req.statusCode === 200){
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)            
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get("/products/search", (req: Request, res: Response) => {
    try {
        const q: string = req.query.q as string;
        const result: TProducts[] = products;
    
        const productsByName: TProducts[] = products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()));
        if (q === undefined) {
            res.status(200).send(result);
        } else {
            if(q.length < 1) {
                throw new Error("Pesquisa deve possuir no mínimo 1 caractere")
            }
            res.status(200).send(productsByName);
        }        
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
        };        
    }
})

app.post("/users", async (req: Request, res: Response) => {

    try {
        const { id, name, email, password } = req.body;

        // if (!id || !name || !email || !password) {
        //     res.status(400)
        //     throw new Error("Preencha todos os dados!")
        // }

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("Id inválido, deve ser string")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("Nome inválido, deve ser string")
        }

        if (typeof email !== "string") {
            res.status(400)
            throw new Error("Email inválido, deve ser string")
        }

        if (typeof password !== "string") {
            res.status(400)
            throw new Error("Password inválido, deve ser string")
        }

        if (!name || name.length < 3) {
            res.statusCode = 404
            throw new Error('O nome deve conter ao menos 3 caracteres!')
        }

        if (!email) {
            res.statusCode = 404
            throw new Error('O email é obrigatório!')
        }

        if (!email.includes('@')) {
            res.statusCode = 404
            throw new Error('O email deve conter o @!')
        }

        if (!email.includes('.com')) {
            res.statusCode = 404
            throw new Error('O email deve conter o .com!')
        }

        if (password.length < 8) {
            res.statusCode = 404
            throw new Error('O password deve conter ao menos 8 caracteres!')
        }

        if (password.length > 12) {
            res.statusCode = 404
            throw new Error('O password não deve conter mais de 12 caracteres!')
        }

        // if (password.includes(Number.length >= 1)) {
        //     res.statusCode = 404
        //     throw new Error('O password deve conter ao menos 1 caracter numérico!')
        // }

        await db.raw(`INSERT INTO users
            VALUES("${id}", "${name}", "${email}", "${password}", "${new Date().toISOString()}")
        `)
    
        // const newUser: TUsers = {
        //     id,
        //     name,
        //     email,
        //     password,
        //     createdAt: new Date().toISOString()
        // };
        // users.push(newUser)    //OU CHAMANDO A FUNÇÃO COMO FEITO ABAIXO
    
        // const newUser = createUser(id, name, email, password);
    
        res.status(201).send("Cadastro realizado com sucesso");
        
    } catch (error: any) {

        if(req.statusCode === 200){
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)            
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.post("/products", async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, imageUrl } = req.body;

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("Id inválido, deve ser string")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("Nome inválido, deve ser string")
        }

        if (typeof price !== "number") {
            res.status(400)
            throw new Error("Preço inválido, deve ser number")
        }

        if (typeof description !== "string") {
            res.status(400)
            throw new Error("Descrição inválida, deve ser string")
        }

        if (typeof imageUrl !== "string") {
            res.status(400)
            throw new Error("Imagem inválida, deve ser string")
        }

        if (!name || name.length < 3) {
            res.statusCode = 404
            throw new Error('O nome deve conter ao menos 3 caracteres!')
        }

        if (price <= 0) {
            res.statusCode = 404
            throw new Error('O preço deve ser maior que zero!')
        }

        if (description.length > 26) {
            res.statusCode = 404
            throw new Error('A descrição do produto não deve conter mais de 26 caracteres!')
        }

        await db.raw(`INSERT INTO products
            VALUES("${id}", "${name}", "${price}", "${description}", "${imageUrl}")
        `)
    
        // const newProduct: TProducts = {
        //     id,
        //     name,
        //     price,
        //     description,
        //     imageUrl
        // };
        // products.push(newProduct)
    
        // const newProduct = createProduct(id, name, price, description, imageUrl);
    
        res.status(201).send("Produto cadastrado com sucesso")
        
    } catch (error: any) {

        if(req.statusCode === 200){
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)            
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get("/purchases", async (req: Request, res: Response) => {
    try {

        const result = await db.raw(`SELECT * FROM purchases`)
    
        res.status(200).send(result);

    } catch (error: any) {

        if(req.statusCode === 200){
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)            
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.post("/purchases", async (req: Request, res: Response) => {

    try {
        const { id, buyer, total_price } = req.body;
    // created_at TEXT NOT NULL,
    // FOREIGN KEY(buyer) REFERENCES users(id)

        await db.raw(`INSERT INTO purchases
            VALUES("${id}", "${buyer}", "${total_price}", "${new Date().toISOString()}")
        `)
    
        res.status(201).send("Purchases cadastrado com sucesso");
        
    } catch (error: any) {

        if(req.statusCode === 200){
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)            
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.delete("/users/:id", (req: Request, res: Response): void => {
    try {
        const id: string = req.params.id;
        
        const userIndex: number = users.findIndex((user) => user.id === id);
        
        if (userIndex < 0) {
            res.statusCode = 400;
            throw new Error("Conta não encontrada.");
        } else {
            users.splice(userIndex, 1);
        };
    
        res.status(200).send({ message: "User apagado com sucesso" });        
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
        };
    };
    
});

app.delete("/products/:id", (req: Request, res: Response): void => {
    try {
        const id: string = req.params.id;
    
        const productIndex: number = products.findIndex((product) => product.id === id);
    
        if (productIndex < 0) {
            res.statusCode = 400;
            throw new Error("Produto não encontrado.");
        } else {
            products.splice(productIndex, 1);
        }
    
        res.status(200).send({ message: "Produto apagado com sucesso" });        
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
        };
    };

})
app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete: string = req.params.id;
    
        const [purchase] = await db.raw(`
            SELECT * FROM purchases
            WHERE id = "${idToDelete}"
        `)
    
        if (!purchase) {
            res.status(404)
            throw new Error("O purchase não foi encontrado")
        }

        await db.raw(`
            DELETE FROM purchases
            WHERE id = "${idToDelete}"
        `)
    
        res.status(200).send({ message: "O purchase foi apagado com sucesso" });        
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
        };
    };

})

app.put("/products/:id", async (req: Request, res: Response)=> {
    try {
        const id: string = req.params.id

    // const productIndex: number = products.findIndex((product) => product.id === id);
    
        // if (productIndex < 0) {
        //     res.statusCode = 404;
        //     throw new Error("Produto não encontrado.");
        // }

    // const newId = req.body.id as string | undefined
    // const newName = req.body.name as string | undefined
    // const newPrice = req.body.price as number | undefined
    // const newDescription = req.body.description as string | undefined
    // const newImageUrl = req.body.imageUrl as string | undefined

    const { newId, newName, newPrice, newDescription, newImageUrl } = req.body

    // if (typeof newId !== "string") {
	// 		res.statusCode = 400;
    //         throw new Error("'id' deve ser uma string");
    // }

    if (newId !== undefined) {
        if (typeof newId !== "string") {
			res.statusCode = 404;
            throw new Error("O id deve ser uma string")
        }

        if (newId.length !== 6) {
			res.statusCode = 404;
            throw new Error("O id deve ter 4 caracteres")
        }
    }

    if (newName !== undefined) {
        if (typeof newName !== "string") {
			res.statusCode = 404;
            throw new Error("O name deve ser uma string");
        }

        if (newName.length < 2) {
            res.statusCode = 404;
            throw new Error("O name deve conter ao menos 2 caracteres")
        }
    }
    
    if (newPrice !== undefined) {
        if (typeof newPrice !== "number" && newPrice < 0) {
            res.statusCode = 404;
            throw new Error("O newPrice' deve ser tipo 'number' e maior do que zero")
        }
    }

    if (newDescription !== undefined) {
        if (newDescription.length > 26) {
            res.statusCode = 404;
            throw new Error("A descrição do produto não deve conter mais de 26 caracteres")
        }
    }

    const [product] = await db.raw(`SELECT * FROM products WHERE id = "${id}"`)
    
    if(product) {
        await db.raw(`
            UPDATE products SET
            id = "${newId || product.id}", name = "${newName || product.name}", price = "${newPrice || product.price}", description = "${newDescription || product.description}", image_url = "${newImageUrl || product.imageUrl}"
            WHERE id = "${id}"
        `)
    } else {
        res.statusCode = 400;
        throw new Error("Id não encontrado")
    }

    // const product: TProducts | undefined = products.find((product) => product.id === id);

    // product.id = newId || product.id
    // product.name = newName || product.name
    // product.description = newDescription || product.description
    // product.imageUrl = newImageUrl || product.imageUrl

    // product.price = isNaN(newPrice) ? product.price : newPrice


    res.status(200).send({ message: "Produto atualizado com sucesso" });
    }

    // try {
    //     const id: string = req.params.id

    // const productIndex: number = products.findIndex((product) => product.id === id);
    
    //     if (productIndex < 0) {
    //         res.statusCode = 404;
    //         throw new Error("Produto não encontrado.");
    //     }

    // const newId = req.body.id as string | undefined
    // const newName = req.body.name as string | undefined
    // const newPrice = req.body.price as number | undefined
    // const newDescription = req.body.description as string | undefined
    // const newImageUrl = req.body.imageUrl as string | undefined

    // // if (typeof newId !== "string") {
	// // 		res.statusCode = 400;
    // //         throw new Error("'id' deve ser uma string");
    // // }

    // if (typeof newName !== "string") {
	// 		res.statusCode = 404;
    //         throw new Error("'name' deve ser uma string");
    // }

    // if (newName.length < 3) {
    //     res.statusCode = 404;
    //     throw new Error('O nome deve conter ao menos 3 caracteres!')
    // }

    // if (typeof newPrice !== "number" && newPrice < 0) {
    //     res.statusCode = 404;
    //     throw new Error("'newPrice' deve ser tipo 'number' e maior do que zero")
    // }

    // if (newDescription.length > 26) {
    //     res.statusCode = 404;
    //     throw new Error('A descrição do produto não deve conter mais de 26 caracteres!')
    // }

    // const product: TProducts | undefined = products.find((product) => product.id === id);

    // product.id = newId || product.id
    // product.name = newName || product.name
    // product.description = newDescription || product.description
    // product.imageUrl = newImageUrl || product.imageUrl

    // product.price = isNaN(newPrice) ? product.price : newPrice


    // res.status(200).send({ message: "Produto atualizado com sucesso" });
    catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        }
    }
})

// LINK DOC POSTMAN: https://documenter.getpostman.com/view/28316405/2s9YJdXNkv



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
