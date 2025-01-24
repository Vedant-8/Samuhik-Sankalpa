const express=require("express");
const controllers_orgs=require("../controllers/controllers_users");

const router=express.Router();



//creates a new project
router.get("/projects", controllers_orgs.controllers_fetch_project);
router.get("/projects/:id", controllers_orgs.controllers_fetch_1project)

router.post("/projects/donation", controllers_orgs.controllers_user_donation);

router.get("/projects/donation", controllers_orgs.controllers_fetch_donation);
router.post("/projects/volunteers", controllers_orgs.controllers_volunteer);
//router.post("/projects/:id", controllers_orgs.controllers_post_updates);








module.exports=router;