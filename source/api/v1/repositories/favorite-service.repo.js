import Favorite_service from '../models/mysql/favorite-services.js'

export const createFavoriteService = async (data) => {
    await Favorite_service.create(data)
}