const Sequelize = require('sequelize');

const config = {
  host: 'localhost',
  dialect: 'postgres',
};

const sequelize = new Sequelize('schlepperdb', 'postgres', 'postgres', config);
const db = {};

//brings in  model definitions
const User = require('./user');
const Message = require('./message');
const Trade = require('./trade');
//intialized them
const UserModel = User(sequelize, Sequelize.DataTypes);
const MessageModel = Message(sequelize, Sequelize.DataTypes);
const TradeModel = Trade(sequelize, Sequelize.DataTypes);
db[UserModel.name] = UserModel;
db[MessageModel.name] = MessageModel;
db[TradeModel.name] = TradeModel;

//prepares db for export
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
