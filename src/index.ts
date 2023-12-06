import { users, products, createUser, getAllUsers, createProduct, getAllProducts, searchProductsByName } from "./database";
import express, { Request, Response } from 'express'

//import do CORS 
import cors from 'cors';
import { TProducts, TPurchases, TPurchasesProducts, TUsers } from "./types";
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

        // const result = await db.raw(`SELECT * FROM users`)
        const result = await db('users')

        // const result: TUsers[] = users;

        res.status(200).send(result);

    } catch (error: any) {

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.post("/users", async (req: Request, res: Response) => {

    try {
        const { id, name, email, password }: TUsers = req.body;

        if (!id || !name || !email || !password) {
            res.status(400)
            throw new Error("Preencha todos os dados!")
        }

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

        
        const newUser = {
            id,
            name,
            email,
            password
        }
        await db('users').insert(newUser)

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

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;

        if (!id || id.length !== 5) {
            res.status(400).send("Informe um 'id' de 5 caracteres.");
            return;
        }

        const [user] = await db("users").where({ id });

        if (user) {
            await db("users").where({ id }).delete();
            res.status(200).send("Usuário deletado com sucesso");
        } else {
            res.status(404).send("Usuário não encontrado");
        }

        // const userIndex: number = users.findIndex((user) => user.id === id);

        // if (userIndex < 0) {
        //     res.statusCode = 400;
        //     throw new Error("Conta não encontrada.");
        // } else {
        //     users.splice(userIndex, 1);
        // };

        // res.status(200).send({ message: "User apagado com sucesso" });        
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
        };
    };

});

app.get("/products", async (req: Request, res: Response) => {
    try {

        // const result = await db.raw(`SELECT * FROM products`)
        const result: TProducts[] = await db('products')

        // const result: TProducts[] = products;

        res.status(200).send(result);

    } catch (error: any) {

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get("/products/search", async (req: Request, res: Response) => {
    try {
        const q: string = req.query.q as string || undefined;

        if (q) {
            const result: TProducts[] = await db("products")
                .where("name", "LIKE", `%${q}%`)

            res.status(200).send(result)
        } else {
            const result: TProducts[] = await db("products")

            res.status(200).send(result)
        }

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
        };
    }
})

app.post("/products", async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, image_url } = req.body;

        if (!id) {
            res.statusCode = 404;
            throw new Error(`O campo do 'id' é obrigatório`);
          }
      
          if (!name) {
            res.statusCode = 404;
            throw new Error(`O campo do 'name' é obrigatório`);
          }
      
          if (!price) {
            res.statusCode = 404;
            throw new Error(`O campo do 'price' é obrigatório`);
          }
      
          if (!description) {
            res.statusCode = 404;
            throw new Error(`O campo de 'description' é obrigatório`);
          }
      
          if (!image_url) {
            res.statusCode = 404;
            throw new Error(`O campo de 'image_url' é obrigatório`);
          }

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

        if (typeof image_url !== "string") {
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

        const productWithSameId = await db.raw(
            "SELECT * FROM products WHERE id = ?",
            [id]
          );
      
          if (productWithSameId.length > 0) {
            res.status(400).send(`Já existe um produto com o mesmo 'id' ${id}.`);
            return;
          }

        // await db.raw(`INSERT INTO products
        //     VALUES("${id}", "${name}", "${price}", "${description}", "${imageUrl}")
        // `)

        const newProduct = {
            id,
            name,
            price,
            description,
            image_url
        };
        await db('products').insert(newProduct)

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

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
    
        const newId = req.body.newId as string | undefined;
        const newName = req.body.newName as string | undefined;
        const newPrice = req.body.newPrice as number | undefined;
        const newDescription = req.body.newDescription as string | undefined;
        const newImageUrl = req.body.newImageUrl as string | undefined;
    
        const [product] = await db.raw("SELECT * FROM products WHERE id = ?", [id]);
    
        if (product.length === 0) {
          res.statusCode = 404;
          throw new Error(`Esse produto não existe`);
        }
    
        if (newName?.length === 0) {
          res.statusCode = 404;
          throw new Error("Novo produto deve ter mais que 1 caracter");
        }
    
        if (newPrice !== undefined && newPrice <= 0) {
          res.statusCode = 404;
          throw new Error("Novo preço menor que R$ 1");
        }
    
        if (newDescription?.length === 0) {
          res.statusCode = 404;
          throw new Error("Nova descrição deve ter mais que 1 caracter");
        }
    
        const [newProduct] = await db.raw(
          `SELECT * FROM products WHERE id = "${id}"`
        );
    
        if (newProduct) {
          await db.raw(`UPDATE products SET
          id = "${newId || newProduct.id}",
          name = "${newName || newProduct.name}",
          price = "${newPrice || newProduct.price}",
          description = "${newDescription || newProduct.description}",
          image_Url = "${newImageUrl || newProduct.image_Url}"
          WHERE id = "${id}"
          `);
    
          res.status(200).send("Produto editado com sucesso");
        }
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        }
    }
})

