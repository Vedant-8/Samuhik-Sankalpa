const mongoose=require("mongoose");


const orgs= new mongoose.Schema({

    leader_name: {
        type: String,
    },
    org_id: {
        type: Number,
    },
    org_name: {
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
    },

    verified: {
        type: Boolean,
        default: false,
    },

    campaigns: [
        {
            type: String, // campaign_id as strings
        }
    ],

    collaborations: [
        {
            type: String, // org_id as strings
        }
    ],

    analytics: {
        active_campaigns: {
            type: Number,
            default: 0,
        },
        total_funds_raised: {
            type: Number,
            default: 0.0,
        },
        donor_engagement: {
            type: Number,
            default: 0.0,
        }
    },

    volunteer_opportunities: [
        {
            project_id: {
                type: String,
            },
            roles: [
                {
                    type: String, // Array of roles
                }
            ]
        }
    ]
 });




const model_orgs= mongoose.model("orgs", orgs);

module.exports={model_orgs};