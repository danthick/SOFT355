var mongoose = require("mongoose");

// User data structure
var User = mongoose.model("user", {
    id: String,
    email: String, 
    password: String,
    firstName: String,
    lastName: String,
});

// To do item data structure
var ToDoItem = mongoose.model("todoItem", {
    id: String,
    item: String,
    email: String,
    completed: Boolean,
});

module.exports.User = User;
module.exports.ToDoItem = ToDoItem;