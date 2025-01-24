const express=require("express");
const controllers_orgs=require("../controllers/controllers_orgs");

const router=express.Router();



//creates a new project
router.post("/projects", controllers_orgs.controllers_create_project);
router.get("/projects", controllers_orgs.controllers_get_project);
router.get("/projects/:id", controllers_orgs.controllers_get_Oneproject)
router.post("/projects/:id", controllers_orgs.controllers_post_updates);








module.exports=router;