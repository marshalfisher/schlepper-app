const db = require('../models/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const {Op} = require('sequelize');
//node fetch wasn't working, this code that fixes it is from Stack Overflow and I Do Not Understand It
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


async function sendMessage (req, res) {
    try {
      const NewMessage = await db.Message.create(req.body)
      if (NewMessage) {
        res.status(201).send('Message Sent')
      } else res.status(401).send('Invalid Message') // i'l figure this out later
    } catch (e) {
      console.log(e);
      res.status(500)
    }
  };
  
  async function getMessages (req, res) {
    try {
      const {user} = req.body;
      const messages = await db.Message.findAll( { where: {[Op.or] : [{toUser: user}, {fromUser: user}] } } )
      res.status(200).send(JSON.stringify(messages))
    } catch (e) {
      console.log(e);
      res.status(500)
    }
  };
  
  async function deleteMessage (req, res) {
    try {
      const {id} = req.body;
      const message = await db.Message.findOne({where: {id: id}});
      await message.destroy();
      res.status(200).send('Message Deleted');
    } catch (e) {
      console.log(e);
      res.status(500)
    }
  }

  module.exports ={
    sendMessage,
    getMessages,
    deleteMessage
  }