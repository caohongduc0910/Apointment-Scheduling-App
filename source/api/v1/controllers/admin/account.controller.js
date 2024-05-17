import { getListUser } from "../../services/user.service.js"

export const getListProviderAct = async (req, res) => {
    try {
        const msg = await getListUser(2)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi lấy danh sách Provider"
        })
    }
}

export const getListClientAct = async (req, res) => {
    try {
        const msg = await getListUser(3)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi lấy danh sách Client"
        })
    }
}
