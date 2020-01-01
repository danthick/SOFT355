var path = require("path");
var schemas = require("../schemas");
var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const uri = "mongodb+srv://dthick:kznvRYL5QeIHMNdL@soft355-vjwy9.mongodb.net/db?retryWrites=true&w=majority";

mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    console.log("Connected to database"); 
});

module.exports = function(app){
    app.get("/", function(request, response){
        console.log("Viewing the homepage");
        response.sendFile(path.join(__dirname, '..', '/index.html'));
    });

    app.get("/register", function (request, response) {
        console.log("Viewing the register page");
        response.render('register.ejs');
    });

    app.post("/register", function(request, response){
        // Hash password
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(request.body.password, salt);

        // Create and save new user
        var newUser = new schemas.User({"email": request.body.email, "password": hash, "firstName": request.body.firstName, "lastName": request.body.lastName});
        newUser.save(function(err, data){
            //response.json(data);
            //response.render('todoList.ejs', {items: data});
        });
        //response.end();

        response.send({redirect: '/login'});
        console.log("POST successful for new user");
       
    })

    app.get("/login", function (request, response) {
        console.log("Viewing login page");
        response.render('login.ejs');
    });

    app.listen(9000, function () {
        console.log("Listening on 9000");
    })
}