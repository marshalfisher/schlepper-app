const { Sequelize } = require("../models");
const { config } = require("process");
const User = require('../models/user')
const express = require('express')
const router = require('express').Router();
const supertest = require('supertest')
const jest = require('jest');
const app = express();
const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const { assert } = require("chai");


describe("POST /makeTrade", function(){
  it('it should return status code 201 if trade is made ', function(done){
    const trade = 'Trade test';
    supertest(app)
    .post('/makeTrade')
    .send(trade)
    .expect(201)
    .end(function(err,res){
      done();
    });
  });
});

describe("POST /makeTrade", function(){
  it('it should return status code 400 if trade cannot be made ', function(done){
    supertest(app)
    .post('/makeTrade')
    .send({})
    .expect(400)
    .end(function(err,res){
      done();
    });
  });
});

describe("POST /makeTrade", function(){
  it('it should return status code 500 if makeTrade errors ', function(done){
    supertest(app)
    .post('/makeTrade')
    //.send('')
    .expect(500)
    .end(function(err,res){
      done();
    });
  });
});

describe("POST /deleteTrade", function(){
  it('it should return status code 200 if trade is deleted successfully ', function(done){
    const trade = 'Trade test';
    supertest(app)
    .post('/deleteTrade')
    .send(trade)
    .expect(200)
    .end(function(err,res){
      done();
    });
  });
});

describe("POST /deleteTrade", function(){
  it('it should return status code 500 if trade deletion fails ', function(done){
    supertest(app)
    .post('/deleteTrade')
    //.send('')
    .expect(500)
    .end(function(err,res){
      done();
    });
  });
});

describe("POST /getTrades", function(){
  it('it should return status code 200 if trades are retrieved successfully ', function(done){
    const trade = 'Trade test';
    supertest(app)
    .post('/getTrades')
    .send(trade)
    .expect(200)
    .end(function(err,res){
      done();
    });
  });
});

describe("POST /getTrades", function(){
  it('it should return status code 500 if trades cannot be found ', function(done){
    supertest(app)
    .post('/getTrades')
    //.send('')
    .expect(500)
    .end(function(err,res){
      done();
    });
  });
});
