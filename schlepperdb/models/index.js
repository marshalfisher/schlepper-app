
const Sequelize = require('sequelize');

const config = {
  host: 'localhost',
  dialect: 'postgres'
}

const sequelize = new Sequelize('schlepperdb', 'postgres', '665532One!', config);
const db = {};


const User = require('./user');
const UserModel = User(sequelize, Sequelize.DataTypes)
db[UserModel.name] = UserModel;


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
