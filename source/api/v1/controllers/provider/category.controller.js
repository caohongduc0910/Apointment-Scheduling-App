import { detailUUID, getAll } from '../../services/category.service.js'

export const detailAct = async (req, res) => {
    try {
        const msg = await detailUUID(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Lỗi xem chi tiết danh mục"
        })
    }
}


export const getAllAct = async (req, res) => {
    try {
        const msg = await getAll()
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Lỗi xem danh sách danh mục"
        })
    }
}