import { create, detail } from '../../services/service.service.js'

export const createAct = async (req, res) => {
    try {
        const msg = await create(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi tạo dịch vụ"
        })
    }
}


export const detailAct = async (req, res) => {
    try {
        const msg = await detail(req.params)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi xem chi tiết dịch vụ"
        })
    }
}