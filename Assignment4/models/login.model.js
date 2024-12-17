const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
    name: { // Added the `name` field
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength:[8],
        maxlength:[100],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
    
});

// Define the model for the collection "loggers"
const collection = mongoose.model("loggers", LoginSchema);

module.exports = collection;
