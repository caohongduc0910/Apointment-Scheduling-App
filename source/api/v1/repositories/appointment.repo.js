import Appointment from '../models/mysql/appointments.js'
import Status from '../models/mysql/statuses.js'
import Service from '../models/mysql/services.js'
import User from '../models/mysql/users.js'
import Category from '../models/mysql/categories.js'

import { Op } from 'sequelize';

export const createAppointment = async (appointment) => {
    return await Appointment.create(appointment)
}


export const detailAppointment = async (serviceID, startTime, endTime) => {
    const appointment = await Appointment.findOne({
        where: {
            service_id: serviceID,
            time: {
                [Op.between]: [startTime, endTime],
              },
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
                attributes: ['name', 'price'],
                include: {
                    model: Category,
                    as: 'category',
                    attributes: { exclude: ['admin_id', 'created_at', 'updated_at', 'deleted_at'] }
                }
            },
            {
                model: User,
                as: 'provider',
                attributes: ['fullname', 'email', 'image', 'address', 'phone']
            }
        ]
    })
    return appointment
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
                attributes: ['name', 'price'],
                include: {
                    model: Category,
                    as: 'category',
                    attributes: { exclude: ['admin_id', 'created_at', 'updated_at', 'deleted_at'] }
                }
            },
            {
                model: User,
                as: 'provider',
                attributes: ['fullname', 'email', 'image', 'address', 'phone']
            }
        ]
    })

    return appointment
}



export const deleteAppointment = async (uuid) => {
    await Appointment.destroy({
        where: {
            uuid: uuid
        },
    })
}
