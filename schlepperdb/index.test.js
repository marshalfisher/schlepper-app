const supertest = require('supertest');
const assert = require('assert');
const app = require('./index');

describe("POST /login", function(){
  it('it should return status code 200 if account exists', function(done){
    supertest(app)
    .post('/login')
    .send({name: "Roger"})
    .expect(200)
    .end(function(err,res){
      if (err) done(err);
      done();
    });
  });
});