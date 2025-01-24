const mongoose=require("mongoose");

const volunteers= new mongoose.Schema({

    id: {
        type: Number,
       
    },

    name: {
        type: String,
       
    },

    details: {
        type: String,
        
    },

    project: {
        type: String,
        
    },

    org: {
        type: String,
        
    },
    location: {
        type: String,
        
    },

    hours_worked: {
        type: Number,
       
    },

   
 });


const model_volunteers= mongoose.model("volunteers", volunteers);

module.exports={model_volunteers};