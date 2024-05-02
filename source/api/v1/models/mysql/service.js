'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Service.init({
    uuid: DataTypes.UUID,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    provider_id: DataTypes.BIGINT,
    category_id: DataTypes.BIGINT,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};