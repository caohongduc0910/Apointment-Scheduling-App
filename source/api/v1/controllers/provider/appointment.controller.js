import { detail, updateProvider, getAllByProviderID } from '../../services/appointment.service.js'

export const detailAct = async (req, res) => {
    try {
        const msg = await detail(req.params)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi xem cuộc hẹn",
        })
    }
}


export const updateAct = async (req, res) => {
    try {
        const msg = await updateProvider(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi cập nhật cuộc hẹn",
        })
    }
}


export const getAllAct = async (req, res) => {
    try {
        const msg = await getAllByProviderID(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Lỗi xem danh sách cuộc hẹn",
        })
    }
} 