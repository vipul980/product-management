require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const checkLogin = require("../middleware/checkLogin");
const bcrypt = require("bcrypt");


const User = require("../model/user");

const saltRounds = 10;

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true});



const privateKey = process.env.SECRET_KEY;

//Default user register and login route
router.get("/",checkLogin, function(req, res){
    
    res.render('main', {layouts: 'login', title: "User login"});
    
       bcrypt.hash(process.env.DEFAULT_PASSWORD, saltRounds, function(err, hash){
        const defaultUser = new User({
            email: "123@gmail.com",
            password: hash
        });
    
        User.findOne({email:"123@gmail.com"}, function(err, foundUser){
    
            if(!foundUser){
            defaultUser.save(function(err){
                
                
                if(err){
                    res.send(err);
                    console.log(err);
                } else {
                    console.log("defaultUser created");
                }
        
            });
         } if(foundUser) {
            
                    bcrypt.compare(req.body.password, foundUser.password).then((match) => {
                        if(match) {
                            const payload = {
                                email: foundUser.email,
                                password: foundUser.password
                            }
                            const token = jwt.sign(payload, privateKey);
                            console.log("defaultUser token:", token);
                            res.cookie('qwertz', token);
                            res.redirect("/products");
                        }
                    }).catch((err) => {
                        res.json({status:400, data:null, message:"User Authentication Failed"})
                    
                    }) 
                }
            })
            
        })
    });






//New user login section

router.post("/",checkLogin, async function(req, res){

    const user_email = req.body.email;
    const user_password = req.body.password;
    console.log(user_email);
    console.log(user_password);

    User.findOne({email: user_email}).then((foundUser) => {
        console.log(foundUser);
        if(foundUser){
            console.log(foundUser.password);
           bcrypt.compare(req.body.password, foundUser.password).then((match) => {
            if(match){
                const payload = {
                    email: foundUser.email,
                    password: foundUser.password
                };

                const token = jwt.sign(payload, privateKey);
                console.log("token", token);
                res.cookie('qwertz', token);
                res.redirect("/products");


            } else {
                console.log(err);
                res.send(err);
            }
        
    }).catch((err) => {
        res.json({status:400, data:null, message:"User Authentication Failed"})
    
    }) 
    

        }
    })
          
      
      
    

    


});

module.exports = router;          