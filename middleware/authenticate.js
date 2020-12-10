const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.SECRET_KEY;

module.exports = (req, res) => {
    try {
        const token = req.cookies['qwertz'];
        console.log(token);
        if(token){
            const decoded_token = jwt.verify(token, JWT_SECRET);
            req.userData = {
                email: decoded_token.email,
                password: decoded_token.password
            } 
            console.log(req.userData.email);
        }
    } catch(err) {
        res.json({status: 400, data: null, message: "User Authentication failed"});
    }
}