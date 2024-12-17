const express = require("express");
const mongoose = require("mongoose");
var expressLayouts = require("express-ejs-layouts");
let server = express();
server.set("view engine", "ejs");
server.use(expressLayouts);
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));

let Product=require('./models/product.model');


let adminProductsRouter = require("./routes/admin/products.controller");
server.use(adminProductsRouter);
let loginRouter = require("./routes/admin/login.router")
server.use(loginRouter)

server.get("/about-me", (req, res) => {
  return res.render("about-me");
});
server.get("/", (req, res) => {
  res.render("homepage");
});
//setting routes for getting and rendering cart view page along with products added to cart
server.get('/cart',async(req,res)=>{
  let product = await Product.find();
  return res.render("cart",{
    products:product
  })
})


server.listen(5000, () => {
  console.log(`Server Started at localhost:5000`);
});
let connectionString = "mongodb://127.0.0.1:27017/users";

mongoose.connect(connectionString)

  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database Connection Error: " 
    +err);
  });
////mongodb://localhost:27017/users