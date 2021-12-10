
const db = require('../models/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const {Op} = require('sequelize');
//node fetch wasn't working, this code that fixes it is from Stack Overflow and I Do Not Understand It
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const SECRET_KEY = 'B-)';

async function login(req, res) {
  try {
    const {username, password} = req.body;
    const match = await db.User.findOne({where: { username: `${username}`}});
    const validatedUser = await bcrypt.compare(password, match.password);
    if (validatedUser) {
      console.log('validated user: ' + match.id)
      const accessToken = jwt.sign({ _id: match.id }, SECRET_KEY);

        res.status(200).send({confirmed: true, accessToken, collection: match.collection, wants: match.wants});
      } else res.status(400).send({confirmed: false});
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}; 

async function addUser(req, res) {
  try {
    const {username, email, password, city, state} = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await db.User.findOne({where: { username: username }});
    if (user) {
      return res.status(409).send({ error: '409', message: "Username already in use." });
    }
    const newUser = await db.User.create({
      username,
      email,
      password: hash,
      collection:"[]",
      wants: "[]",
      city,
      state,
    });
    if(newUser){
      const accessToken = jwt.sign({ _id: newUser.id }, SECRET_KEY);
      res.status(201).send({confirmed: true, accessToken, collection:[], wants:[]});
    } else res.status(409).send({ error: '409', message: "Username already in use." });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}; 

async function addCollection (req, res) {
  try{
    const {username, album} = req.body;
    await db.User.findOne({where: { username: username }})
    .then((user) => {
      const collection = JSON.parse(user.collection);
      if (collection.indexOf(album) === -1) {
      const newCollection = [...collection, album];
      user.update({collection: JSON.stringify(newCollection)});
      res.status(201).send(newCollection);
      } else res.status(200).send(collection);
    })
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

async function addWant (req, res) {
  try{
    const {username, album} = req.body;
    await db.User.findOne({where: { username: username },})
    .then((user) => {
      const wants = JSON.parse(user.wants)
      if (wants.indexOf(album) === -1) {
      const newWants = [...wants, album]
      reswants = JSON.stringify(newWants)
      user.update({wants: JSON.stringify(newWants)})
      res.status(201).send(newWants)
      } else res.status(200).send(wants)
    });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

async function callAPI (req, res) {
  try {
    const {id} = req.body;
    const resAPI = await fetch(`https://api.discogs.com/releases/${id}`, {
      headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Discogs key=BOmgHpLNRiuTWXZGgEPm, secret=sIVZFKlfhSpDjQglswQeYRNGJgfXfyjS',
      'User-Agent': 'Schlepper/0.0.1'
      }
    });
    const response = await resAPI.json();
   res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

async function searchAPI (req, res) {
  try {
    const {query, type} = req.body;
    const resAPI = await fetch(`https://api.discogs.com//database/search?q=${query}&type=${type}`, {
      headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Discogs key=BOmgHpLNRiuTWXZGgEPm, secret=sIVZFKlfhSpDjQglswQeYRNGJgfXfyjS',
      'User-Agent': 'Schlepper/0.0.1'
      }
    });
    const response = await resAPI.json();
   res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

async function deleteCollection (req, res) {
  try{
    const {username, album} = req.body;
    await db.User.findOne({where: { username: username }})
    .then((user) => {
      const collection = JSON.parse(user.collection);
      if (collection.indexOf(album) !== -1) {
      const newCollection = collection.filter((albumID) => albumID != album);
      user.update({collection: JSON.stringify(newCollection)});
      res.status(201).send(newCollection);
      } else res.status(200).send(collection);
    })
  } catch (e) {
    console.log(e);
    res.status(500);
  } 
};

async function deleteWant (req, res) {
  try{
    const {username, album} = req.body;
    await db.User.findOne({where: { username: username }})
    .then((user) => {
      const wants = JSON.parse(user.wants);
      if (wants.indexOf(album) !== -1) {
      const newWants = wants.filter((albumID) => albumID != album);
      user.update({wants: JSON.stringify(newWants)});
      res.status(201).send(newWants);
      } else res.status(200).send(wants);
    })
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

async function findTrades (req, res) {
  try{
    const {area} = req.body;
    const matches = await db.User.findAll({where: { state: `${area}`}});
    res.status(200).send(matches);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

async function getUser (req, res) {
  try{
    const {username} = req.body;
    const match = await db.User.findOne({where: { username: username}});
    res.status(200).send(match);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

async function sendImage (req,res) {
  try {
    if (req.files === null) {
      return res.status(400).send('No file sent')
    }
    const directory = path.join(__dirname, '../../schlepper/public/uploads/')
    const image = req.files.image
    image.mv(directory + image.name, (e) => {
      if(e) {
        console.log(e);
        return res.status(500);
      }
    })
    res.status(201).json({fileName: image.name, filePath:`/uploads/${image.name}`})
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

async function updateUser (req, res) {
  try {
    const {username, value, newValue } = req.body
    await db.User.findOne({where: { username: username }})
    .then((user) => {
      user.update({[value]: newValue});
    })
    res.status(201).send('updated');
  } catch (e) {
    console.log(e)
    res.status(500)
  }
};

module.exports = {
  login,
  addUser,
  addCollection,
  addWant,
  callAPI,
  deleteCollection,
  deleteWant,
  searchAPI,
  findTrades,
  getUser,
  sendImage,
  updateUser,
};