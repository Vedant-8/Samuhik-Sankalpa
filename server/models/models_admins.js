const mongoose=require("mongoose");

const admins= new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    points_required: {
        type: Number,
        required: true,
    },

    type: {
        type: String,
        enum: ['discount', 'certificate', 'event_access'], // Limited to specific reward types
        required: true,
    },

    partner_organization: {
        type: String,
        required: true,
    },
 });


const model_admins= mongoose.model("admins", admins);

module.exports={model_admins};