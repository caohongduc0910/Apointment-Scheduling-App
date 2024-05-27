import { 
    create, deleteFavoriteService
} from '../../services/favorite-service.service.js'

export const createAct = async (req, res) => {
    try {
        const msg = await create(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi tạo dịch vụ yêu thích"
        })
    }
}


export const deleteAct = async (req, res) => {
    try {
        const msg = await deleteFavoriteService(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi xóa dịch vụ yêu thích"
        })
    }
}
