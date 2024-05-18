import Category from '../models/mysql/categories.js'

export const createCategory = async (category) => {
    await Category.create(category)
}

export const detailCategory = async (id) => {
    const category = await Category.findOne({
        where: {
            id: id
        },
        attributes: { exclude: ['admin_id'] }
    })
    return category
}

export const detailCategoryUUID = async (uuid) => {
    const category = await Category.findOne({
        where: {
            uuid: uuid
        },
        attributes: { exclude: ['admin_id'] }
    })
    return category
}
