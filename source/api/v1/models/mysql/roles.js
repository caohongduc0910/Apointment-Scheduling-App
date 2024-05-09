import { DataTypes, Model } from 'sequelize'
import {sequelize} from '../../../../database/mysql/connection.js'
class Role extends Model {
  static associate(models) {
      Role.hasMany(models.User)
  }
}
Role.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  uuid: {
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4
  },
  role_name: DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE
}, {
  sequelize,
  tableName: 'roles',
  paranoid: true,
  deletedAT: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export default Role