import {
    create, detail, update, deleteDiscount, myDiscount, listDiscount
} from '../../services/discount.service.js'

export const createAct = async (req, res) => {
    try {
        const msg = await create(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        res.status(500).json({
            msg: "Lỗi tạo mã giảm giá"
        })
    }
}

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


export const updateAct = async (req, res) => {
    try {
        const msg = await update(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Lỗi cập nhật mã giảm giá"
        })
    }
}


export const deleteAct = async (req, res) => {
    try {
        const msg = await deleteDiscount(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Lỗi xóa mã giảm giá"
        })
    }
}


export const myDiscountAct = async (req, res) => {
    try {
        const msg = await myDiscount(req)
        res.status(msg.status).json(msg.info)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Lỗi xem danh sách giảm giá"
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