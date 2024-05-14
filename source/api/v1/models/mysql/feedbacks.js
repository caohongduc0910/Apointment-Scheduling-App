import { DataTypes, Model } from 'sequelize'
import {sequelize} from '../../../../database/mysql/connection.js'
class Feedback extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    models
      
  }
}
Feedback.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  uuid: {
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4
  },
  content: DataTypes.TEXT,
  image_url: DataTypes.TEXT,
  rating: DataTypes.INTEGER,
  client_id: DataTypes.BIGINT,
  appointment_id: DataTypes.BIGINT,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE
}, {
  sequelize,
  tableName: 'feedbacks',
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export default Feedback