import Appointment from '../models/mysql/appointments.js'
import Status from '../models/mysql/statuses.js'
import Service from '../models/mysql/services.js'
import User from '../models/mysql/users.js'

export const createAppointment = async (appointment) => {
    await Appointment.create(appointment)
}

export const detailAppointmentUUID = async (uuid) => {
    const appointment = await Appointment.findOne({
        where: {
            uuid: uuid
        },
        attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
        include: [
            {
                model: Status,
                as: 'status',
                attributes: ['status_name']
            }, {
                model: Service,
                as: 'service',
                attributes: ['name']
            },
            {
                model: User,
                as: 'provider',
                attributes: ['fullname']
            }
        ]
    })

    return appointment
}

export const detailAppointmentID = async (id) => {
    const appointment = await Appointment.findOne({
        where: {
            id: id
        },
        attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
        include: [
            {
                model: Status,
                as: 'status',
                attributes: ['status_name']
            }, {
                model: Service,
                as: 'service',
                attributes: ['name']
            },
            {
                model: User,
                as: 'provider',
                attributes: ['fullname']
            }
        ]
    })

    return appointment
}