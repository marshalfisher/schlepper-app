module.exports = (sequelize, DataTypes) => {
    const Trade = sequelize.define('Trade', {
      user1: DataTypes.STRING,
      user2: DataTypes.STRING,
      user1offer: DataTypes.STRING,
      user2offer: DataTypes.STRING,
      location: DataTypes.STRING,
      additional: DataTypes.STRING,
    })
    return Trade;
  };