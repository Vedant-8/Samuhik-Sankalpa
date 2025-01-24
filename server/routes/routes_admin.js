const express=require("express");
const controllers_admin=require("../controllers/controllers_admin");

const router=express.Router();




router.get("/unapprove_orgs", controllers_admin.controllers_fetch_unapproved );
router.get("/approve_orgs", controllers_admin.controllers_approve_orgs );









module.exports=router;