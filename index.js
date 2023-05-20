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

    /** Data Oparetions */

    /** Shop By Category GET */
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
