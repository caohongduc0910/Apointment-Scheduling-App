import { detail, update } from "../../services/user.service.js"

export const detailAct = async (req, res) => {
    try {
        const msg = await detail(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Lỗi xem chi tiết User"
        })
    }
}

export const updateAct = async (req, res) => {
    try {
        const msg = await update(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Lỗi cập nhật User"
        })
    }
}


