import { DataTypes, Model } from 'sequelize'
import {sequelize} from '../../../../database/mysql/connection.js'
class Favorite_appointment extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    models
      
  }
}
Favorite_appointment.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  client_id: DataTypes.BIGINT,
  appointment_id: DataTypes.BIGINT,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
}, {
  sequelize,
  tableName: 'favorite_appointments',
  paranoid: true,
  deletedAT: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export default Favorite_appointment