import Favorite_service from '../models/mysql/favorite-services.js'

export const createFavoriteService = async (data) => {
    await Favorite_service.create(data)
}


export const deleteFavService = async (serviceID, clientID) => {
    await Favorite_service.destroy({
        where: {
            service_id: serviceID,
            client_id: clientID
        }
    })
}
