'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    uuid: DataTypes.UUID,
    amount: DataTypes.DOUBLE,
    client_id: DataTypes.BIGINT,
    appointment_id: DataTypes.BIGINT,
    discount_id: DataTypes.BIGINT,
    payment_method_id: DataTypes.BIGINT,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};