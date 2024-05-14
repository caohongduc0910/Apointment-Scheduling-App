import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../../../database/mysql/connection.js'

class User extends Model {
  static associate(models) {
    User.belongsTo(models.Role)
    User.hasOne(models.Token)
  }
}

User.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.TEXT,
  fullname: DataTypes.STRING,
  image: DataTypes.TEXT,
  address: DataTypes.STRING,
  phone: DataTypes.STRING,
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  },
  role_id: DataTypes.BIGINT,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  verified_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE
}, {
  sequelize,
  tableName: 'users',
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default User
