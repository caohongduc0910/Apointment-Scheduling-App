import { DataTypes, Model } from 'sequelize'
import {sequelize} from '../../../../database/mysql/connection.js'

class Service extends Model {
  static associate(models) {}
}

Service.init({
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
  description: DataTypes.TEXT,
  image: DataTypes.TEXT,
  price: DataTypes.DOUBLE,
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  provider_id: DataTypes.BIGINT,
  category_id: DataTypes.BIGINT,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE
}, {
  sequelize,
  tableName: 'services',
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});
export default Service