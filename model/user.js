const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    userRole: {
        type: String,
        required: [true, 'user role required'],
        enum: ["user", "superAdmin", "Admin"],
        
    }
});

const User = new mongoose.model('User', userSchema);

module.exports = User;