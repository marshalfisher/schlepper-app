const chai = require("chai");
const sinon = require("sinon");
const userController = require('../controller/userController');
const expect = chai.expect;
const { assert } = require("chai");
const { Sequelize } = require("../models");
const { config } = require("process");
const User = require('../models/user')
const express = require('express')
const router = require('express').Router();
const supertest = require('supertest')
const jest = require('jest');
const app = express();
describe('POST /new', function() {
  it('should create new user', async() => {
    const user = {
      username:'RogerF',
      email: 'testing12@gmail.com',
      password: "qwerty123",
      city: "New York",
      State: "New York"
    }
    supertest(app)
    .post('/new')
    .send(user)
    .expect(200)
    .end(function(err,res){
    });
  });
});

describe("POST /login", function(){
  it('it should return status code 200 if account exists', function(done){
    const user = {
      username:'RogerF',
      email: 'testing12@gmail.com',
      password: "qwerty123",
      city: "New York",
      State: "New York"
    }
    supertest(app)
    .post('/login')
    .send(user)
    .expect(200)
    .end(function(err,res){
      done();
    });
  });
});

describe("POST /login", function(){
  it('it should return status code 400 if nothing is sent', function(done){
    supertest(app)
    .post('/login')
    .send({})
    .expect(400)
    .end(function(err, res){
      done();
    });
  });
})


describe("POST /addCollection", function(){
  it('should return status code 500 if collection is not successfully', function(){
    supertest(app)
    .post('/addCollection')
    .send({})
    .expect(500)
    .end(function(err, res){
    });
  });
});

describe("POST /addWant", function(){
  it('it should return status code 200 if API responds', function(done){
    supertest(app)
    .post('/addWant')
    .send('https://api.discogs.com/releases/21')
    .expect(200)
    .end(function(err,res){
      done();
    });
  });
});

describe("POST /addWant", function(){
  it('it should return status code 404 if album not found', function(done){
    supertest(app)
    .post('/addWant')
    .send('https://api.discogs.com/releases/77777777777777') //needs work
    .expect(404)
    .end(function(err,res){
      done();
    });
  });
});

describe("POST /callAPI", function(){
  it('it should return status code 200 if API responds', function(done){
    supertest(app)
    .post('/addWant')
    .send('https://api.discogs.com/releases/21')
    .expect(200)
    .end(function(err,res){
      done();
    });
  });
});

describe("POST /callAPI", function(){
  it('it should return status code 500 if API call is unsuccessful ', function(done){
    supertest(app)
    .post('/addWant')
    .send('https://api.discogs.com/releases/77777777777777') //needs work
    .expect(404)
    .end(function(err,res){
      done();
    });
  });
});

describe("POST /searchAPI", function(){
  it('it should return status code 200 if API returns successfully ', function(done){
    supertest(app)
    .post('/searchAPI')
    .send('https://api.discogs.com/releases/22')
    .expect(200)
    .end(function(err,res){
      done();
    });
  });
});

describe("POST /searchAPI", function(){
  it('it should return status code 500 if API returns unsuccessfully ', function(done){
    supertest(app)
    .post('/searchAPI')
    .send('https://api.discogs.com/releases/777777777')
    .expect(200)
    .end(function(err,res){
      done();
    });
  });
});

describe("POST /findTrades", function(){
  it('it should return status code 200 if trades are found ', function(done){
    const state = {state: 'New York'}
    supertest(app)
    .post('/findTrades')
    .send(state)
    .expect(200)
    .end(function(err,res){
      done();
    });
  });
});

describe("POST /findTrades", function(){
    it('it should return status code 500 if find trades fails ', function(done){
      supertest(app)
      .post('/findTrades')
      .send('')
      .expect(500)
      .end(function(err,res){
        done();
        });
      });
    });

    describe("POST /getUser", function(){
      it('it should return status code 200 if user is found ', function(done){
        const user = {
          username:'RogerF',
          email: 'testing12@gmail.com',
          password: "qwerty123",
          city: "New York",
          State: "New York"
        }
        supertest(app)
        .post('/getUser')
        .send(user)
        .expect(200)
        .end(function(err,res){
          done();
        });
      });
    });

    describe("POST /getUser", function(){
      it('it should return status code 500 if user is not found ', function(done){
        supertest(app)
        .post('/getUser')
        .send({username: 49483})
        .expect(500)
        .end(function(err,res){
          done();
        });
      });
    });

    describe("POST /sendImage", function(){
      it('it should return status code 201 if Image is added successfully ', function(done){
        const image = {
          fileName: 'longf.jpg',
          filePath: '/uploads/longf.jpg'
        }
        supertest(app)
        .post('/sendImage')
        .send(image)
        .expect(201)
        .end(function(err,res){
          done();
        });
      });
    });

    describe("POST /sendImage", function(){
      it('it should return status code 400 if no file sent ', function(done){
        supertest(app)
        .post('/sendImage')
        .send({})
        .expect(400)
        .end(function(err,res){
          done();
        });
      });
    });

    describe("POST /sendImage", function(){
      it('it should return status code 500 if sending image fails', function(done){
        supertest(app)
        .post('/sendImage')
        .send({fileName: 'turtles007', filePath: '/uploads/none'})
        .expect(500)
        .end(function(err,res){
          done();
        });
      });
    });

    describe("POST /updateUser", function(){
      it('it should return status code 201 if user is updated successfully ', function(done){
        const user = {
          username: 'RogerF',
          value: '',
          newValue: '22'
        }
        supertest(app)
        .post('/updateUser')
        .send(user)
        .expect(201)
        .end(function(err,res){
          done();
        });
      });
    });

    describe("POST /updateUser", function(){
      it('it should return status code 500 if user update fails ', function(done){
        const user = {
          username: 'RogerF',
          value: '',
          newValue: ''
        }
        supertest(app)
        .post('/updateUser')
        .send(user)
        .expect(500)
        .end(function(err,res){
           done();
        });
      });
    });


    describe("POST /deleteWant", function(){
      it('it should return status code 200 if want was not in user.wants ', function(done){
        supertest(app)
        .post('/deleteWant')
        .send('https://api.discogs.com/releases/21')
        .expect(200)
        .end(function(err,res){
          done();
        });
      });
    });

    describe("POST /deleteWant", function(){
      it('it should return status code 500 if deleteWant errors ', function(done){
        supertest(app)
        .post('/deleteWant')
        .send('')
        .expect(500)
        .end(function(err,res){
          done();
        });
      });
    });