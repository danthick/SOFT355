var path = require("path");
var schemas = require("../schemas");
const bcrypt = require("bcryptjs");

const passportLib = require("passport");
const passportFunction = require("../passport");

module.exports = function (app) {
    passportFunction.InitPassport(passportLib,
        email = async (email) => {
            return schemas.User.find({
                email: email
            });
        });

    app.get("/", function (request, response) {
        console.log("Viewing the homepage");
        response.sendFile(path.join(__dirname, '..', '/index.html'));
    });

    app.get("/register", checkNotAuthenticated, function (request, response) {
        console.log("Viewing the register page");
        response.render('register.ejs');
    });

    app.post("/register", checkNotAuthenticated, async function (request, response) {
        // Hash password
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(request.body.password, salt);

        // Checking if email already exists
        var user = await getUserByEmail(request.body.email);
        if (user[0] == null) {
            // Create and save new user
            var newUser = new schemas.User({
                "email": request.body.email,
                "password": hash,
                "firstName": request.body.firstName,
                "lastName": request.body.lastName
            });
            newUser.save();
            response.sendStatus(200);
            console.log("POST successful for new user");
        } else {
            response.sendStatus(400);
            console.log("EMAIL EXISTS")
        }
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

    app.get("/logout", function (request, response) {
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

    async function getUserByEmail(email) {
        return await schemas.User.find({
            email: email
        });
    }


    var WebSocketServer = require("websocket").server;
    
    var server = app.listen(9000, function () {
        console.log("Listening on 9000");
    })

    var wss = new WebSocketServer({ httpServer: server });
    var clients = [];

    // WebSocket server
    wss.on('request', function (request) {
        var connection = request.accept(null, request.origin);
        clients.push(connection);


        connection.on('message', function (message) { 
            var email = message.utf8Data;
            clients.forEach(function(client) {
                client.send(message.utf8Data);
              });
        });

        connection.on('close', function (connection) {
            // close user connection
        });

    });
}