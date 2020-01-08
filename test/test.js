// var assert = require("chai").assert;
// var chai = require('chai');
// var chaiHttp = require('chai-http');

// chai.use(chaiHttp);

// suite("Test", function () {
//     test("Test", function () {
//         assert.equal(3, 3, "Integers do not equal")
//     })
// })

// describe('todoItems', () => {
//     describe('/GET todoItems', () => {
//         it('it should GET all the books', (done) => {
//             chai.request(server)
//                 .get('/todo')
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.a('array');
//                     res.body.length.should.be.eql(0);
//                     done();
//                 });
//         })
//     })
// })

// suite("Register", function () {
//     test("Register Function", function () {
//         // Creating test user
//         
//         // Posting the user to database
//         $.ajax({
//             type: 'POST',
//             url: '/register',
//             data: user,
//         })
//     })
// })


// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../server');


var user = {
    "firstName": "Test",
    "lastName": "User",
    "email": "test@user.com",
    "password": "test"
};


// Configure chai
chai.use(chaiHttp);
chai.should();

app.use(require('body-parser').json());

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

describe("Delete User", () => {
    it("should delete an existing user", (done) => {
        chai.request(app)
            .delete("/register/" + user.email)
            .type('form')
            .end((err, res) => {
                res.should.have.status(200);
                done();
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
});