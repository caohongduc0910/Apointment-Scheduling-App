import { 
    detail, deleteNotification, getAll
} from '../../services/notification.service.js'

export const detailAct = async (req, res) => {
    try {
        const msg = await detail(req.params)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi xem thông báo",
        })
    }
}


export const deleteAct = async (req, res) => {
    try {
        const msg = await deleteNotification(req.params)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi xóa thông báo",
        })
    }
}


export const listNotificationAct = async (req, res) => {
    try {
        const msg = await getAll(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi xem danh sách thông báo",
        })
    }
}
