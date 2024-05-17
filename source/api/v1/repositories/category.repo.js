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
        attributes: { exclude: ['admin_id'] }
    })
    return category
}