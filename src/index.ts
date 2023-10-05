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

app.get("/users", (req: Request, res: Response): void => {
    try {
        const result: TUsers[] = users;
    
        res.status(200).send(result);
        
    } catch (error) {
        res.send(error.message)
    }
})

app.get("/products", (req: Request, res: Response): void => {
    try {
        const result: TProducts[] = products;
    
        res.status(200).send(result);

    } catch (error) {
        res.send(error.message)        
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

app.post("/users", (req: Request, res: Response) => {

    try {
        const { id, name, email, password } = req.body;

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

        if (password.includes(Number.length >= 1)) {
            res.statusCode = 404
            throw new Error('O password deve conter ao menos 1 caracter numérico!')
        }
    
        const newUser: TUsers = {
            id,
            name,
            email,
            password,
            createdAt: new Date().toISOString()
        };
        users.push(newUser)    //OU CHAMANDO A FUNÇÃO COMO FEITO ABAIXO
    
        // const newUser = createUser(id, name, email, password);
    
        res.status(201).send("Cadastro realizado com sucesso");
        
    } catch (error) {
        res.send(error.message)
    }

})

app.post("/products", (req: Request, res: Response) => {
    try {
        const { id, name, price, description, imageUrl } = req.body;

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
        
    } catch (error) {
        res.send(error.message)
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

app.put("/products/:id", (req: Request, res: Response): void => {
    try {
        const id: string = req.params.id

    const productIndex: number = products.findIndex((product) => product.id === id);
    
        if (productIndex < 0) {
            res.statusCode = 404;
            throw new Error("Produto não encontrado.");
        }

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined
    const newImageUrl = req.body.imageUrl as string | undefined

    // if (typeof newId !== "string") {
	// 		res.statusCode = 400;
    //         throw new Error("'id' deve ser uma string");
    // }

    if (typeof newName !== "string") {
			res.statusCode = 404;
            throw new Error("'name' deve ser uma string");
    }

    if (newName.length < 3) {
        res.statusCode = 404;
        throw new Error('O nome deve conter ao menos 3 caracteres!')
    }

    if (typeof newPrice !== "number" && newPrice < 0) {
        res.statusCode = 404;
        throw new Error("'newPrice' deve ser tipo 'number' e maior do que zero")
    }

    if (newDescription.length > 26) {
        res.statusCode = 404;
        throw new Error('A descrição do produto não deve conter mais de 26 caracteres!')
    }

    const product: TProducts | undefined = products.find((product) => product.id === id);

    product.id = newId || product.id
    product.name = newName || product.name
    product.description = newDescription || product.description
    product.imageUrl = newImageUrl || product.imageUrl

    product.price = isNaN(newPrice) ? product.price : newPrice


    res.status(200).send({ message: "Produto atualizado com sucesso" });
    } catch (error) {
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
