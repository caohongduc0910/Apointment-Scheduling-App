import { create, detailUUID, getAllOfProvider } from '../../services/category.service.js'

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


export const getAllAct = async (req, res) => {
    try {
        const msg = await getAllOfProvider(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi xem danh sách danh mục"
        })
    }
}