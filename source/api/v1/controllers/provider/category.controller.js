import { detailUUID } from '../../services/category.service.js'

export const detailAct = async (req, res) => {
    try {
        const msg = await detailUUID(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi xem chi tiết danh mục"
        })
    }
}