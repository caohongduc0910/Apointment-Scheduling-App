'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    uuid: DataTypes.UUID,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.TEXT,
    fullname: DataTypes.STRING,
    image: DataTypes.TEXT,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    role_id: DataTypes.BIGINT,
    verified_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User
};