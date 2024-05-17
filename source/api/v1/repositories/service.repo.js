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
        attributes: { exclude: ['id', 'uuid', 'provider_id', 'category_id', 'created_at', 'updated_at', 'deleted_at'] },
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