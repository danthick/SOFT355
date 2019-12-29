var path = require("path");

module.exports = function(app){
    app.get("/", function(request, response){
        console.log("Viewing the homepage");
        response.sendFile(path.join(__dirname, '..', '/index.html'));
    });

    app.get("/login", function (request, response) {
        console.log("Viewing login page");
        response.sendFile(path.join(__dirname, '..', '/login.html'));
    });

    app.listen(9000, function () {
        console.log("Listening on 9000");
    })
}