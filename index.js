const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');

app.use(express.json());


app.listen(3000, () => {
        console.log('Serve is running on port 3000');
});

app.get('/',(req, res) => {
    res.send('Hello from Node API ')
});

app.get('/api/products',async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});


mongoose.connect("mongodb+srv://benjaminyangcareer:ruibiao725@backenddb.v4mvq.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(() => {
    console.log("Connected to database!");
})
.catch(() => {
    console.log("Connection Failed!");
});