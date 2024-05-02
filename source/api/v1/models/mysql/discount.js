'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Discount.init({
    uuid: DataTypes.UUID,
    type: DataTypes.DOUBLE,
    value: DataTypes.DOUBLE,
    event: DataTypes.STRING,
    expiry: DataTypes.DATE,
    provider_id: DataTypes.BIGINT,
    code: DataTypes.STRING,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Discount',
  });
  return Discount;
};