import { DataTypes, Model } from 'sequelize'
import {sequelize} from '../../../../database/mysql/connection.js'
class Appointment extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    models
      
  }
}
Appointment.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  uuid: {
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4
  },
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
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE
}, {
  sequelize,
  tableName: 'appointments',
  paranoid: true,
  deletedAT: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});
export default Appointment