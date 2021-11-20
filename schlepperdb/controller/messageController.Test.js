const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const getMessages = require('./messageController');

describe("Routes", function() {
  describe("GET Messages", function(){
    if('should respond', function() {
      var req,res,spy;
      req=res={};
      spy=res.send=sinon.spy();
      getMessages(req,res);
      expext(spy.calledOnce).to.equal(true);
    });
  });
});