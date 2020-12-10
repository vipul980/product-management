const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    image: {
        type: String
    },
    productName: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: String
    }
});

const Product = new mongoose.model('Product', productsSchema);

module.exports = Product;