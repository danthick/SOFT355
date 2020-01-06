var schemas = require("../schemas");

module.exports = function (app){    
    app.get("/todo", checkAuthenticated, async function(request, response){
        var user = await getUserByEmail(request._passport.session.user)
        schemas.ToDoItem.find({email: user[0].email}, function(err, data){
            response.render('todoList.ejs', {items: data});
        })
    });

    app.post('/todo', checkAuthenticated, async function(request, response){
        var user = await getUserByEmail(request._passport.session.user)
        var newItem = new schemas.ToDoItem({"item": request.body.item, "email": user[0].email});
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

    async function getUserByEmail(email){
        return await schemas.User.find({email: email}); 
    }
}   