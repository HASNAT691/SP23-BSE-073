const express = require('express');
const bcrypt = require('bcrypt');



const mongoose = require('mongoose');

const app = express();

const loggers = require('../../models/login.model');

const productController = require("../../routes/admin/products.controller");
app.use(productController);

// Convert data into JSON format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
    res.render("homepage");
});

app.get("/signup", (req, res) => {
    res.render("admin/admin_signup");
});

// Register user
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    // Check if user already exists
    const existingUser = await loggers.findOne({ name: data.name });
    if (existingUser) {
        return res.send("User already exists. Please choose a different username.");
    }

    //check if email already exists
    const existingMail = await loggers.findOne({ email: data.email });
    if (existingMail) {
        return res.send("Email already exists. Please choose a different email.");
    }
    else {
        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;

        const userdata = new loggers(data);
        await userdata.save();
        console.log(userdata);
    }

    res.redirect('/admin_login');
});

// Serve the login page
app.get("/admin_login", (req, res) => {
    res.render("admin/admin_Login");
});


// Login user
app.post("/admin_login", async (req, res) => {
    try {
        const check = await loggers.findOne({ name: req.body.username });
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

    return res.redirect("/admin/products");
});
module.exports = app;