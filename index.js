const express = require("express");
const mongoose = require("mongoose");
const Product = require('./models/product.model.js');

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Node Server!");
});

app.get('/api/products', async (req, res) => {

  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: error.message});
  }

})

app.post('/api/products', async (req, res) => {
    try {
      const product =  await Product.create(req.body);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
});

mongoose
  .connect(
    "mongodb+srv://guka19:Guka2004!@backendapi.8serxvf.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendAPI"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("server is listening on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });
