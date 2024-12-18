const express = require("express");
let router = express.Router();
let Product=require('../../models/product.model');

///route to render create product form

router.get("/admin/createProducts", (req, res) => {
   res.render("admin/createProducts", {
    layout: "adminlayout",
    pageTitle: "Manage Your Products"
  });
});

///route to handle create product form submission
// demonstrate PRG design pattern (post redirect GET)
router.post("/admin/createProducts", async (req, res) => {
  let product = new Product(req.body);
  console.log(product)
  await product.save();
  res.redirect("/admin/products");
  
  ///we will send data to model to save in database

  // return res.send(newproduct);
  //return res.render("admin/product-form", {layout: "adminlayout",pageTitle: "Manage Your Products", products,  }) 
});

///route for available products
router.get("/admin/availableProducts", async (req, res) => {
  let product = await Product.find();
  res.render("admin/availableProducts", {
    layout: "adminlayout",
    pageTitle: "Manage Your Products",
    product
  })
  
})


router.get("/admin/products", async(req, res) => {
  
  let product = await Product.find();
 return res.render("admin/products", {
   layout: "adminlayout",
   pageTitle: "Manage Your Products",
   product
 })
}); 

router.get("/admin/products/edit/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  res.render("admin/edit_product", {
    layout: "adminlayout",
    pageTitle: "Manage Your Products",product})
  });
//To update
  router.post("/admin/products/edit/:id", async (req, res) => {
    let product = await Product.findById(req.params.id);
    product.title = req.body.title;
    product.price = req.body.price;
    product.description = req.body.description;
    await product.save();
    return res.redirect("/admin/products");
  });

  //To delete
  router.get("/admin/products/delete/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    return res.redirect("/admin/products");
  });
module.exports = router;