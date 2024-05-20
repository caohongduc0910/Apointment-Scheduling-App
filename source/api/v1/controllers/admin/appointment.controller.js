import { detail, getAll } from '../../services/appointment.service.js'

export const detailAct = async (req, res) => {
    try {
        const msg = await detail(req.params)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Lỗi xem cuộc hẹn",
        })
    }
}


export const getAllAct = async (req, res) => {
    try {
        const msg = await getAll(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Lỗi xem cuộc hẹn",
        })
    }
}