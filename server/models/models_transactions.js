const mongoose=require("mongoose");

const transactions= new mongoose.Schema({

    user_id: {
        type: String, // User ID
        required: true,
    },

    campaign_id: {
        type: String, // Campaign ID
        required: true,
    },

    amount: {
        type: Number, // Donation amount
        required: true,
    },

    payment_method: {
        type: String, // Payment method
        required: true,
    },

    date: {
        type: Date, // Timestamp for the donation
        default: Date.now, // Automatically set the current date
        required: true,
    },

    status: {
        type: String,
        enum: ['success', 'failure'], // Limited to specific statuses
        required: true,
    },
 });


const model_transactions= mongoose.model("transactions", transactions);

module.exports={model_transactions};