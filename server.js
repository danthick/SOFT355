var express = require("express");
var path = require("path");
//var mongoose = require("mongoose");
//var db = require("./db");
//var logic = require("./logic");

//var uri = "mongodb+srv://dthick:4KDAUkP0r3yW42Mr@soft355-vjwy9.mongodb.net/test?retryWrites=true&w=majority";

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
    // Connect to Mongoose.
    //mongoose.connect(uri, {
    //    useNewUrlParser: true,
    //    useUnifiedTopology: true
    //}).then((test) => {
    //    console.log("Connected to DB");
    //});

    // Some output for the interested reader...
    console.log("Listening on 9000");
})