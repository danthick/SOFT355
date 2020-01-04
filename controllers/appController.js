var path = require("path");
var schemas = require("../schemas");
var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const uri = "mongodb+srv://dthick:kznvRYL5QeIHMNdL@soft355-vjwy9.mongodb.net/db?retryWrites=true&w=majority";

const flash = require("express-flash");
const session = require("express-session");
const passportLib = require("passport");
const passportFunction = require("../passport");


mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    console.log("Connected to database"); 
});

module.exports = function(app){
    app.use(flash());
    app.use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: false
    }))
    app.use(passportLib.initialize());
    app.use(passportLib.session());

    passportFunction.InitPassport(passportLib, 
        email = async (email) => {
            return schemas.User.find({email: email}); 
    });


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

    app.post("/login", checkNotAuthenticated, passportLib.authenticate("local", {
        successRedirect: "/todo",
        failureRedirect: "/login",
        failureFlash: true
    }))

    app.get("/todo", function(request, response){
        schemas.ToDoItem.find({}, function(err, data){
            response.render('todoList.ejs', {items: data});
        })
    });

    app.post('/todo', function(request, response){
        var newItem = new schemas.ToDoItem({"item": request.body.item, "email": "dan.thick@hotmail.co.uk"});
        newItem.save(function(err, data){
            console.log(request.body);
            //response.json(data);
            //response.render('todoList.ejs', {items: data});
        });
        response.end();
        console.log("POST successful");
    });

    app.delete("/todo/:item", function(request, response){
        schemas.ToDoItem.findOneAndDelete({"item": request.params.item}, function(err, data){
            console.log
        });
        //console.log(itemToDelete);
        //console.log(itemToDelete.item);
        response.end();
    });


    function checkAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
          return next()
        }
      
        res.redirect('/login')
      }
      
      function checkNotAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
          return res.redirect('/')
        }
        next()
      }

    app.listen(9000, function () {
        console.log("Listening on 9000");
    })
}