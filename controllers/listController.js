const bodyParser = require('body-parser');
var schemas = require("../schemas");
var mongoose = require("mongoose");
const uri = "mongodb+srv://dthick:kznvRYL5QeIHMNdL@soft355-vjwy9.mongodb.net/db?retryWrites=true&w=majority";

mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    console.log("Connected to database"); 
})

module.exports = function(app){    
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
}   