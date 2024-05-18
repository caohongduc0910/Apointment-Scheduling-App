import Service from '../models/mysql/services.js'
import Category from '../models/mysql/categories.js'

export const createService = async (category) => {
    await Service.create(category)
}


export const detailService = async (uuid) => {
    const service = await Service.findOne({
        where: {
            uuid: uuid
        },
        attributes: { exclude: ['id', 'uuid', 'category_id', 'created_at', 'updated_at', 'deleted_at'] },
        include: {
            model: Category,
            as: 'category',
            attributes: ['category_name']
        }
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
        attributes: { exclude: ['id', 'uuid', 'provider_id', 'category_id', 'created_at', 'updated_at', 'deleted_at'] },
        include: {
            model: Category,
            as: 'category',
            attributes: ['category_name']
        }
    })
    return service
}


export const getAllService = async (id) => {
    const service = await Service.findAll({
        attributes: { exclude: ['id', 'uuid', 'provider_id', 'category_id', 'created_at', 'updated_at', 'deleted_at'] },
        include: {
            model: Category,
            as: 'category',
            attributes: ['category_name']
        }
    })
    return service
}