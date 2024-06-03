import Category from '../models/mysql/categories.js'
import Service from '../models/mysql/services.js'
import User from '../models/mysql/users.js'

export const createCategory = async (category) => {
    await Category.create(category)
}


export const detailCategoryID = async (id) => {
    const category = await Category.findOne({
        where: {
            id: id
        },
        attributes: {
            exclude: ['admin_id', 'created_at', 'updated_at', 'deleted_at'],
        },
        include: {
            model: Service,
            as: 'service',
            attributes: ['name'],
            include: {
                model: User,
                as: 'provider',
                attributes: { exclude: ['password', 'verified_at', 'created_at', 'updated_at', 'deleted_at'] }
            }
        }
    })
    return category
}


export const detailCategoryUUID = async (uuid) => {
    const category = await Category.findOne({
        where: {
            uuid: uuid
        },
        attributes: {
            exclude: ['admin_id', 'created_at', 'updated_at', 'deleted_at'],
        },
        include: {
            model: Service,
            as: 'service',
            attributes: ['name'],
            include: {
                model: User,
                as: 'provider',
                attributes: { exclude: ['password', 'verified_at', 'created_at', 'updated_at', 'deleted_at'] }
            }
        }
    })
    return category
}


export const updateCategory = async (id, name) => {
    await Category.update({
        category_name: name
    }, {
        where: {
            id: id
        }
    })
}


export const deleteCategory = async (id) => {
    await Category.destroy({
        where: {
            id: id
        }
    })
}


export const getListCategory = async () => {
    const category = await Category.findAll({
        attributes: { exclude: ['admin_id', 'created_at', 'updated_at', 'deleted_at'] }
    })
    return category
}


export const getListCategoryProviderID = async (providerID) => {
    const category = await Category.findAll({
        where: {
            provider_id: providerID
        }
    }, {
        attributes: { exclude: ['admin_id'] }
    })
    return category
}

