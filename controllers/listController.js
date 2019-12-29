var path = require("path");
const MongoClient = require('mongodb').MongoClient;

var schemas = require("../schemas");
const uri = "mongodb+srv://dthick:kznvRYL5QeIHMNdL@soft355-vjwy9.mongodb.net/test?retryWrites=true&w=majority";


MongoClient.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    var users = db.db("db").collection("users");
    users.find({}).toArray().then((data) => {
        //var app = angular.module("myApp", []);
        //app.controller("myCtrl", function($scope) {
        //    $scope.users = data;
        //});
    });
});



module.exports = function(app){
    app.get("/todo", function(request, response){
        MongoClient.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
            var users = db.db("db").collection("users");
            users.find({}).toArray().then((data) => {
                console.log("Viewing the todo list");
                response.render('todoList.ejs', {userData: data});
            });
        });

        //console.log("Viewing the todo list");
        //response.render('todoList.ejs', data);
        //response.sendFile(path.join(__dirname , '../views/', 'todoList.html'));
    });


    app.post("/todo", function(request, response){

    });

    app.delete("/todo", function(request, response){

    });
}