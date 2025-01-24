
const {model_users}=require("../models/models_users");
const {model_campaigns}=require("../models/models_campaigns");
const {model_volunteers}=require("../models/models_volunteers");
//const {model_ca}=require("../models/models_campaigns");

const controllers_fetch_project = async (req, res) => {
    try{
            if(req.session.user)
            {
                console.log("control rched");
                const projects = await model_campaigns.find({});
                //const search_one=await model_orgs.findOne({orgs_id: req.session.user.orgs_id})
            if (projects) {
                res.json(projects);
                //console.log(create);
                //res.json({create})
            } 
            else {
                console.log("error");
            }

            }
    }   
    catch(err)
    {
            console.log(err);
    }
};




const controllers_fetch_1project = async (req, res) => {
    try{
        
        if(req.session.user)
        {
        
            //console.log("control reached");
            const id=req.params.id;
    
            const projects = await model_campaigns.findOne({ project_id: id });
    
            if (projects) {
                res.json({
                    projects,
                });
            } else {
                res.status(404).json({
                    msg: "No project found for this id"
                });
            }
        }
            
    }   
    catch(err)
    {
            console.log(err);
    }
};


const controllers_user_donation = async (req, res) => {
    try{
        const update=req.body;
        if(req.session.user)
        {
            
            const result=await model_users.findOneAndUpdate({email:req.session.user.email}, {$push:{donations:update}}, {new:true});
            if(result)
            {
                res.send("Updated");
            }
            else
            {
                res.send("Update failed");
            }
            //console.log("control reached");
           
        }
            
    }   
    catch(err)
    {
            console.log(err);
    }
};

const controllers_fetch_donation = async (req, res) => {
    try{
        console.log("reached");
        if(req.session.user)
        {
            console.log(req.session.user);
            const result=await model_users.findOne({email : req.session.user.email});
            console.log(result);
            if(result)
            {
                res.send(result.donations);
            }
            else
            {
                res.send("no donation");
            }
            //console.log("control reached");
           
        }
            
    }   
    catch(err)
    {
            console.log(err);
    }
};


const controllers_volunteer = async (req, res) => {
    try{
       
        if(req.session.user)
        {
                const body=req.body;
                const create = await model_volunteers.create({
                    id: body.id,
                
                    name: body.name,
                
                    details: body.details,
                
                    project: body.project,
                
                    org: body.org,
                    
                    location: body.location,
                
                
                
                });
    
                if (create) {
                    res.json({ msg: "created" });
                } 
                else {
                    console.log(create);
                
           
              }
        
            }
    }   
    catch(err)
    {
            console.log(err);
    }
};









module.exports={controllers_fetch_project,  controllers_fetch_1project, controllers_user_donation, controllers_fetch_donation, controllers_volunteer};
