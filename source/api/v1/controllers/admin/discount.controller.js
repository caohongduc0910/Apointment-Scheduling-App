import {
    detail, listDiscount
} from '../../services/discount.service.js'

export const detailAct = async (req, res) => {
    try {
        const msg = await detail(req.params)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Lỗi xem chi tiết mã giảm giá"
        })
    }
}


export const listDiscountAct = async (req, res) => {
    try {
        const msg = await listDiscount(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Lỗi xem danh sách mã giảm giá"
        })
    }
}
