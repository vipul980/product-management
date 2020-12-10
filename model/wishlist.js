const mongoose = require("mongoose");

const favProductsSchema = new mongoose.Schema({
    product_id: {
        type: String
    },
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


const favProduct = new mongoose.model('favProduct', favProductsSchema);

module.exports = favProduct;