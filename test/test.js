const chai = require("chai");
const chaiHttp = require("chai-http");
const server = "http://localhost:3000";
const {logger}=require("../Logger/logger_config");
chai.use(chaiHttp);
 should = chai.should();

describe("Reading the user", () => {
  // API Call

  it("Checking the user having a birthday", done => {
    chai
      .request(server)
      .post("/")
      .send({email:"abc@gmail.com"})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
         res.body.should.have.property("result").eq("User have Birthday today");
        done();
      });
  })
});



describe("Reading the user", () => {
  // API Call

  it("Checking the user doestn't have a birthday", done => {
    chai
      .request(server)
      .post("/")
      .send({email:"mohansasireka@gmail.com"})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
         res.body.should.have.property("result").eq("User Doesn't have birthday today!");
        done();
      });
  })
});


describe("Reading the user", () => {
  // API Call

  it("User not found", done => {
    chai
      .request(server)
      .post("/")
      .send({email:"demo@gmail.com"})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
         res.body.should.have.property("result").eq("User Not found!");
        done();
      });
  })
});