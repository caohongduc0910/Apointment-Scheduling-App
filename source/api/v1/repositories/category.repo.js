import Category from '../models/mysql/categories.js'

export const createCategory = async (category) => {
    await Category.create(category)
}
