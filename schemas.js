var mongoose = require("mongoose");
var User = mongoose.model("User", {
    id: String,
    email: String, 
    password: String,
    firstName: String,
    lastName: String,
});

var ToDoItem = mongoose.model("Item", {
    id: String,
    item: String,
    email: String,
});

module.exports.User = User;
module.exports.ToDoItem = ToDoItem;