import User from "../users.js"
import Role from "../roles.js"
import Service from "../services.js"

User.belongsTo(Role, {
    foreignKey: {
        name: 'role_id',
    },
    as: 'role'
})


User.hasMany(Service, {
    foreignKey: {
        name: 'provider_id',
    },
    as: 'services'
})