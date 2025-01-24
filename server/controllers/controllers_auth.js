const {model_users}=require("../models/models_users");
const {model_orgs}=require("../models/models_orgs");
const nodemailer=require("nodemailer");
const transporter=nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'itsmerooh123@gmail.com',
        pass: "shbl fmya nnzt rsup",
    }
});

let orgs_id=0;
const sendMail = (email, otp) => {
    const mailOptions = {
       // from: 'itsmerooh123@gmail.com',  not needed i think
        to: email,                     
        subject: 'Welcome',
        text: `Thanks for registering :).`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};



const controllers_reg = async (req, res) => {
    const body = req.body;
    if(body.role==="User")
    {
    if (body.password === body.confirm_password) {
        try {
            const create = await model_users.create({
               name: body.name,
               email: body.email,
               phno: body.phno,
               role: "User",
               password: body.password,
            });

            if (create) {
                res.json({ msg: "created" });
            } 
            else {
                console.log(create);
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        console.log("Passwords don't match");
    }
    }
    else
    {
        if (body.password === body.confirm_password) {
            try {

                const org_count = await model_orgs.countDocuments();
                const create = await model_orgs.create({
                   org_name: body.org_name,
                   leader_name: body.leader_name,
                   email: body.email,
                   password: body.password,
                   role: "Organisation",
                   org_id: org_count+1,
                });
    
                if (create) {
                    res.json({ msg: "created" });
                } 
                else {
                    console.log(create);
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("Passwords don't match");
        }

    }
};



const controllers_login = async (req, res) => {
    const body = req.body;
    console.log(body.email);
    console.log(body.password);
  
    let search_one = await model_users.findOne({ email: body.email });
    if (!search_one) {
      search_one = await model_orgs.findOne({ email: body.email });
    }
  
    if (search_one) {
      try {
        console.log(search_one);
  
        if (search_one.password === body.password) {
          if (search_one.role === "User") {
            req.session.user = { email: body.email, role: "User" };
            console.log(req.session.user);
            req.session.save((err) => {
              if (err) {
                console.error("Session save error:", err);
              }
            });
            return res.json({ msg: "as user", role: "User" });  // Send role as response
          } else {
            req.session.user = {
              email: body.email,
              role: "Organisation",
              orgs_id: search_one.org_id,
            };
            console.log(req.session.user);
            req.session.save((err) => {
              if (err) {
                console.error("Session save error:", err);
              }
            });
            return res.json({ msg: "as org", role: "Organisation" });  // Send role as response
          }
        } else {
          res.json({ msg: "Passwords don't match" });
        }
      } catch (err) {
        console.log(err);
        res.end({ msg: "error" });
      }
    } else {
      res.json({ msg: "Email doesn't exist" });
    }
  };
  


    const logout=async (req,res)=>{

        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Unable to log out');
            }
            res.render("choice");
        });
    }
    

    module.exports={controllers_reg, controllers_login, logout};




