var express = require("express");
const bodyParser = require('body-parser');
var listController = require("./controllers/listController");
var appController = require("./controllers/appController");

var app = express();
app.set('engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('./client'));

// Call controllers
appController(app);
listController(app);