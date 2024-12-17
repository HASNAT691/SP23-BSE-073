const express = require('express');
const mongoose = require('mongoose');
const Cart = require('../models/cart'); // Your Cart model
const Product = require('../models/product'); // Your Product model

const router = express.Router();

// Route to add product to cart
router.post('/add-to-cart', async (req, res) => {
    const { productId, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).send("Invalid Product ID");
    }

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).send("Product not found");
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = new Cart({ userId, items: [], totalPrice: 0 });
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if the product is already in the cart
    } else {
        cart.items.push({ productId: product._id, quantity: 1 });
    }

    // Update total price
    cart.totalPrice = cart.items.reduce(async (total, item) => {
        const itemProduct = await Product.findById(item.productId);
        return total + (item.quantity * itemProduct.price);
    }, 0);

    await cart.save();
    res.status(200).send({ message: "Product added to cart", cart });
});

module.exports = router;
