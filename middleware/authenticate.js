const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
    try {
        const token = req.cookies['qwertz'];
        console.log(token);
        if(token){
            const decoded_token = jwt.verify(token, JWT_SECRET);
            req.userData = {
                email: decoded_token.email,
                password: decoded_token.password,
                userRole: decoded_token.userRole
            } 
            
            console.log(req.userData);
        }
        next();
    } catch(err) {
        res.json({status: 400, data: null, message: "User Authentication failed"});
    }
}