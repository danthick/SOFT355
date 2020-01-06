var schemas = require("../schemas");

module.exports = function(app){    
    app.get("/todo", checkAuthenticated, function(request, response){
        console.log(request.user);
        schemas.ToDoItem.find({}, function(err, data){
            response.render('todoList.ejs', {items: data});
        })
    });

    app.post('/todo', checkAuthenticated, function(request, response){
        var newItem = new schemas.ToDoItem({"item": request.body.item, "email": "dan.thick@hotmail.co.uk"});
        newItem.save(function(err, data){
            console.log(request.body);
            //response.json(data);
            //response.render('todoList.ejs', {items: data});
        });
        response.end();
        console.log("POST successful");
    });

    app.delete("/todo/:item", checkAuthenticated, function(request, response){
        schemas.ToDoItem.findOneAndDelete({"item": request.params.item}, function(err, data){
            console.log
        });
        //console.log(itemToDelete);
        //console.log(itemToDelete.item);
        response.end();
    });

    function checkAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
          return next()
        }
        res.redirect('/login')
      }
      
      function checkNotAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
          return res.redirect('/')
        }
        next()
      }
}   