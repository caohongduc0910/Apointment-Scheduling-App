import Service from '../models/mysql/services.js'
import Category from '../models/mysql/categories.js'
import User from '../models/mysql/users.js'
import Appointment from '../models/mysql/appointments.js'

export const createService = async (category) => {
    await Service.create(category)
}


export const detailServiceUUID = async (uuid) => {
    const service = await Service.findOne({
        where: {
            uuid: uuid
        },
        attributes: { exclude: ['uuid', 'category_id', 'created_at', 'updated_at', 'deleted_at'] },
        include: [
            {
                model: Category,
                as: 'category',
                attributes: ['uuid', 'category_name']
            },
            {
                model: User,
                as: 'provider',
                attributes: { exclude: ['id', 'uuid', 'password', 'created_at', 'verified_at', 'updated_at', 'deleted_at'] },
            },
            {
                model: Appointment,
                as: 'appointments',
                attributes: { exclude: ['id', 'uuid', 'created_at', 'updated_at', 'deleted_at'] },
            }
        ]
    })
    return service
}

export const detailServiceID = async (id) => {
    const service = await Service.findOne({
        where: {
            id: id
        },
        attributes: { exclude: ['uuid', 'category_id', 'created_at', 'updated_at', 'deleted_at'] },
        include: [
            {
                model: Category,
                as: 'category',
                attributes: ['uuid', 'category_name']
            },
            {
                model: User,
                as: 'provider',
                attributes: { exclude: ['id', 'uuid', 'password', 'created_at', 'verified_at', 'updated_at', 'deleted_at'] },
            },
            {
                model: Appointment,
                as: 'appointments',
                attributes: { exclude: ['uuid', 'created_at', 'updated_at', 'deleted_at'] },
            }
        ]
    })
    return service
}


export const updateService = async (service, uuid) => {
    console.log(service)
    await Service.update(service, {
        where: {
            uuid: uuid
        }
    })
}


export const deleteServiceByUUID = async (uuid) => {
    await Service.destroy({
        where: {
            uuid: uuid,
        }
    })
}


export const getAllServiceByProviderID = async (id) => {
    const service = await Service.findAll({
        where: {
            provider_id: id
        },
        attributes: { exclude: ['uuid', 'category_id', 'created_at', 'updated_at', 'deleted_at'] },
        include: [
            {
                model: Category,
                as: 'category',
                attributes: ['uuid', 'category_name']
            },
            {
                model: User,
                as: 'provider',
                attributes: { exclude: ['id', 'uuid', 'password', 'created_at', 'verified_at', 'updated_at', 'deleted_at'] },
            },
            {
                model: Appointment,
                as: 'appointments',
                attributes: { exclude: ['uuid', 'created_at', 'updated_at', 'deleted_at'] },
            }
        ]
    })
    return service
}


export const getAllService = async (id) => {

    const whereClause = id != 0 ? { category_id: id } : {}

    const service = await Service.findAll({
        where: whereClause,
        attributes: { exclude: ['uuid', 'category_id', 'created_at', 'updated_at', 'deleted_at'] },
        include: [
            {
                model: Category,
                as: 'category',
                attributes: ['uuid', 'category_name']
            },
            {
                model: User,
                as: 'provider',
                attributes: { exclude: ['id', 'uuid', 'password', 'created_at', 'verified_at', 'updated_at', 'deleted_at'] },
            },
            {
                model: Appointment,
                as: 'appointments',
                attributes: { exclude: ['uuid', 'created_at', 'updated_at', 'deleted_at'] },
            }
        ]
    })
    return service
}


export const countServiceByCategoryID = async (id) => {
    const answer = await Service.count({
        where: {
            category_id: id
        }
    })
    return answer
}