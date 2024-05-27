import {
    createFavoriteService
} from "../repositories/favorite-service.repo.js"

import {
    detailServiceUUID
} from "../repositories/service.repo.js"

export const create = async (req) => {

    const serviceUUID = req.params.uuid
    const service = await detailServiceUUID(serviceUUID)
    const clientID = req.user.id

    const data = {
        service_id: service.id,
        client_id: clientID
    }

    await createFavoriteService(data)

    const answer = {
        status: 200,
        info: {
            msg: "Tạo thành công dịch vụ yêu thích",
            FavoriteService: data
        }
    }
    return answer
}