import { DataTypes, Model } from 'sequelize'
import {sequelize} from '../../../../database/mysql/connection.js'

class Appointment extends Model {
  static associate(models) {}
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
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});
export default Appointment