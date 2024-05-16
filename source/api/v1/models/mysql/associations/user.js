import User from "../users.js"
import Role from "../roles.js"

User.belongsTo(Role, {
    foreignKey: {
        name: 'role_id',
    },
    as: 'role'
})