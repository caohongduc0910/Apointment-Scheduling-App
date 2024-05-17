import Service from '../models/mysql/services.js'

export const createService = async (category) => {
    await Service.create(category)
}