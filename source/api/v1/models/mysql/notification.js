'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notification.init({
    uuid: DataTypes.UUID,
    url: DataTypes.TEXT,
    is_read: DataTypes.BOOLEAN,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    receiver_id: DataTypes.BIGINT,
    notification_type_id: DataTypes.BIGINT,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};