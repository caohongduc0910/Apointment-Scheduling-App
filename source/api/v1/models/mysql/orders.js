import { DataTypes, Model } from 'sequelize'
import {sequelize} from '../../../../database/mysql/connection.js'
class Order extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    models
      
  }
}
Order.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  uuid: {
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4
  },
  amount: DataTypes.DOUBLE,
  client_id: DataTypes.BIGINT,
  appointment_id: DataTypes.BIGINT,
  discount_id: DataTypes.BIGINT,
  payment_method_id: DataTypes.BIGINT,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE
}, {
  sequelize,
  tableName: 'orders',
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export default Order