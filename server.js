var express = require("express");
//var mongoose = require("mongoose");
//var db = require("./db");
//var logic = require("./logic");

//var uri = "mongodb+srv://dthick:4KDAUkP0r3yW42Mr@soft355-vjwy9.mongodb.net/test?retryWrites=true&w=majority";

var app = express();

//app.use(express.static("resources"));
//app.use(express.static("client"));


app.get("/test", function (request, response) {
    console.log("it worked!");
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