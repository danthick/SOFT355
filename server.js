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
    cookie: { maxAge: 3600000 } // Sets a maximum login session to 1 hour of inactivity
}))
app.use(passportLib.initialize());
app.use(passportLib.session());

var mongoose = require("mongoose");
const uri = "mongodb://dthick:m18WKhWQLWq9Bak2@soft355-shard-00-00-vjwy9.mongodb.net:27017,soft355-shard-00-01-vjwy9.mongodb.net:27017,soft355-shard-00-02-vjwy9.mongodb.net:27017/db?ssl=true&replicaSet=SOFT355-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    if (err) { 
        console.log(err); 
    } else {
        console.log("Connected to database"); 
    }
})

// Call controllers
appController(app);
listController(app);

module.exports = app;