var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
var listController = require("./controllers/listController");
var appController = require("./controllers/appController");

var uri = "mongodb://dthick:VRA5ocgWNj1PP3Qd@soft355-vjwy9.mongodb.net/test?retryWrites=true&w=majority";
var app = express();
app.set('engine', 'ejs');

// Call controllers
appController(app);
listController(app);

//app.use(express.static("resources"));