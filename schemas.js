var mongoose = require("mongoose");

var User = mongoose.model("user", {
    id: String,
    email: String, 
    password: String,
    firstName: String,
    lastName: String,
});

var ToDoItem = mongoose.model("todoItem", {
    id: String,
    item: String,
    email: String,
    completed: Boolean,
});

module.exports.User = User;
module.exports.ToDoItem = ToDoItem;