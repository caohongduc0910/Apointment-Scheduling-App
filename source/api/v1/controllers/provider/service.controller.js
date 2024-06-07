import {
    create,
    detail,
    update,
    deleteService,
    listService
} from '../../services/service.service.js'

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


export const updateAct = async (req, res) => {
    try {
        const msg = await update(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi cập nhật dịch vụ"
        })
    }
}


export const deleteAct = async (req, res) => {
    try {
        const msg = await deleteService()
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi xóa dịch vụ"
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
