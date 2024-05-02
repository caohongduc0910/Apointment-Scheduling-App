'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Feedback.init({
    uuid: DataTypes.UUID,
    content: DataTypes.TEXT,
    image_url: DataTypes.TEXT,
    rating: DataTypes.BIGINT,
    client_id: DataTypes.BIGINT,
    appointment_id: DataTypes.BIGINT,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Feedback',
  });
  return Feedback;
};