var schemas = require("../schemas");

module.exports = function (app) {
    // Route to get all items for user currently logged in
    app.get("/todo", checkAuthenticated, async function (request, response) {
        // Get user
        var user = await getUserByEmail(request._passport.session.user)
        // Find all items for that user and send it to todoList.ejs page
        schemas.ToDoItem.find({
            email: user[0].email
        }, function (err, data) {
            response.render('todoList.ejs', {
                items: data,
                currentUser: user
            });
        })
    });

    // Route to add an item
    app.post('/todo', checkAuthenticated, async function (request, response) {
        console.log("Adding item")
        // Get user
        var user = await getUserByEmail(request._passport.session.user)
        // Create a new item
        var newItem = new schemas.ToDoItem({
            "item": request.body.item,
            "email": user[0].email,
            "completed": false
        });
        // Save item to database
        newItem.save(function (err, data) {});
        response.end();
    });

    // Route to update an item name
    app.put("/todo/:item", checkAuthenticated, async function (request, response) {
        console.log("Updating item")
        // Get user
        var user = await getUserByEmail(request._passport.session.user);
        // Update edited item
        schemas.ToDoItem.findOneAndUpdate({
            email: user[0].email,
            "item": request.body.old
        }, {
            "item": request.body.new
        }, {useFindAndModify: false} ,function (err, data) {});
        response.end();
    });

    // Route to delete an item
    app.delete("/todo/:item", checkAuthenticated, async function (request, response) {
        console.log("Deleting item")
        // Get user
        var user = await getUserByEmail(request._passport.session.user);
        // Find item from the user and delete
        schemas.ToDoItem.findOneAndDelete({
            email: user[0].email,
            "item": request.params.item
        }, function (err, data) {});
        response.end();
    });

    // Update route to change if an item is completed or not
    app.put("/todo/complete/:item", checkAuthenticated, async function (request, response) {
        console.log("Changing item completion status")
        console.log(request.body.item);
        // Get user
        var user = await getUserByEmail(request._passport.session.user);
        // Find item that needs updating
        var stored = await schemas.ToDoItem.find({
            email: user[0].email,
            "item": request.body.item
        });
        // If its completed, change to not completed
        if (stored[0].completed) {
            schemas.ToDoItem.findOneAndUpdate({
                email: user[0].email,
                "item": request.body.item
            }, {
                "completed": false
            }, {useFindAndModify: false}, function (err, data) {});
        // If its not completed, change to completed
        } else {
            schemas.ToDoItem.findOneAndUpdate({
                email: user[0].email,
                "item": request.body.item
            }, {
                "completed": true
            }, {useFindAndModify: false}, function (err, data) {});
        }
        response.end();
    });

    // Passport function to check if user if authenticated. If not redirects to login page.
    function checkAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/login')
    }

    // Functio to return user, given an email
    async function getUserByEmail(email) {
        return await schemas.User.find({
            email: email
        });
    }
}