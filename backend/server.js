const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// Receive orders / messages
app.post("/order", (req, res) => {
    const { name, product, quantity, message } = req.body;

    if (!name || !product || !quantity) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const newOrder = {
        id: Date.now(),
        name,
        product,
        quantity,
        message,
        date: new Date().toISOString()
    };

    // Read existing orders
    const orders = JSON.parse(fs.readFileSync("orders.json", "utf8"));

    // Add new order
    orders.push(newOrder);

    // Save back to file
    fs.writeFileSync("orders.json", JSON.stringify(orders, null, 2));

    res.status(201).json({
        success: true,
        message: "Order received successfully!",
        order: newOrder
    });
});

// Get all orders (ADMIN USE)
app.get("/orders", (req, res) => {
    const orders = JSON.parse(fs.readFileSync("orders.json", "utf8"));
    res.json(orders);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