app.delete("/products/:id", async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;

        if (typeof id !== "string" || id.length !== 6) {
            res.status(400).send({ message: "Informe um 'id' de 6 caracteres." });
            return;  
          }
      
          const productIndex = await db("products").where({ id });

        // const productIndex: number = products.findIndex((product) => product.id === id);

        if (productIndex.length === 0) {
            res.statusCode = 400;
            throw new Error("Produto não encontrado.");
        } else {
            await db("products").where({ id }).delete();
            res.status(200).send({ message: "Produto deletado com sucesso" })
        }

        // res.status(200).send({ message: "Produto apagado com sucesso" });
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
        };
    };

})

app.get("/purchases", async (req: Request, res: Response) => {
    try {

        // const result = await db.raw(`SELECT * FROM purchases`)

        const result = await db('purchases')

        res.status(200).send(result);

    } catch (error: any) {

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {

        const id: string = req.params.id

        if (!id) {
            res.status(404)
            throw new Error("O pedido não foi encontrado")
        }

        const [searchPurchase] = await db("purchases")
        .select(
            "purchases.id as purchaiseId",
            "buyer as buyerId",
            "users.name as buyerName",
            "users.email as buyerEmail",
            "purchases.total_price as totalPrice",
            "purchases.created_at as createdAt"
        )
        .innerJoin("users", "purchases.buyer", "=", "users.id")
        .where({"purchases.id": id})

        const resultProducts = await db("purchases_products")
      .select(
        "product_id as idProduct",
        "name as nameProduct",
        "price as priceProduct",
        "description as descriptionProduct",
        "image_url as imageUrlProducts",
        "quantity as qtnd"
      )
      .innerJoin(
        "products",
        "purchases_products.product_id",
        "=",
        "products.id"
      )
      .where({ "purchases_products.purchase_id": id });

        const result = {
            ...searchPurchase,
            products: resultProducts,
          };

        res.status(200).send(result);
    
    } catch (error: any) {

        if (req.statusCode === 200) {
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

        const { id, buyer, products } = req.body;

    if (
      typeof id === "string" &&
      typeof buyer === "string"
    ) {
      // Verifica se o usuário existe
      const userExists = await db('users')
        .select('id')
        .where('id', buyer)
        .first();

      if (!userExists) {
        throw new Error("O usuário não existe.");
      }

      // Verifica se o purchase ID já existe
      const idExists = await db('purchases')
        .select('id')
        .where('id', id)
        .first();

      if (idExists) {
        throw new Error("Já existe um pedido com o mesmo ID. Insira um ID diferente.");
      }

      let total_price = 0

      for(let product of products ) {
        const [productDB]: TProducts[] = await db('products').select().where({id: product.id})
        total_price += productDB.price*product.quantity
      }

      // Insere a compra no banco de dados
      await db('purchases').insert({
        id : id,
        buyer,
        total_price,
      });

      for(let product of products ) {
        const purchaseProduct: TPurchasesProducts = {
            product_id: product.id,
            purchase_id: id,
            quantity: product.quantity
        }

        await db('purchases_products').insert(purchaseProduct)
      }


      // Responde com sucesso
      return res.status(201).send("Pedido realizado com sucesso!");
    } else {
      throw new Error("Os dados devem ser do formato correto (string para 'buyer' e número para 'quantity').");
    }
        
    } catch (error: any) {

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
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


















// const setTimeout = () => {
//     console.table(users);
//     console.table(products);
// };

// setTimeout()


// console.log(createUser("u003", "Astrodev", "astrodev@email.com", "astrodev99"))

// console.log(getAllUsers())

// console.log(createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://images.unsplash.com/photo"))

// console.log(getAllProducts())

// console.log(searchProductsByName("gamer"))
