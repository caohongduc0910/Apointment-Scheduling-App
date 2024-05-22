import { create, checkout, handleWebhook } from '../../services/order.service.js'


export const createAct = async (req, res) => {
    try {
        const msg = await create(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi tạo đơn hàng"
        })
    }
}


export const checkoutAct = async (req, res) => {
    try {
        const msg = await checkout(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Lỗi thanh toán"
        })
    }
}


export const handleWebhookAct = async (req, res) => {
    try {
        const msg = await handleWebhook(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Lỗi webhook"
        })
    }
}
