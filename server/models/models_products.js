const mongoose=require("mongoose");

const products= new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    

    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    stock: {
        type: Number, // Integer for stock quantity
        required: true,
    },

    discount_codes: [
        {
            code: {
                type: String, // Discount code
                required: true,
            },
            discount: {
                type: Number, // Discount percentage
                required: true,
            }
        }
    ],

    category: {
        type: String,
        required: true,
    },
 });


const model_products= mongoose.model("products", products);

module.exports={model_products};