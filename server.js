var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
//var db = require("./db");
//var logic = require("./logic");

var uri = "mongodb://dthick:VRA5ocgWNj1PP3Qd@soft355-vjwy9.mongodb.net/test?retryWrites=true&w=majority";

var app = express();

//app.use(express.static("resources"));
//app.use(express.static("client"));


app.get("/", function(request, response){
    console.log("Viewing the homepage");
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.get("/login", function (request, response) {
    console.log("Viewing login page");
    response.sendFile(path.join(__dirname + '/login.html'));
});


app.listen(9000, function () {
    //Connect to Mongoose.
    MongoClient.connect(uri, function(err, client){
        console.log("connect to db");
        const db = client.db("users");

        db.collection('users').insertOne({
            email: "dan.thick@hotmail.co.uk",
            password: "password",
            firstName: "Dan",
            lastName: "Thick"
        }).then(function(result){
            console.log("inserted");
        })
    })
    // Some output for the interested reader...
    console.log("Listening on 9000");
})