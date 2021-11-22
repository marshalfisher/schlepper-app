const supertest = require('supertest');
const assert = require('assert');
const app = require('./index');
const sinon = require('sinon');
//https://sinonjs.org/ for mocking
//User Controller
describe("POST /login", function(){
  it('it should return status code 200 if account exists', function(done){
    supertest(app)
    .post('/login')
    .send({name: "Roger", password:"123rf45"})
    .expect(200)
    .end(function(err,res){
      if (err) done(err);
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
      if (err) done (err);
      done();
    });
  });
})

describe("POST /new", function(){
  it('it should return status code 409 if user already exists', function(){
    supertest(app)
    .post('/new')
    .send({username: 'Roger', password: '123rf45'})
    .expect(409)
    .end(function(err, res){
      if (err) done(err);
      done();
    });
  });
});

describe("POST /new", function(){
  it('it should return status code 201 if user is created successfully', function(){
    supertest(app)
    .post('/new')
    .send({username: 'Rafael', password: '123rn45'})
    .expect(201)
    .end(function(err, res){
      if (err) done(err);
      done();
    });
  });
});

describe("POST /addCollection", function(){
  it('should return status code 200 if collection is added successfully', function(){
    supertest(app)
    .post('/addCollection')
    .send({})
  });
});

/*describe("POST /addCollection", function(){
  it('should return status code 500 if collection is not successfully', function(){
    supertest(app)
    .post('/addCollection')
    .send({})
    .expect(500)
    .end(function(err, res){
      if (err) done(err);
      done()
    });
  });
});  need to work out what to send for collection*/

describe("POST /addWant", function(){
  it('it should return status code 200 if API responds', function(done){
    supertest(app)
    .post('/addWant')
    .send('https://api.discogs.com/releases/21') // needs work
    .expect(200)
    .end(function(err,res){
      if (err) done(err);
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
      if (err) done(err);
      done();
    });
  });
});

describe("POST /callAPI", function(){
  it('it should return status code 200 if API call successful ', function(done){
    supertest(app)
    .post('/callAPI')
    .send('') //??
    .expect(200)
    .end(function(err,res){
      if (err) done(err);
      done();
    });
  });
});

describe("POST /callAPI", function(){
  it('it should return status code 500 if API call unsuccessful ', function(done){
    supertest(app)
    .post('/callAPI')
    .send('') //??
    .expect(500)
    .end(function(err,res){
      if (err) done(err);
      done();
    });
  });
});

describe("POST /searchAPI", function(){
  it('it should return status code 200 if API returns successfully ', function(done){
    supertest(app)
    .post('/searchAPI')
    .send('') //??
    .expect(200)
    .end(function(err,res){
      if (err) done(err);
      done();
    });
  });
});

describe("POST /searchAPI", function(){
  it('it should return status code 500 if API returns unsuccessfully ', function(done){
    supertest(app)
    .post('/searchAPI')
    .send('') //??
    .expect(200)
    .end(function(err,res){
      if (err) done(err);
      done();
    });
  });
});

describe("POST /findTrades", function(){
  it('it should return status code 200 if trades are found ', function(done){
    supertest(app)
    .post('/findTrades')
    .send('')//??
    .expect(200)
    .end(function(err,res){
      if (err) done(err);
      done();
    });
  });
});
    describe("POST /findTrades", function(){
      it('it should return status code 500 if find trades fails ', function(done){
        supertest(app)
        .post('/findTrades')
        .send('') //??
        .expect(500)
        .end(function(err,res){
          if (err) done(err);
          done();
        });
      });
    });

    describe("POST /getUser", function(){
      it('it should return status code 200 if user is found ', function(done){
        supertest(app)
        .post('/getUser')
        .send({username: Roger})
        .expect(200)
        .end(function(err,res){
          if (err) done(err);
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
          if (err) done(err);
          done();
        });
      });
    });

    describe("POST /sendImage", function(){
      it('it should return status code 201 if Image is added successfully ', function(done){
        supertest(app)
        .post('/sendImage')
        .send('')//??
        .expect(201)
        .end(function(err,res){
          if (err) done(err);
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
          if (err) done(err);
          done();
        });
      });
    });

    describe("POST /sendImage", function(){
      it('it should return status code 500 if sending image fails', function(done){
        supertest(app)
        .post('/sendImage')
        .send('') //??
        .expect(500)
        .end(function(err,res){
          if (err) done(err);
          done();
        });
      });
    });

    describe("POST /updateUser", function(){
      it('it should return status code 201 if user is updated successfully ', function(done){
        supertest(app)
        .post('/updateUser')
        .send({username: Roger, value: '', newValue: ''}) //needs values
        .expect(201)
        .end(function(err,res){
          if (err) done(err);
          done();
        });
      });
    });

    describe("POST /updateUser", function(){
      it('it should return status code 500 if user update fails ', function(done){
        supertest(app)
        .post('/updateUser')
        .send({username: Roger, value: banana, newValue: failure})
        .expect(500)
        .end(function(err,res){
          if (err) done(err);
          done();
        });
      });
    });

    describe("POST /deleteCollection", function(){
      it('it should return status code 201 if collection is deleted ', function(done){
        supertest(app)
        .post('/deleteCOllection')
        .send('') //??
        .expect(201)
        .end(function(err,res){
          if (err) done(err);
          done();
        });
      });
    });

    describe("POST /deleteCollection", function(){
      it('it should return status code 500 if collection deleting fails ', function(done){
        supertest(app)
        .post('/deleteCollection')
        .send('')
        .expect(500)
        .end(function(err,res){
          if (err) done(err);
          done();
        });
      });
    });

    describe("POST /deleteWant", function(){
      it('it should return status code 201 if want if deleted ', function(done){
        supertest(app)
        .post('/deleteWant')
        .send('') //??
        .expect(201)
        .end(function(err,res){
          if (err) done(err);
          done();
        });
      });
    });

    describe("POST /deleteWant", function(){
      it('it should return status code 200 if want was not in user.wants ', function(done){
        supertest(app)
        .post('/deleteWant')
        .send('')//??
        .expect(200)
        .end(function(err,res){
          if (err) done(err);
          done();
        });
      });
    });

    describe("POST /deleteWant", function(){
      it('it should return status code 500 if deleteWant errors ', function(done){
        supertest(app)
        .post('/deleteWant')
        .send('') //??
        .expect(500)
        .end(function(err,res){
          if (err) done(err);
          done();
        });
      });
    });

