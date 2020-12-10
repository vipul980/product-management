
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const Product = require("../model/product");
const favProduct = require("../model/wishlist");



router.post("/createProducts", (req, res) => {

   const newProduct = new Product({
    image : req.body.image,
    productName : req.body.productName,
    description : req.body.description,
    price : req.body.price
   });
  
  

  newProduct.save().then((products) => {
    //console.log(products);
    res.json({status:200, data: products, message: "product created"});
  }).catch((err) => {
    res.json({status: 400, data:null, message: "product not created" });
  })
});

router.get("/",async function(req, res){
    
const foundProducts = await Product.find({}).lean(); 
//console.log(foundProducts);
 
   res.render('home', {layout: 'products', title: 'User Home', data:foundProducts, mode:"product_page"});
 
   
  
    

});

router.get("/favouriteProducts/:idNum", (req, res) => {
  var id = req.params.idNum
  console.log(id);
  Product.findById(id, function(err,foundFavProducts){
    if(foundFavProducts){
      const favourites = new favProduct({
        product_id: foundFavProducts._id,
        image: foundFavProducts.image,
        productName: foundFavProducts.productName,
        description: foundFavProducts.description,
        price: foundFavProducts.price
      });
      favourites.save().then((products) =>{
        //console.log(products);
        res.json({status:200, data:products, message:"saved product successfully"});
      } ).catch((err) => {
        res.json({status:400, data:null, message:"product could not be saved"});
      })
    } else{
      console.log(err);
    }
  });
  
  res.redirect("/products");
});

router.get("/favouriteProducts", async (req, res) => {
  const foundfavProduct = await favProduct.find({}).lean();

  res.render('home', {layout: 'products', title: "Saved Products", data: foundfavProduct, mode: "wishlist_page"});
});

router.get("/removeFavProducts/:idNum", (req, res) => {
  console.log(req.params.idNum);
  var delete_id = req.params.idNum;
 favProduct.findById(delete_id).then((foundFavProduct) => {
   favProduct.findByIdAndDelete(delete_id).then((result) => {
     //res.json({status:200, message:"Product Deleted successfully"});

      res.redirect("/products/favouriteProducts");
    }).catch((err) => {
     res.json({status:400, message:"product could not be deleted"});
   })
 })
 

 });



//logout section
router.get("/logout", function(req, res){
    res.cookie('qwertz', {}, {maxAge: -1});
    res.redirect("/");
});







module.exports = router;


