import { DataTypes, Model } from 'sequelize'
import {sequelize} from '../../../../database/mysql/connection.js'
class Token extends Model {
  static associate(models) {
    Token.belongsTo(models.User) 
  }
}
Token.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  token: DataTypes.STRING,
  user_id: DataTypes.BIGINT,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE
}, {
  sequelize,
  tableName: 'tokens',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});
export default Token
