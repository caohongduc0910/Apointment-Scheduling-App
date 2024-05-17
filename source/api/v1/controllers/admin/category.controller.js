import { create, detail, update, deleteCate, getAll } from '../../services/category.service.js'

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
        const msg = await detail(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi xem chi tiết danh mục"
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
            msg: "Lỗi cập nhật danh mục"
        })
    }
}


export const deleteAct = async (req, res) => {
    try {
        const msg = await deleteCate(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi xóa danh mục"
        })
    }
}


export const getAllAct = async (req, res) => {
    try {
        const msg = await getAll()
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi xem danh sách danh mục"
        })
    }
}