//Message controllers
    describe("POST /deleteMessage", function(){
      it('it should return status code 200 if message is deleted ', function(done){
        supertest(app)
        .post('/deleteMessage')//need mock data
        .send({id: 42})
        .expect(200)
        .end(function(err,res){
          if (err) done(err);
          done();
        });
      });
    });

    describe("POST /deleteMessage", function(){
      it('it should return status code 500 if message is not deleted ', function(done){
        supertest(app)
        .post('/deleteMessage')
        .send('') //??
        .expect(500)
        .end(function(err,res){
          if (err) done(err);
          done();
        });
      });
    });

    describe("POST /getMessages", function(){
      it('it should return status code 200 if messages are found ', function(done){
        supertest(app)
        .post('/getMessages')
        .send('') //?? need to mock db
        .expect(200)
        .end(function(err,res){
          if (err) done(err);
          done();
        });
      });
    });

    describe("POST /getMessages", function(){
      it('it should return status code 500 if messages are not found ', function(done){
        supertest(app)
        .post('/getMessages')
        .send('') //??
        .expect(500)
        .end(function(err,res){
          if (err) done(err);
          done();
        });
      });
    });

    describe("POST /sendMessage", function(){
      it('it should return status code 201 if message is sent ', function(done){
        supertest(app)
        .post('/sendMessage')
        .send('') //need to mock message
        .expect(201)
        .end(function(err,res){
          if (err) done(err);
          done();
        });
      });
    });

    describe("POST /sendMessage", function(){
      it('it should return status code 401 if message is invalid ', function(done){
        supertest(app)
        .post('/sendMessage')
        .send({newMessage: '549o/!'})
        .expect(401)
        .end(function(err,res){
          if (err) done(err);
          done();
        });
      });
    });

    describe("POST /sendMessage", function(){
      it('it should return status code 500 if sendMessage errors ', function(done){
        supertest(app)
        .post('/sendMessage')
        .send('') //??
        .expect(500)
        .end(function(err,res){
          if (err) done(err);
          done();
        });
      });
    });
//Trade Controller
    describe("POST /deleteTrade", function(){
      it('it should return status code 200 if trade is deleted successfully ', function(done){
        supertest(app)
        .post('/deleteTrade')
        .send('') //??
        .expect(200)
        .end(function(err,res){
          if (err) done(err);
          done();
        });
      });
    });

    describe("POST /deleteTrade", function(){
      it('it should return status code 500 if trade deletion fails ', function(done){
        supertest(app)
        .post('/deleteTrade')
        .send('')
        .expect(500)
        .end(function(err,res){
          if (err) done(err);
          done();
        });
      });
    });

    describe("POST /getTrades", function(){
      it('it should return status code 200 if trades are retrieved successfully ', function(done){
        supertest(app)
        .post('/getTrades')
        .send('') //??
        .expect(200)
        .end(function(err,res){
          if (err) done(err);
          done();
        });
      });
    });

    describe("POST /getTrades", function(){
      it('it should return status code 500 if trades cannot be found ', function(done){
        supertest(app)
        .post('/getTrades')
        .send('')//??
        .expect(500)
        .end(function(err,res){
          if (err) done(err);
          done();
        });
      });
    });

    describe("POST /makeTrade", function(){
      it('it should return status code 201 if trade is made ', function(done){
        supertest(app)
        .post('/makeTrade')
        .send('') //??
        .expect(201)
        .end(function(err,res){
          if (err) done(err);
          done();
        });
      });
    });

    describe("POST /makeTrade", function(){
      it('it should return status code 400 if trade cannot be made ', function(done){
        supertest(app)
        .post('/makeTrade')
        .send('') //??
        .expect(400)
        .end(function(err,res){
          if (err) done(err);
          done();
        });
      });
    });

    describe("POST /makeTrade", function(){
      it('it should return status code 500 if makeTrade errors ', function(done){
        supertest(app)
        .post('/makeTrade')
        .send('') //??
        .expect(500)
        .end(function(err,res){
          if (err) done(err);
          done();
        });
      });
    });