
const {model_orgs}=require("../models/models_orgs");
const {model_campaigns}=require("../models/models_campaigns");

//const {model_ca}=require("../models/models_campaigns");

const controllers_fetch_unapproved = async (req, res) => {
    try{
            
                
                const unapproved_orgs = await model_orgs.find({verified: false});
                //const search_one=await model_orgs.findOne({orgs_id: req.session.user.orgs_id});
                if(unapproved_orgs)
                {
                    res.send({unapproved_orgs});
                }
                else
                res.send("no unapproved orgs");

            
    }   
    catch(err)
    {
            console.log(err);
    }
};

const controllers_approve_orgs = async (req, res) => {
    try{
        const body=req.body;
        console.log(body.org_id)
        const org=await model_orgs.findOneAndUpdate({org_id: body.org_id},  { $set: { verified: true } }, 
            { new: true });
        if(org)
        {
            res.end("approved");

        }
        else{
            res.end("error");
        }
        

            
    }   
    catch(err)
    {
            console.log(err);
    }
};










module.exports={controllers_fetch_unapproved, controllers_approve_orgs};
