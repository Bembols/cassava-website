const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbyeNg00TNwvKwB59_eAo7YmrYM5V5VMx4NVHDh_Jnn-DPoxU17HdUWaJpFfPI9XMoHuPg/exec";

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// Receive orders
app.post("/order", async (req, res) => {
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

    try {
        await fetch(GOOGLE_SHEET_URL, {
            method: "POST",
            body: JSON.stringify(newOrder)
        });

        res.status(201).json({
            success: true,
            message: "Order received successfully!",
            order: newOrder
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to save order" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});