// Import the libraries for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../server');

var requestp = require("supertest-as-promised");
var agent = requestp.agent(app)

// Creating test items
var user = {
    "firstName": "Test",
    "lastName": "User",
    "email": "test@user.com",
    "password": "test"
};

var testItem = {
    "item": "Complete coursework"
}

// Configure chai and server
chai.use(chaiHttp);
chai.should();

describe("Users", () => {
    describe("Register User", () => {
        it("should register a new user", (done) => {
            chai.request(app)
                .post("/register")
                .type('form')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    // describe("Delete User", () => {
    //     it("should delete an existing user", (done) => {
    //         chai.request(app)
    //             .delete("/register/" + user.email)
    //             .type('form')
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 done();
    //             });
    //     });
    // });


    describe("Log User In", () => {
        it("should log test user in successfully", (done) => {
            agent
            .post('/login')
            .type('form')
            .send({email: user.email, password: user.password})
                .end((err, res) => {
                    res.should.redirectTo('/todo');
                    done();
                });
        });
    });
    describe("Incorrect Password", () => {
        it("should fail to log test user in due to incorrect password", (done) => {
            agent
            .post('/login')
            .type('form')
            .send({email: user.email, password: "wrong"})
                .end((err, res) => {
                    res.should.redirectTo('/login');
                    done();
                });
        });
    });
    describe("Incorrect Email", () => {
        it("should fail to log test user in due to incorrect email", (done) => {
            agent
            .post('/login')
            .type('form')
            .send({email: "wrong@wrongemail.com", password: user.password})
                .end((err, res) => {
                    res.should.redirectTo('/login');
                    done();
                });
        });
    });
});



describe("todoItems", () => {
    describe("GET /", () => {
        // Test to get all students record
        it("should get all students record", (done) => {
            chai.request(app)
                .get('/todo')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
    describe("Add Item", () => {
        it("should add an item to test users database", (done) => {
            agent
                .post("/todo")
                .type('form')
                .send({"item": "Test"})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});