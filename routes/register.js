const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");




router.get("/", function(req, res){
    res.render('register', {layouts: 'login', title: "User Register"});
});

//New user registeration section
router.post("/", async function(req, res){
    const salt = await bcrypt.genSalt();
    
    const hash = await bcrypt.hash(req.body.password, salt)

        const newUsers = new User({
            email: req.body.email,
            password: hash
        });
        console.log(newUsers);
    
        newUsers.save(function(err){
            if(!err){
                console.log("New User registered successfully");
                res.redirect("/");
            } else {
                console.log(err);
            }
        })

    })

    


module.exports = router;