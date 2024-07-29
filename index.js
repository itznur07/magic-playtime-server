const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

/** Middlewares here */

app.use(cors("*"));
app.use(express.json());
/** Middlewares ends here */

/** MongoDB Database Connection */
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@todos.ukwfq5e.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    const carCollection = client.db("Categorys").collection("cartoys");
    const sportsCollection = client.db("Categorys").collection("sportstoys");
    const dollCollection = client.db("Categorys").collection("dolltoys");
    const allToysCollection = client.db("Categorys").collection("alltoys");
    const myToysCollection = client.db("Categorys").collection("mytoys");
    const productsCollection = client.db("Categorys").collection("products");
    const blogsCollection = client.db("Categorys").collection("blogs");
    const cartsCollection = client.db("Categorys").collection("carts");
    const wishlistsCollection = client.db("Categorys").collection("wishlists");
    const compareCollection = client.db("Categorys").collection("compares");

    /** Data Oparetions */
    /** Shop By Category GET */

    app.get("/alltoys", async (req, res) => {
      const result = await allToysCollection.find().toArray();
      res.send(result);
    });

    app.get("/mytoys", async (req, res) => {
      const result = await myToysCollection.find().toArray();
      res.send(result);
    });

    app.get("/carts", async (req, res) => {
      const result = await cartsCollection.find().toArray();
      res.send(result);
    });

    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartsCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/wishlists", async (req, res) => {
      const result = await wishlistsCollection.find().toArray();
      res.send(result);
    });

    app.get("/products", async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result);
    });

    app.get("/blogs", async (req, res) => {
      const result = await blogsCollection.find().toArray();
      res.send(result);
    });

    app.post("/mytoys", async (req, res) => {
      const toyData = req.body;
      const result = await myToysCollection.insertOne(toyData);
      res.send(result);
    });

    app.post("/compares", async (req, res) => {
      const compareData = req.body;
      const compareDatas = await compareCollection.find().toArray();
      const existData = await compareCollection.findOne(compareData);

      if (compareDatas.length > 3) {
        res.status(400).json({ message: "Compare list limit exceeded" });
        return;
      }

      if (!existData) {
        const result = await compareCollection.insertOne(compareData);
        res.send(result);
      } else {
        res.status(400).json({ message: "Data already exists" });
        return;
      }
    });

    // remove data from compare collection
    app.delete("/compares/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await compareCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/compares", async (req, res) => {
      const result = await compareCollection.find().toArray();
      res.send(result);
    });

    app.post("/products", async (req, res) => {
      const product = req.body;
      const exisData = await productsCollection.findOne(product);

      if (!exisData) {
        const result = await productsCollection.insertOne(product);
        res.send(result);
      } else {
        res.status(400).json({ meesage: "Data already exists" });
        return;
      }
    });

    app.post("/carts", async (req, res) => {
      const product = req.body;
      const existData = await cartsCollection.findOne(product);
      if (!existData) {
        const result = await cartsCollection.insertOne(product);
        res.send(result);
      } else {
        res.status(400).json({ message: "Data already exists" });
        return;
      }
    });

    app.post("/wishlists", async (req, res) => {
      const product = req.body;
      const existData = await wishlistsCollection.findOne(product);
      if (!existData) {
        const result = await wishlistsCollection.insertOne(product);
        res.send(result);
      } else {
        res.status(400).json({ message: "Data already exists" });
        return;
      }
    });

    app.put("/mytoys/:id", async (req, res) => {
      const id = req.params.id;
      const toys = req.body;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateToys = {
        $set: {
          price: toys.price,
          quantity: toys.quantity,
          description: toys.description,
        },
      };

      const result = await myToysCollection.updateOne(
        query,
        updateToys,
        options
      );
      res.send(result);
    });

    app.delete("/mytoys/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await myToysCollection.deleteOne(query);
      res.send(result);
    });

    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartsCollection.deleteOne(query);
      res.send(result);
    });

    app.delete("/wishlists/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await wishlistsCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/cartoys", async (req, res) => {
      const result = await carCollection.find().toArray();
      res.send(result);
    });
    app.get("/sportstoys", async (req, res) => {
      const result = await sportsCollection.find().toArray();
      res.send(result);
    });
    app.get("/dolltoys", async (req, res) => {
      const result = await dollCollection.find().toArray();
      res.send(result);
    });

    app.get("/cartoys/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await carCollection.findOne(query);
      res.send(result);
    });

    app.get("/sportstoys/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await sportsCollection.findOne(query);
      res.send(result);
    });
    app.get("/dolltoys/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await dollCollection.findOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);
app.get("/", (req, res) => res.send("Toy marketplace server running!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
