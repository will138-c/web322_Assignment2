const path = require("path")
const exphbs = require('express-handlebars');
const HTTP_PORT = process.env.PORT || 8080
const express = require("express")
const bodyParser = require('body-parser');
const app = express();

const dotenv = require('dotenv');
dotenv.config({path:"./config/keys.env"});

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

//parse application/x-ww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


//setup the static folder that static resources can load 
app.use(express.static(path.join(__dirname, "public")));

const { response } = require ("express");
const generaController = require("./controllers/general");

//map controller to the app object

app.use("/",generaController);


app.listen(HTTP_PORT,()=>console.log(`Example app listening on port dd port!`)) 