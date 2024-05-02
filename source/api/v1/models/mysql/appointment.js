'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Appointment.init({
    uuid: DataTypes.UUID,
    name: DataTypes.STRING,
    note: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    time: DataTypes.DATE,
    status_id: DataTypes.BIGINT,
    service_id: DataTypes.BIGINT,
    method: DataTypes.BOOLEAN,
    url: DataTypes.TEXT,
    client_id: DataTypes.BIGINT,
    provider_id: DataTypes.BIGINT,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};