const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true, 
    },// Removes leading and trailing whitespace    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"], // Minimum value
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        
    },
}, {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields automatically
});

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;
