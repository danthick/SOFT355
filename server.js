var express = require("express");
const bodyParser = require('body-parser');
var listController = require("./controllers/listController");
var appController = require("./controllers/appController");

const flash = require("express-flash");
const session = require("express-session");
const passportLib = require("passport");

var app = express();
app.set('engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('./client'));

app.use(flash());
app.use(session({
    secret: "secret",
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 } // Sets a maximum login session to 1 hour
}))
app.use(passportLib.initialize());
app.use(passportLib.session());

var mongoose = require("mongoose");
const uri = "mongodb+srv://dthick:kznvRYL5QeIHMNdL@soft355-vjwy9.mongodb.net/db?retryWrites=true&w=majority";

mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    console.log("Connected to database"); 
})

// Call controllers
appController(app);
listController(app);