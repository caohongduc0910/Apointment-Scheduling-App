import { detail, update, changePassword } from "../../services/user.service.js"

export const detailAct = async (req, res) => {
    try {
        const msg = await detail(req.user)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
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
        res.status(500).json({
            msg: "Lỗi cập nhật User"
        })
    }
}

export const changePasswordAct = async (req, res) => {
    try {
        const msg = await changePassword(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi đổi mật khẩu"
        })
    }
}

