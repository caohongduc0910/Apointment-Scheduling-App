import { detail, listFeedbackProvider } from '../../services/feedback.service.js'

export const detailAct = async (req, res) => {
    try {
        const msg = await detail(req.params)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Lỗi xem đánh giá"
        })
    }
}


export const listFeedbackAct = async (req, res) => {
    try {
        const msg = await listFeedbackProvider(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Lỗi xem danh sách đánh giá"
        })
    }
}
