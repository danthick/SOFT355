var path = require("path");
var schemas = require("../schemas");
const bcrypt = require("bcryptjs");

const passportLib = require("passport");
const passportFunction = require("../passport");

module.exports = function(app){
    passportFunction.InitPassport(passportLib, 
        email = async (email) => {
            return schemas.User.find({email: email}); 
    });

    app.get("/", function(request, response){
        console.log("Viewing the homepage");
        response.sendFile(path.join(__dirname, '..', '/index.html'));
    });

    app.get("/register", checkNotAuthenticated, function (request, response) {
        console.log("Viewing the register page");
        response.render('register.ejs');
    });

    app.post("/register", checkNotAuthenticated, function(request, response){
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

    app.get("/login", checkNotAuthenticated, function (request, response) {
        console.log("Viewing login page");
        response.render('login.ejs');
    });

    app.post("/login", checkNotAuthenticated, passportLib.authenticate("local", {
        successRedirect: "/todo",
        failureRedirect: "/login",
        failureFlash: true
    }));

    app.get("/logout", function(request, response){
        request.session.destroy(function (err) {
            response.redirect("/login");
        });
    });

    function checkAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
          return next()
        }
        res.redirect('/login')
      }
      
      function checkNotAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
          return res.redirect('/todo')
        }
        next()
      }

    app.listen(9000, function () {
        console.log("Listening on 9000");
    })
}