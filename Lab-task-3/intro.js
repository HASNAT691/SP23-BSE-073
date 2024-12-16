const express = require("express");
const mongoose = require("mongoose");
var expressLayouts = require("express-ejs-layouts");
let server = express();
server.set("view engine", "ejs");
server.use(expressLayouts);
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));

let adminProductsRouter = require("./routes/admin/products.controller");
server.use(adminProductsRouter);

server.get("/about-me", (req, res) => {
  return res.render("about-me");
});
server.get("/", (req, res) => {
  return res.send(res.render("homepage"));
});
server.listen(5000, () => {
  console.log(`Server Started at localhost:5000`);
});
let connectionString = "mongodb://localhost:27017/webProject";
mongoose.connect(connectionString)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database Connection Error");
  });
