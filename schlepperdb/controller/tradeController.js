const db = require('../models/index.js');
const { Op } = require('sequelize');

//adds trade to database
async function makeTrade(req, res) {
  try {
    const newTrade = await db.Trade.create(req.body);
    if (newTrade) {
      res.status(201).send(newTrade);
    } else res.status(400).send("couldn't make trade");
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}

//deletes trade from database
async function deleteTrade(req, res) {
  try {
    const { id } = req.body;
    const trade = await db.Trade.findOne({ where: { id: id } });
    await trade.destroy();
    res.status(200).send('Trade Deleted');
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}

//gets trades from database
async function getTrades(req, res) {
  try {
    const { user } = req.body;
    const trades = await db.Trade.findAll({
      where: { [Op.or]: [{ user1: user }, { user2: user }] },
    });
    if (trades.length) {
      res.status(200).send(trades);
    } else res.status(200).send([]);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}

module.exports = {
  makeTrade,
  deleteTrade,
  getTrades,
};
