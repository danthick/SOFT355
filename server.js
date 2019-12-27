var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
var listController = require("./controllers/listController");
//var db = require("./db");
//var logic = require("./logic");

var uri = "mongodb://dthick:VRA5ocgWNj1PP3Qd@soft355-vjwy9.mongodb.net/test?retryWrites=true&w=majority";
var app = express();

// Call controller
listController(app);

//app.use(express.static("resources"));




app.get("/", function(request, response){
    console.log("Viewing the homepage");
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.get("/login", function (request, response) {
    console.log("Viewing login page");
    response.sendFile(path.join(__dirname + '/login.html'));
});

app.listen(9000, function () {
    console.log("Listening on 9000");
})