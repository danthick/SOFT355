const MongoClient = require('mongodb').MongoClient;
var schemas = require("./schemas");

const uri = "mongodb+srv://dthick:kznvRYL5QeIHMNdL@soft355-vjwy9.mongodb.net/test?retryWrites=true&w=majority";


MongoClient.connect(uri, function(err, db) {
    var user = new schemas.User({"email": "dan.thick@hotmail.co.uk", "password": "password", "firstName": "Dan", "lastName": "Thick"});
    db.db("db").collection("users").insertOne(user);
    db.close();
});
