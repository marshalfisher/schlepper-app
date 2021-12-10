module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    collection: DataTypes.STRING,
    wants: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    photo: DataTypes.STRING,
  });
  return User;
};
