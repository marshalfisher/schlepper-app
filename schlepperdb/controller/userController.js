
const db = require('../models/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(req, res) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (username !=null) {
      const match = await db.User.findOne({where: { username: `${username}`, password: `${password}` }});
      if (match) {
        res.status(200).send(match);
      } else res.status(409).send('nope')
    }
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}; 

async function addUser(req, res) {
  try {
    const {username, email, password} = req.body;
    const hash = await bcrypt.hash(password, 10)
    const user = await db.User.findOne({ email: email });
    if (user) {
    
      return res.status(409).send({ error: '409', message: user });
    }
    const newUser = await db.User.create({
      username,
      email,
      password: hash
    });
    if(newUser){
      res.status(201).send("did it")
    } else res.status(409).send("can't do it")
  } catch (e) {
    console.log(e)
    res.status(500);
  }
  }; 


module.exports = {login, addUser}