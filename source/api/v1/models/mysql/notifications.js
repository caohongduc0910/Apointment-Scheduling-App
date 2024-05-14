import { DataTypes, Model } from 'sequelize'
import {sequelize} from '../../../../database/mysql/connection.js'

import User from './user.js'

class Notification extends Model {
  static associate(models) {
  }
}

Notification.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  uuid: {
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4
  },
  url: DataTypes.TEXT,
  is_read: DataTypes.BOOLEAN,
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  receiver_id: DataTypes.BIGINT,
  notification_type_id: DataTypes.BIGINT,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE
}, {
  sequelize,
  tableName: 'notifications',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})

export default Notification