var path = require("path");
var schemas = require("../schemas");
const bcrypt = require("bcryptjs");
const passportLib = require("passport");
const passportFunction = require("../passport");
var WebSocketServer = require("websocket").server;

module.exports = function (app) {
    // Intialise passport
    passportFunction.InitPassport(passportLib,
        // Get user from email function
        email = async (email) => {
            return schemas.User.find({
                email: email
            });
        });
    
    // Route to show register page
    app.get("/register", checkNotAuthenticated, function (request, response) {
        console.log("Viewing the register page");
        response.render('register.ejs');
    });

    // Route to register a new user
    app.post("/register", checkNotAuthenticated, async function (request, response) {
        // Hash password
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(request.body.password, salt);

        // Checking if email already exists
        var user = await getUserByEmail(request.body.email);
        if (user[0] == null) {
            // Create a new user
            var newUser = new schemas.User({
                "email": request.body.email,
                "password": hash,
                "firstName": request.body.firstName,
                "lastName": request.body.lastName
            });
            // Save user
            newUser.save();
            response.sendStatus(200);
            console.log("User registered");
        } else {
            response.sendStatus(400);
        }
    })

    // Route to delete a user
    app.delete("/register/:email", checkNotAuthenticated, async function (request, response) {
        console.log("Deleting user");
        // Find user from email and delete
        schemas.User.findOneAndDelete({
            email: request.params.email,
        }, function (err, data) {});
        response.end();
    })

    // Route to display login page
    app.get("/login", checkNotAuthenticated, function (request, response) {
        console.log("Viewing login page");
        response.render('login.ejs');
    });

    // Route to attempt a login using passport authentice function
    app.post("/login", checkNotAuthenticated, passportLib.authenticate("local", {
        successRedirect: "/todo",
        failureRedirect: "/login",
        failureFlash: true
    }));

    // Route to log user out and redirect to login page
    app.get("/logout", function (request, response) {
        request.session.destroy(function (err) {
            response.redirect("/login");
        });
    });

    // Passport function to check the a user is currently not logged in
    function checkNotAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/todo')
        }
        next()
    }

    // Function to get user from email
    async function getUserByEmail(email) {
        return await schemas.User.find({
            email: email
        });
    }

    // Setting port to listen on
    var server = app.listen(9000, function () {
        console.log("Listening on 9000");
    })

    // Creating a web socket server
    var wss = new WebSocketServer({
        httpServer: server
    });
    // Array to store all connected clients
    var clients = [];

    // WebSocket functions
    wss.on('request', function (request) {
        // Accept connection and push to array
        var connection = request.accept(null, request.origin);
        clients.push(connection);
        connection.on('message', function (message) {
            // Sends message to all clients when a change has been made. Includes user email to ensure the right client gets the message.
            var email = message.utf8Data;
            clients.forEach(function (client) {
                client.send(message.utf8Data);
            });
        });
    });
}