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


export const updateAppointmentClient = async (uuid, newAppointment) => {
    await Appointment.update(newAppointment, {
        where: {
            uuid: uuid
        },
    })
}


export const updateAppointmentProvider = async (uuid, status, url) => {
    await Appointment.update({
        status_id: status,
        url: url
    }, {
        where: {
            uuid: uuid
        },
    })
}


export const updateAppointmentStatus = async (uuid, status) => {
    await Appointment.update({
        status_id: status
    }, {
        where: {
            uuid: uuid
        },
    })
}


export const deleteAppointment = async (uuid) => {
    await Appointment.destroy({
        where: {
            uuid: uuid
        },
    })
}


export const getAllAppointmentByClientID = async (whereClause) => {

    const arr = await Appointment.findAll({
        where: whereClause,
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
    return arr
}


export const getAllAppointmentByProviderID = async (whereClause) => {

    const arr = await Appointment.findAll({
        where: whereClause,
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
    return arr
}


export const getAllAppointment = async (whereClause) => {

    const arr = await Appointment.findAll({
        where: whereClause,
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
    return arr
}
