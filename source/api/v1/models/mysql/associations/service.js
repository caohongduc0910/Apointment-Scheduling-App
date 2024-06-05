import Service from "../services.js"
import Category from "../categories.js"
import User from "../users.js"
import Appointment from "../appointments.js"

Service.belongsTo(Category, {
    foreignKey: {
        name: 'category_id',
    },
    as: 'category'
})


Service.belongsTo(User, {
    foreignKey: {
        name: 'provider_id',
    },
    as: 'provider'
})


Service.hasMany(Appointment, {
    foreignKey: {
        name: 'service_id',
    },
    as: 'appointments'
})