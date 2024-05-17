import { create } from '../../services/category.service.js'

export const createAct = async (req, res) => {
    try {
        const msg = await create(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi tạo danh mục"
        })
    }
}