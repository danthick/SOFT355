var path = require("path");

module.exports = function(app){
    app.get("/todo", function(request, response){
        console.log("Viewing the todo list");
        response.sendFile(path.join(__dirname , '../views/', 'list.html'));

    });


    app.post("/todo", function(request, response){

    });

    app.delete("/todo", function(request, response){

    });
}