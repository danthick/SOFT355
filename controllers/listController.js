var path = require("path");
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

var schemas = require("../schemas");
const uri = "mongodb+srv://dthick:kznvRYL5QeIHMNdL@soft355-vjwy9.mongodb.net/test?retryWrites=true&w=majority";

var itemList;

module.exports = function(app){
    var urlencodedParser = bodyParser.urlencoded({extended: false});

    app.get("/todo", function(request, response){
        MongoClient.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
            var users = db.db("db").collection("todoItems");
            users.find({}).toArray().then((data) => {
                console.log("Viewing the todo list");
                itemList = data;
                response.render('todoList.ejs', {items: itemList});
            });
        });
        //response.sendFile(path.join(__dirname , '../views/', 'todoList.html'));
    });


    app.post('/todo', urlencodedParser, function(request, response){
        MongoClient.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
            var item = db.db("db").collection("todoItems");
            var item1 = new schemas.ToDoItem({"item": request.body.item, "email": "dan.thick@hotmail.co.uk"});
            item.insertOne(item1);
            console.log(request.body.item);


            // RE-RENDER PAGE
            //response.render('todoList.ejs', {items: itemList}); 

        });
        
        response.end();

        console.log(request.body);

        console.log("POST successful");
    });

    app.delete("/todo", function(request, response){

    });

    function getItems(){
        MongoClient.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
            var items = db.db("db").collection("todoItems");
            items.find({}).toArray().then((data) => {
                itemList = data;
            });
        });
    }
}   