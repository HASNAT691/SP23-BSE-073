const express = require('express');
const bcrypt = require('bcrypt');

const Product = require('./product');

const mongoose = require('mongoose');

const app = express();

// Convert data into JSON format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// Register user
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    // Check if user already exists
    const existingUser = await collection.findOne({ name: data.name });
    if (existingUser) {
        return res.send("User already exists. Please choose a different username.");
    }

    //check if email already exists
    const existingMail = await collection.findOne({ email: data.email });
    if (existingMail) {
        return res.send("Email already exists. Please choose a different email.");
    }
    
    
    else {
        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;

        const userdata = new collection(data);
        await userdata.save();
        console.log(userdata);
    }

    res.redirect('/');
});

// Serve the login page
app.get("/login", (req, res) => {
    res.render("login");
});

// Login user
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            return res.send("User name not found");
        }

        // Compare hashed password from the database with plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            return res.render("home"); // Correctly render the home page
        } else {
            return res.send("Wrong password");
        }
    } catch (error) {
        console.error(error);
        return res.send("An error occurred while processing your login details");
    }
});
