var mongoose = require("mongoose");

var User = mongoose.model("User", {
    id: String,
    email: String, 
    password: String,
    firstName: String,
    lastName: String,
});

module.exports.User = User;