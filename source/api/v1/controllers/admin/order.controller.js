import { detail, listOrder } from '../../services/order.service.js'

export const detailAct = async (req, res) => {
    try {
        const msg = await detail(req.params)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Lỗi xem chi tiết đơn hàng"
        })
    }
}


export const listOrderAct = async (req, res) => {
    try {
        const msg = await listOrder(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Lỗi xem chi tiết đơn hàng"
        })
    }
}
