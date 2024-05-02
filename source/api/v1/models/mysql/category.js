'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    uuid: DataTypes.UUID,
    category_name: DataTypes.STRING,
    admin_id: DataTypes.BIGINT,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};