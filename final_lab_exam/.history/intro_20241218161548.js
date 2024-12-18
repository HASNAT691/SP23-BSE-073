const express = require("express");
const router=express.Router();
const mongoose = require("mongoose");
const order =require('../models/order');
var expressLayouts = require("express-ejs-layouts");
let server = express();
server.set("view engine", "ejs");
server.use(expressLayouts);
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
// let cookieParser = require("cookie-parser");
// server.use(cookieParser());

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
// server.get('/cart',async(req,res)=>{
  
//   let cart=req.cookies.cart;
//   cart=cart ? cart : [];
//   let product = await Product.find({_id:{$in:cart}});
//   return res.render("cart",{
//     products:product
//   })
// })


// server.get("/cart/:id",async(req,res)=>{
//   let cart=req.cookies.cart;
//   cart=cart?cart:[];
//   cart.push(req.params.id);
//   res.cookie("cart",cart);
//   return res.redirect("/cart");
// })

router.post('/orders', async (req, res)=>{
  try{
    const {customer,items,total,date} =req.body;

    if(!customer||!items||total==null){
      return res.status(400).json({message: 'invalid order data'});

    }

    const newOrder = new order({customer,items,total,date});
    await newOrder.save();
    return res.status(201).json({message:'order placed successfully', order: newOrder});
  } catch (error){
    console.error(error);
    res.status(500).json({message:'server error'});
  }
});

module.exports=router;



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