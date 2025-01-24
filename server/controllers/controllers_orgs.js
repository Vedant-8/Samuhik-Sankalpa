
const {model_orgs}=require("../models/models_orgs");
const {model_campaigns}=require("../models/models_campaigns");
//const {model_ca}=require("../models/models_campaigns");

const controllers_create_project = async (req, res) => {
    try{
            if(req.session.user)
            {
                const body=req.body;
                const project_count = await model_campaigns.countDocuments();
                //const search_one=await model_orgs.findOne({orgs_id: req.session.user.orgs_id});
                const create = await model_campaigns.create({
                        project_id: project_count+1, 
                        org_id: req.session.user.orgs_id,
                        title: body.title,
                        description: body.description,
                        location: body.location,
                        images: body.images,
                        videos: body.videos,
                        funding_goal: body.funding_goal,
                        current_funding: body.current_funding,
                        impact_metrics: body.impact_metrics,
                        milestones: body.milestones,
                        updates: body.updates,
                        volunteer_roles: body.volunteer_roles,
                        status: body.status,

            });
            if (create) {
                res.json({ msg: "created" });
                console.log(create);
                //res.json({create})
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

const controllers_get_project = async (req, res) => {
    try{
        
        if(req.session.user)
        {
        
            //const email = req.session.user.email; 
            //console.log(req.session.user.orgs_id);
            const projects = await model_campaigns.find({ org_id: req.session.user.orgs_id });
    
            if (projects.length > 0) {
                res.json({
                    msg: "Projects retrieved successfully",
                    Projects: projects,
                });
            } else {
                res.status(404).json({
                    msg: "No projects found for this organisation"
                });
            }
        }
            
    }   
    catch(err)
    {
            console.log(err);
    }
};


const controllers_get_Oneproject = async (req, res) => {
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


const controllers_post_updates = async (req, res) => {
    try{
        const update=req.body;
        if(req.session.user)
        {
            const id=req.params.id;
            const result=await model_campaigns.findOneAndUpdate({project_id:id}, {$push:{updates:update}}, {new:true});
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









module.exports={controllers_create_project, controllers_get_project, controllers_get_Oneproject, controllers_post_updates};
