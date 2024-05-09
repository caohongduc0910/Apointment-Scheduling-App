import { DataTypes, Model } from 'sequelize'
import {sequelize} from '../../../../database/mysql/connection.js'
class Payment_method extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    models
      
  }
}
Payment_method.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  uuid: {
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4
  },
  payment_method: DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE
}, {
  sequelize,
  tableName: 'payment_methods',
  paranoid: true,
  deletedAT: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export default Payment_method