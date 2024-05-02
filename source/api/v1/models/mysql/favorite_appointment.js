'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite_appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Favorite_appointment.init({
    client_id: DataTypes.BIGINT,
    appointment_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Favorite_appointment',
  });
  return Favorite_appointment;
};