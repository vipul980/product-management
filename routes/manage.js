const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const Product = require("../model/product");
const favProduct = require("../model/wishlist");
const User = require("../model/user");

router.get("/manageAll",authenticate,  async (req, res) => {
    const user =await User.find({userRole: {$in: ["user", "Admin"]}}).lean();
    
    if (req.userData.userRole === "superAdmin") {

        res.render('control', {layout:'products', title: "Super Admin Panel", mode: "Control_page", data: user});
    }
    if (req.userData.userRole === "Admin") {
        res.json({status: 400, message: "Only Super Admin can access"});
    }
});

router.get("/manage_delete/:idNum", (req, res) => {
    var delete_id = req.params.idNum;
    console.log(delete_id);
    User.findByIdAndDelete(delete_id).then((deleted) => {
        res.redirect("/manage/manageAll");
        //res.json({status: 200, message: "Deleted successfully"})
    }).catch((err) => {
        res.send(err);
    })
})
    
 

router.post("/", function(req, res){

})

module.exports = router