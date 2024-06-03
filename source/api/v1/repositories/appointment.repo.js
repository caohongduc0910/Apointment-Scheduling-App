import Appointment from '../models/mysql/appointments.js'
import Status from '../models/mysql/statuses.js'
import Service from '../models/mysql/services.js'
import User from '../models/mysql/users.js'
import Category from '../models/mysql/categories.js'

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


export const detailAppointment = async (clientID, providerID, serviceID, time) => {
    const appointment = await Appointment.findOne({
        where: {
            client_id: clientID,
            provider_id: providerID,
            service_id: serviceID,
            time: time
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



export const updateAppointmentClient = async (uuid, name, note, time, method) => {
    await Appointment.update({
        name: name,
        note: note,
        time: time,
        method: method
    }, {
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


export const getAllAppointmentByClientID = async (clientID, serviceID) => {

    const whereClause = serviceID ? {
        client_id: clientID,
        service_id: serviceID
    } : {
        client_id: clientID,
    }

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


export const getAllAppointmentByProviderID = async (providerID, serviceID) => {

    const whereClause = serviceID ? {
        provider_id: providerID,
        service_id: serviceID
    } : {
        provider_id: providerID,
    }

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


export const getAllAppointment = async (serviceID, clientID, providerID) => {

    const whereClause = {
        ...(serviceID && { service_id: serviceID }),
        ...(providerID && { provider_id: providerID }),
        ...(clientID && { client_id: clientID })
    }

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