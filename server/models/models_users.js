const mongoose=require("mongoose");

const users= new mongoose.Schema({

    name: {
        type:String,
        
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    phno: {
        type: Number,
        required: true,
        
    },

    password: {
        type:String,
    },

    role: {
        type:String
        
    },

    
    wishlist_projects: [
        {project_id: String}
    ],

   
    points: {
        type: Number,
        
    },
    
    badges: {
        type: String,
    },

    donations: [
        {
            project_id: Number,
            org_id: Number,
            amount: Number,
            date: 
            {
                type: Date,
                default: Date.now,
            }
        }
    ],

    volunteer_history: [
        {
            project_id: String,
            role: String,
            date: 
            {
                type: Date,
                default: Date.now,
            }
        }
    ],

    impact_tracking: [
        {
            co2_reduction: Number,
            trees_planted: Number,
            water_saved: Number,
        }
    ],

 });


const model_users= mongoose.model("users1", users);

module.exports={model_users};