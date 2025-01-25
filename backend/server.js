const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database('./products.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');

        // Create table if it doesn't exist
        db.run(
            `CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price TEXT,
                description TEXT
            )`,
            (err) => {
                if (err) {
                    console.error('Error creating table:', err.message);
                }
            }
        );
    }
});

// Endpoint to save product details
app.post('/save-product', (req, res) => {
    const { name, price, description } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Product name is required.' });
    }

    const query = `INSERT INTO products (name, price, description) VALUES (?, ?, ?)`;
    db.run(query, [name, price, description], function (err) {
        if (err) {
            console.error('Error inserting product:', err.message);
            return res.status(500).json({ error: 'Failed to save product.' });
        }

        res.status(200).json({ message: 'Product saved successfully.', id: this.lastID });
    });
});

// Endpoint to get all products
app.get('/products', (req, res) => {
    const query = `SELECT * FROM products`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching products:', err.message);
            return res.status(500).json({ error: 'Failed to fetch products.' });
        }

        res.status(200).json({ products: rows });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
