import { detail, listService } from '../../services/service.service.js'


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


export const listServiceAct = async (req, res) => {
    try {
        const msg = await listService(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi xem danh sách dịch vụ"
        })
    }
}
