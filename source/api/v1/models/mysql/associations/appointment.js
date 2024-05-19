import Appointment from "../appointments.js"
import Status from "../statuses.js"
import Service from "../services.js"
import User from "../users.js"

Appointment.belongsTo(Status, {
    foreignKey: {
        name: 'status_id',
    },
    as: 'status'
})

Appointment.belongsTo(Service, {
    foreignKey: {
        name: 'service_id',
    },
    as: 'service'
})

Appointment.belongsTo(User, {
    foreignKey: {
        name: 'provider_id',
    },
    as: 'provider'
})