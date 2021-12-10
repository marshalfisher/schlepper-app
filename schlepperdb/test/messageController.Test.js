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
const getMessages = require('../controller/messageController');
const { request } = require('http');

describe("POST /sendMessage", function(){
  it('it should return status code 201 if message is sent ', function(done){
    const message = 'Hello! This is a test!';
    supertest(app)
    .post('/sendMessage')
    .send(message)
    .expect(201)
    .end(function(err,res){
      done();
    });
  });
});

describe("POST /sendMessage", function(){
  it('it should return status code 401 if message is invalid ', function(done){
    const message = {username: "RogerF"}
    supertest(app)
    .post('/sendMessage')
    .send(message)
    .expect(401)
    .end(function(err,res){
      done();
    });
  });
});

describe("POST /sendMessage", function(){
  it('it should return status code 500 if sendMessage errors ', function(done){
    supertest(app)
    .post('/sendMessage')
    .send({})
    .expect(500)
    .end(function(err,res){
      done();
    });
  });
});

describe("POST /deleteMessage", function(){
  it('it should return status code 200 if message is deleted ', function(done){
    const message = 'Hello! This is a test!';
    supertest(app)
    .post('/deleteMessage')
    .send(message)
    .expect(200)
    .end(function(err,res){
      done();
    });
  });
});

describe("POST /deleteMessage", function(){
  it('it should return status code 500 if message is not deleted ', function(done){
    supertest(app)
    .post('/deleteMessage')
    .send('')
    .expect(500)
    .end(function(err,res){
      done();
    });
  });
});

describe("POST /getMessages", function(){
  it('it should return status code 200 if messages are found ', function(done){
    const message = 'Hello! This is a test!';
    supertest(app)
    .post('/getMessages')
    .send(message)
    .expect(200)
    .end(function(err,res){
      done();
    });
  });
});

describe("POST /getMessages", function(){
  it('it should return status code 500 if messages are not found ', function(done){
    const message = 'THIS MESSAGE DOESNT EXIST?';
    supertest(app)
    .post('/getMessages')
    .send(message)
    .expect(500)
    .end(function(err,res){
      done();
    });
  });
});
