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

    app.post("/register", async function(request, response){

        //const hashed = await bcrypt.hash(request.body.password, 10)
        
        var newUser = new schemas.User(request.body);
        newUser.save(function(err, data){
            //response.json(data);
            //response.render('todoList.ejs', {items: data});
        });
        response.end();
        console.log("POST successful");
    })

    app.get("/login", function (request, response) {
        console.log("Viewing login page");
        response.render('login.ejs');
    });

    app.listen(9000, function () {
        console.log("Listening on 9000");
    })
}