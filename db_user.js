const MongoClient = require('mongodb').MongoClient;
var schemas = require("./schemas");
const uri = "mongodb+srv://dthick:kznvRYL5QeIHMNdL@soft355-vjwy9.mongodb.net/test?retryWrites=true&w=majority";

// POST data
MongoClient.connect(uri, function(err, db) {
    var users = db.db("db").collection("users");
    var user = new schemas.User({"email": "dan.thick@hotmail.co.uk", "password": "password", "firstName": "Dan", "lastName": "Thick"});
    var user2 = new schemas.User({"email": "amyjagla@gmail.com", "password": "password", "firstName": "Amy", "lastName": "Jagla"});
    var user3 = new schemas.User({"email": "aim-me@gmail.com", "password": "password", "firstName": "Amy", "lastName": "Jagla"});
    
    //users.insertOne(user);
    //users.insertOne(user2);
    //users.insertOne(user3);

    // GET data
    users.find({firstName: "Amy"}).toArray().then((data) => {

    });

    // DELETE data
    users.deleteOne({email: "aim-me@gmail.com"});

    db.close();
});

