import {DataTypes} from 'sequelize'
import {sequelize} from '../../../../database/mysql/databaseMySQL.js'

const User = sequelize.define(
  'managers',
  {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
)

export const indexDashboard = async (req, res) => {
  const users = await User.findAll({
    attributes: ['email', 'fullname']
  })
  console.log(users)
  res.send("Dashboard Admin")
}

