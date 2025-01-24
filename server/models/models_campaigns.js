const mongoose=require("mongoose");

const campaigns= new mongoose.Schema({

    project_id: {
        type:String,
        
    },

    org_id: {
        type: String,
        
    },

    title: {
        type: String,
        
    },

    description: {
        type: String,
       
    },

    location: {
        type: String,
    

    },

    images: [
        {
            type: String, // Array of image URLs
        }
    ],

    videos: [
        {
            type: String, // Array of video URLs
        }
    ],

    funding_goal: {
        type: Number,
       
    },

    current_funding: {
        type: Number,
        default: 0, // Default to 0 for new projects
    },

    impact_metrics: {
        co2_reduction: {
            type: Number,
            default: 0,
        },
        trees_planted: {
            type: Number,
            default: 0,
        },
        water_saved: {
            type: Number,
            default: 0,
        }
    },

    milestones: [
        {
            title: {
                type: String,
               
            },
            date: {
                type: Date, // Timestamp
                
            },
            description: {
                type: String,
            
            }
        }
    ],

    updates: [
        {
            date: 
            {
                type: Date,
                default: Date.now,
            },
            description: {
                type: String,
                
            },
            images: [
                {
                    type: String, // Array of image URLs
                }
            ],
            videos: [
                {
                    type: String, // Array of video URLs
                }
            ]
        }
    ],

    volunteer_roles: [
        {
            type: String, // Array of roles as strings
        }
    ],

    status: {
        type: String,
        enum: ['active', 'completed'], // Limited to 'active' or 'completed'
        
    },
 });


const model_campaigns= mongoose.model("campaigns", campaigns);

module.exports={model_campaigns};