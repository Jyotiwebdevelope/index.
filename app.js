// app.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

let items = [
    
        { id: 1,
             name: "Pepperoni Pizza",
              price: 12.99 
            },
        
            { id: 2,
                name: "Margherita Pizza",
                 price: 11.49
                },
        {
             id: 3, 
            name: "BBQ Chicken Pizza", 
            price: 13.99 
        },
        { 
            id: 4,
             name: "Vegetarian Pizza",
              price: 14.99 
            },
        { 
            id: 5,
             name: "Hawaiian Pizza",
              price: 12.49
             }
    
    
]; // In-memory store

// Routes
app.post('/items', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    res.status(201).json(newItem);
});

app.get('/items', (req, res) => {
    res.json(items);
});

app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(i => i.id === id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).send('Item not found');
    }
});

app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
        items[index] = req.body;
        res.json(items[index]);
    } else {
        res.status(404).send('Item not found');
    }
});

app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
        items.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Item not found');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
