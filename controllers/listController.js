var schemas = require("../schemas");

module.exports = function (app) {
    app.get("/todo", checkAuthenticated, async function (request, response) {
        var user = await getUserByEmail(request._passport.session.user)
        schemas.ToDoItem.find({
            email: user[0].email
        }, function (err, data) {
            response.render('todoList.ejs', {
                items: data,
                currentUser: user
            });
        })
    });

    app.post('/todo', checkAuthenticated, async function (request, response) {
        console.log("Adding item")
        var user = await getUserByEmail(request._passport.session.user)
        var newItem = new schemas.ToDoItem({
            "item": request.body.item,
            "email": user[0].email,
            "completed": false
        });
        newItem.save(function (err, data) {});
        response.end();
    });

    app.put("/todo/:item", checkAuthenticated, function (request, response) {
        console.log("Updating item")
        console.log(request.body.old);
        console.log(request.body.new);
        schemas.ToDoItem.findOneAndUpdate({
            "item": request.body.old
        }, {
            "item": request.body.new
        }, {useFindAndModify: false} ,function (err, data) {});
        response.end();
    });

    app.delete("/todo/:item", checkAuthenticated, async function (request, response) {
        var user = await getUserByEmail(request._passport.session.user);
        console.log("Deleting item")
        schemas.ToDoItem.findOneAndDelete({
            email: user[0].email,
            "item": request.params.item
        }, function (err, data) {});
        response.end();
    });

    app.put("/todo/complete/:item", checkAuthenticated, async function (request, response) {
        console.log("Changing item completion status")
        var user = await getUserByEmail(request._passport.session.user);
        var stored = await schemas.ToDoItem.find({
            email: user[0].email,
            "item": request.body.item
        });
        if (stored[0].completed) {
            schemas.ToDoItem.findOneAndUpdate({
                email: user[0].email,
                "item": request.body.item
            }, {
                "completed": false
            }, {useFindAndModify: false}, function (err, data) {});
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

    async function getUserByEmail(email) {
        return await schemas.User.find({
            email: email
        });
    }
}