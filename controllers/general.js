const express = require('express')
const router = express.Router();
//const data = require("../model/data");
//const dataServiceAuth = require("../data-service-auth.js");
//const packageService = require("../data-package.js");
//const orderService = require("../order-data.js");
//const clientSessions = require("express-session");
//const multer = require("multer");
const path = require("path");
//const app = express()

router.get("/", function(req,res){
    res.render("index.hbs", {
        layout: false
    })
})

router.get("/menu", function(req,res){
    res.render("menu.hbs", {
        layout: false
    })
})

router.get("/login", function(req,res){
    res.render("login.hbs", {
        layout: false
    })
})

router.post("/login", function(req,res){
    if (req.body.username && req.body.password) {
        return res.send("Login successfully!")
    }
    else {
        someData = {
            message: "Please enter username and password!"
        }
        res.render("login.hbs", {
            data: someData,
            layout: false
        })
    }
})

router.get("/signup", function(req,res){
    res.render("signup.hbs", {
        layout: false
    })
})

router.post("/signup", function(req,res){
    console.log(req.body);
    let validation = {};
    let passed = true;
    const {firstname, lastname,email, password} = req.body;

    if (typeof firstname !== 'string' || firstname.lengh ===0 || firstname.length<3 ) {
        if(typeof firstname !== 'string' || firstname.lengh ===0){
            someData = {
            message: "Please enter a valid first name!"
            };
        }else{
            someData = {
                message: "First name should have at least two characters!"
                    }
            };
        passed = false;
        res.render("signup.hbs", {
            data: someData,
            layout: false
        })
    }
    else if (typeof lastname !== 'string' || lastname.lengh ===0 || lastname.length<3 ) {
        if(typeof lastname !== 'string' || lastname.lengh ===0){
            someData = {
            message: "Please enter a valid last name!"
            };
        }else{
            someData = {
                message: "Last name should have at least two characters!"
                    }
            };
        passed = false;
        res.render("signup.hbs", {
            data: someData,
            layout: false
        })
    }
    else if (!email) {
        someData = {
            message: "Please enter a valid email!"
        }
        passed = false;
        res.render("signup.hbs", {
            data: someData,
            layout: false
        })
    }
    else if (!password) {
        someData = {
            message: "Please enter a valid password!"
        }
        passed = false;
        res.render("signup.hbs", {
            data: someData,
            layout: false
        })
    }
    else if(passed) {
        const sgMail = require("@sendgrid/mail");

        sgMail.setApiKey(process.env.SEN_GRID_API_KEY);

        const msg = {
            to: 'wangzhan1308@gmail.com',
            from: 'zwang241@myseneca.ca',
            subject: 'Contact Us form submission',
            html:          
                `Vistor's Full Name: ${firstname} ${lastname}<br>
                Vistor's Email Address: ${email}<br>
                `
        };

        sgMail.send(msg)
            .then(()=>{
                console.log('send mail success');
                res.redirect("/");
            })
            .catch(err=>{
                console.log(`Erro ${err}`);
                res.render("/signup", {
                    title: "/signup Page",
                    validation: validation,
                    values:req.body
                });
            });

        return res.send("Sign up successfully! Please check your email!")
        }else{

            res.render("/sign up",{
                title:"Sign up page",
                validation: validation,
                values: req.body
            });

        }
});

module.exports = router;
