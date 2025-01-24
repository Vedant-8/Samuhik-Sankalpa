const express=require("express");
const controllers_auth=require("../controllers/controllers_auth");

const router=express.Router();




router.post("/register", controllers_auth.controllers_reg);
router.post("/login", controllers_auth.controllers_login);
router.post("/logout", controllers_auth.logout);








module.exports=router;