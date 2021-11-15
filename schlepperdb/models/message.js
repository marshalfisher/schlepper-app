module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
      toUser: DataTypes.STRING,
      fromUser: DataTypes.STRING,
      album: DataTypes.STRING,
      offeredAlbum: DataTypes.STRING,
      message: DataTypes.STRING
    })
    return Message;
  }