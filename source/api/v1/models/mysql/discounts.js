import { DataTypes, Model } from 'sequelize'
import {sequelize} from '../../../../database/mysql/connection.js'
class Discount extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    models
      
  }
}
Discount.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  uuid: {
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4
  },
  type: DataTypes.TINYINT,
  value: DataTypes.DOUBLE,
  expiry: DataTypes.DATE,
  provider_id: DataTypes.BIGINT,
  code: DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE
}, {
  sequelize,
  tableName: 'discounts',
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});
export default Discount